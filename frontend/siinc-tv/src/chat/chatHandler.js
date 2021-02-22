/**
 * This module is in charge of handling chat emits from the socket
 */
import { useEffect, useContext, useState } from "react";
import SocketContext from "../socketContext";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const LOGGED_VIEWERS_CHANGED = "loggedViewersChanged";
const BAN_UNBAN = "banUnban";

/**
 * This component is in charge of the socket handler for chat related emits
 * 
 * @category Frontend
 * @component
 */
const ChatHandler = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketContext = useContext(SocketContext);
  const [loggedViewers, setLoggedViewers] = useState(null);
  useEffect(() => {
    if (roomId != null) {
      // Listens for incoming messages
      socketContext.socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
        const incomingMessage = {
          ...message,
          ownedByCurrentUser: message.senderId === socketContext.socket.id,
        };
        setMessages((messages) => [...messages, incomingMessage]);
      });
      // Listen for changes in logged viewers
      socketContext.socket.on(LOGGED_VIEWERS_CHANGED, (loggedViewersData) =>{
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

  // Ban or unban user from chat
  const banUnban = (id) =>{
    socketContext.socket.emit(
      BAN_UNBAN, id,
      socketContext.streamRoomId
    );
  }
  return { messages, sendMessage, loggedViewers, banUnban};
};

export default ChatHandler;
