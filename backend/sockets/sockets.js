
const {User} = require("../models/user");
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"
const END_STREAM = "endStream"; // Name of the event

var global_io = null;

// This is called to initialize the socket
module.exports.initializeSocket =  function(io){

    io.on("connection", async function(socket){
        console.log("socket : " + socket.id + " connected")
        global_io = io;
        let user = null;
        let passport = socket.request.session.passport;
        if(passport && socket.request.session.passport.user)
        {
            const id = (socket.request.session.passport.user);
            user = await User.findById(id);
        }

        // var userId = socket
        const { roomId } = socket.handshake.query;
        // Join a conversation
        socket.join(roomId);

        // Listen for new messages
        socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
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

            console.log("NewMessage");
        });

        // end stream event
        socket.on(END_STREAM,async ()=>{
            console.log("endStream");
            console.log(roomId);
            io.in(roomId).emit(END_STREAM);
        });

        socket.on("userConnection", (userId) => { console.log("user : " + userId + " logged in")
                                                  socket.join(toString(userId)); })
        socket.on("userDisconnect", (userId) => { console.log("user : " + userId + " logged out");
                                                  socket.leave(toString(userId)); })     
        


        // Leave the room if the user closes the socket
        socket.on("disconnect", () => {
            console.log("socket : " + socket.id + " disconnected");
            socket.leave(roomId);
        });
        })
        
}


module.exports.emitToUser = function (userId, event, data) {
    console.log("Trying to emit a message to : " + userId + ". message : ")
    console.log(data);
    //var clients= global_io.sockets.adapter.rooms[userId].sockets
    //console.log(global_io.sockets.adapter)
    global_io.in(toString(userId)).emit(event, data);
}

