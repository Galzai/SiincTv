/**
 * This module is in charge of actions relating to sockets
 * Note that the socket also uses the session data to retrieve current user
 * 
 * @module Sockets
 * @category Backend
 */
const { StreamData } = require("../models/streamModels");
const { User } = require("../models/user");
var ObjectID = require("mongodb").ObjectID;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const END_STREAM = "endStream"; // Name of the event
const VIEWERS_CHANGED = "viewersChanged"; // Name of the event
const NEW_NOTIFICATON = "newNotification";
const NEW_STREAMER = "newStreamer"; // Name of the event
const JOIN_ROOM = "joinRoom"; // Name of the event
const LEAVE_ROOM = "leaveRoom"; // Name of the event
const LOGGED_VIEWERS_CHANGED = "loggedViewersChanged";
const BAN_UNBAN = "banUnban";


var streamMap = new Map();
var userToStreams = new Map();
var global_io = null;

// This is called to initialize the socket
module.exports.initializeSocket = function (io) {
  io.on("connection", async function (socket) {
    global_io = io;
    let user = null;
    let passport = socket.request.session.passport;
    if (passport && socket.request.session.passport.user) {
      const id = socket.request.session.passport.user;
      user = await User.findById(id);
    }

    // Join a stream room
    socket.on(JOIN_ROOM, async (roomId) => {
      // Join a conversation
      socket.join(roomId);
      // If this is the first time creating a room we initialize it
      if(streamMap.get(roomId) === undefined){
        streamMap.set(roomId, new Map());
      }
      if(user !== null){
        // add user to room if not already in room
        if(streamMap.get(roomId).get(user._id.toString()) === undefined){
          streamMap.get(roomId).set(user._id.toString(), {banned: false, userData: user});
          // We also need a mapping for each user to the rooms hes in
          if(!userToStreams.get(user._id)){
            userToStreams.set(user._id.toString(), new Set());
          }
          userToStreams.get(user._id.toString()).add(roomId);
        }
      }
      if (roomId != "undefined" && io.sockets.adapter.rooms.get(roomId)) {
        let numViewers = io.sockets.adapter.rooms.get(roomId).size;
        StreamData.updateOne(
          { _id: roomId },
          { $set: { numOfViewers: numViewers } }
        ).then();
        // result
        io.in(roomId).emit(VIEWERS_CHANGED, numViewers);
      }
      io.in(roomId).emit(LOGGED_VIEWERS_CHANGED, Array.from(streamMap.get(roomId)));
    });

    // Leave a stream room
    socket.on(LEAVE_ROOM, async (roomId) => {
      if(user != null && streamMap.get(roomId) && streamMap.get(roomId).get(user._id.toString())){
        streamMap.get(roomId).delete(user._id.toString());
        io.in(roomId).emit(LOGGED_VIEWERS_CHANGED, Array.from(streamMap.get(roomId))); 
        if(userToStreams.get(user._id.toString())){
          userToStreams.get(user._id.toString()).delete(roomId);
        }
      }
      socket.leave(roomId);

      // remove user from room  

      if (roomId != "undefined" && io.sockets.adapter.rooms.get(roomId)) {
        let numViewers = io.sockets.adapter.rooms.get(roomId).size;
        StreamData.updateOne(
          { _id: roomId },
          { $set: { numOfViewers: numViewers } }
        ).then();
        // result
        io.in(roomId).emit(VIEWERS_CHANGED, numViewers);
      } else {
        if (roomId && roomId != "undefined") {
          StreamData.updateOne(
            { _id: roomId },
            { $set: { numOfViewers: 0 } }
          ).then((obj) => {
          });
        }
      }
    });

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, async (data, roomId) => {
      socket.request.session.reload(function (err) {});
      // If the user changed we need to update it
      if (passport !== socket.request.session.passport) {
        user = null;
        passport = socket.request.session.passport;
        if (passport && socket.request.session.passport.user) {
          const id = socket.request.session.passport.user;
          user = await User.findById(id);
        }
      }
      if (user && !streamMap.get(roomId).get(user._id.toString()).banned) io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
    // Ban or unban user from stream chat
    socket.on(BAN_UNBAN, async (userId, roomId) => {
      let userData = streamMap.get(roomId).get(userId);
      // remove room from map
      let banUnban = !userData.banned;
      streamMap.get(roomId).get(userId).banned = banUnban;
      io.in(roomId).emit(LOGGED_VIEWERS_CHANGED, Array.from(streamMap.get(roomId)));
      const text = banUnban ? "You have been banned from the chat." : "You have been unbanned from the chat.";
      global_io.in(String(userId)).emit(NEW_NOTIFICATON, text);
    });

    // end stream event
    socket.on(END_STREAM, async (roomId) => {
      // remove room from map
      streamMap.delete(roomId);
      io.in(roomId).emit(END_STREAM);
    });

    socket.on("userConnection", (userId) => {
      socket.join(userId);
    });

    socket.on("userDisconnect", (userId) => {
      const streams = userToStreams.get(userId);
      if(streams){
        streams.forEach((roomId)=>{
          if(streamMap.get(roomId)){
            streamMap.get(roomId).delete(userId);
            io.in(roomId).emit(LOGGED_VIEWERS_CHANGED, Array.from(streamMap.get(roomId))); 
          }
        });
        userToStreams.delete(userId);
      }
      socket.leave(userId);
      
    });
  });
};

/**
 * Emits an even to a user
 * @param {*} userId id of the user
 * @param {*} event event type
 * @param {*} data event data
 */
module.exports.emitToUser = function (userId, event, data) {
  global_io.in(String(userId)).emit(event, data);
};

/**
 * Emites a notifications change
 * @param {*} userId
 */
module.exports.emitReloadNotifications = function (userId, popUpText) {
  global_io.in(String(userId)).emit(NEW_NOTIFICATON, popUpText);
};

/**
 * Emites a newStreamerJoined event
 * @param {*} streamId
 */
module.exports.emitNewStreamerJoined = function (streamId) {
  global_io.in(String(streamId)).emit(NEW_STREAMER);
};

/**
 * Checks if user is online
 * @param {*} userId
 */
module.exports.isUserOnlineRoom = function (userId) {
  let isOnline = false;
  global_io.sockets.adapter.rooms.forEach((value, key, map) => {
    isOnline = isOnline || (String(userId) === String(key))
  })
  return isOnline;
};

