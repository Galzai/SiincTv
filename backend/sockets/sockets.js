
const {User} = require("../models/user");
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"

// This is called to initialize the socket
module.exports.initializeSocket =  function(io){

    io.on("connection", async function(socket){
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

        // Leave the room if the user closes the socket
        socket.on("disconnect", () => {
            console.log("disconnected");
            socket.leave(roomId);
        });
        });



}