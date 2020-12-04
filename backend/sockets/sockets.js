// Socket io stuff
const socketio = require('socket.io');

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"

// This is called to initialize the socket
module.exports.initializeSocket = function(server, sessionMiddleware, corsInf){
    var io = socketio(server, {cors: {corsInf}});
    io.use(function(socket, next){
        // Wrap the express middleware
        sessionMiddleware(socket.request, {}, next);
    }).on("connection", function(socket){
            var userId = socket
            console.log("Your User ID is", userId);
            const { roomId } = socket.handshake.query;

            socket.join(roomId);

                        // Join a conversation

            // Listen for new messages
            socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
                io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
                console.log("NewMessage");
            });

            // Leave the room if the user closes the socket
            socket.on("disconnect", () => {
                console.log("disconnected")
                socket.leave(roomId);
            });
        });



}