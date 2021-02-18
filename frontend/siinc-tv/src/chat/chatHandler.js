/**
 * This module is in charge of handling chat emits from the socket
 */
import { useEffect, useContext, useState } from "react";
import SocketContext from "../socketContext";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const LOGGED_VIEWERS_CHANGED = "loggedViewersChanged";

const ChatHandler = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketContext = useContext(SocketContext);
  const [loggedViewers, setLoggedViewers] = useState(null);
  useEffect(() => {
    if (roomId != null) {
      // Listens for incoming messages
      socketContext.socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        console.log(socketContext.socket.id);
        console.log(message.senderId);
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketContext.socket.id,
        };
        setMessages((messages) => [...messages, incomingMessage]);
      });
      // Listen for changes in logged viewers
      socketContext.socket.on(LOGGED_VIEWERS_CHANGED, (loggedViewersData) =>{
        console.log(loggedViewersData);
        setLoggedViewers(loggedViewersData);
      });
    }
  }, []);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketContext.socket.emit(
      NEW_CHAT_MESSAGE_EVENT,
      {
        body: messageBody,
        senderId: socketContext.socket.id,
      },
      socketContext.streamRoomId
    );
  };

  return { messages, sendMessage, loggedViewers};
};

export default ChatHandler;
