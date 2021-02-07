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
      console.log("Join room called");
      // Join a conversation
      socket.join(roomId);
      if (roomId != "undefined" && io.sockets.adapter.rooms.get(roomId)) {
        let numViewers = io.sockets.adapter.rooms.get(roomId).size;
        StreamData.updateOne(
          { _id: roomId },
          { $set: { numOfViewers: numViewers } }
        ).then();
        // result
        io.in(roomId).emit(VIEWERS_CHANGED, numViewers);
      }
    });

    // Leave a stream room
    socket.on(LEAVE_ROOM, async (roomId) => {
      console.log("Leave room called", roomId);
      socket.leave(roomId);
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
            console.log("Object modified", obj);
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
      if (user) io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
      console.log("NewMessage");
    });

    // end stream event
    socket.on(END_STREAM, async (roomId) => {
      console.log("endStream");
      console.log(roomId);
      io.in(roomId).emit(END_STREAM);
    });

    socket.on("userConnection", (userId) => {
      console.log("user : " + userId + " logged in");
      socket.join(userId);
    });
    socket.on("userDisconnect", (userId) => {
      console.log("user : " + userId + " logged out");
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
 * @param {*} userId
 */
module.exports.emitNewStreamerJoined = function (streamId) {
  global_io.in(String(streamId)).emit(NEW_STREAMER);
};
