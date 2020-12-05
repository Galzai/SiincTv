
const {User} = require("../models/user");
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"

// This is called to initialize the socket
module.exports.initializeSocket =  function(io){

    io.on("connection", async function(socket){

        if(socket.request.session.passport == null)
        {
            console.log("cant connect unlogged user to chat")
            return;
        }
        const id = (socket.request.session.passport.user);
        const  user = await User.findById(id);
        if(user == null)
        {
            console.log("cant connect unlogged user to chat")
            return;    
        }

        // Try and get the user from the db
        console.log(user);


        // var userId = socket
        const { roomId } = socket.handshake.query;
        // Join a conversation
        socket.join(roomId);

        // Listen for new messages
        socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
            io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
            console.log("NewMessage");
        });

        // Leave the room if the user closes the socket
        socket.on("disconnect", () => {
            console.log("disconnected");
            socket.leave(roomId);
        });
        });



}