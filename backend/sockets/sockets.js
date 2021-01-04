
const { StreamData } = require("../models/streamModels");
const {User} = require("../models/user");
var ObjectID = require('mongodb').ObjectID;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"
const END_STREAM = "endStream"; // Name of the event
const VIEWERS_CHANGED = "viewersChanged"; // Name of the event 
const NEW_NOTIFICATON = "newNotification";
const JOIN_ROOM = "joinRoom"; // Name of the event
const LEAVE_ROOM = "leaveRoom"; // Name of the event

var global_io = null;

// This is called to initialize the socket
module.exports.initializeSocket =  function(io){
    let viewerMap = new Map();
    io.on("connection", async function(socket){
        global_io = io;
        let user = null;
        let passport = socket.request.session.passport;
        if(passport && socket.request.session.passport.user)
        {
            const id = (socket.request.session.passport.user);
            user = await User.findById(id);
        }

        // Join a stream room
        socket.on(JOIN_ROOM, async (roomId)=>{
            console.log("socket : " + roomId + " connected")
            // Join a conversation
            socket.join(roomId);
            console.log("roomId", roomId);
            if((roomId != "undefined") && io.sockets.adapter.rooms.get(roomId) )
            {
                let numViewers = io.sockets.adapter.rooms.get(roomId).size;
                StreamData.updateOne({"_id": roomId},
                {$set: {"numOfViewers": numViewers}}
                ).then();
            // result
            io.in(roomId).emit(VIEWERS_CHANGED, numViewers);
            }
        });

        // Leave a stream room
        socket.on(LEAVE_ROOM,  async (roomId)=>{
            console.log("socket : " + roomId+ " disconnected");
            socket.leave(roomId);
            if ((roomId != "undefined") && io.sockets.adapter.rooms.get(roomId) )
            {
                let numViewers = io.sockets.adapter.rooms.get(roomId).size;
                StreamData.updateOne({"_id": roomId},
                {$set: {"numOfViewers": numViewers}}
                ).then();
               // result
               io.in(roomId).emit(VIEWERS_CHANGED, numViewers);
            }

            else{
                if(roomId && roomId != "undefined")
                {
                    StreamData.updateOne({"_id": roomId},
                    {$set: {"numOfViewers": 0}}
                    ).then(obj=>{console.log("Object modified", obj)});
                }
            }
        });

        // Listen for new messages
        socket.on(NEW_CHAT_MESSAGE_EVENT, async (data, roomId) => {
            socket.request.session.reload(function(err) {});
            // If the user changed we need to update it
            if(passport !== socket.request.session.passport)
            {
                user = null;
                passport = socket.request.session.passport;
                if(passport && socket.request.session.passport.user)
                {
                    const id = (socket.request.session.passport.user);
                    user = await User.findById(id);
                }
            }
            if(user) io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
            console.log(socket.request.session.passport);
            console.log(roomId);
            console.log(data);
            console.log("NewMessage");
        });

        // end stream event
        socket.on(END_STREAM,async (roomId)=>{
            console.log("endStream");
            console.log(roomId);
            io.in(roomId).emit(END_STREAM);
        });

        socket.on("userConnection", (userId) => { console.log("user : " + userId + " logged in")
                                                  socket.join(userId); })
        socket.on("userDisconnect", (userId) => { console.log("user : " + userId + " logged out");
                                                  socket.leave(userId); })     

    });   
}


module.exports.emitToUser = function (userId, event, data) {
    console.log("Trying to emit a message to : " + userId + ". message : ")
    console.log(data);
    //var clients= global_io.sockets.adapter.rooms[userId].sockets
    //console.log(global_io.sockets.adapter)
    global_io.in(String(userId)).emit(event, data);
}

/**
 * Emites a notifications change
 * @param {*} userId 
 */
module.exports.emitReloadNotifications = function (userId, popUpText) {
    global_io.in(String(userId)).emit(NEW_NOTIFICATON, popUpText);
}


