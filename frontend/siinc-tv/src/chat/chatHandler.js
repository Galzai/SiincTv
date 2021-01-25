/**
 * This module is in charge of handling chat emits from the socket
 */
import { useEffect, useContext, useState } from "react";
import SocketContext from "../socketContext";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const JOIN_ROOM = "joinRoom"; // Name of the event
const LEAVE_ROOM = "leaveRoom"; // Name of the event

const ChatHandler = (roomId) => {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketContext = useContext(SocketContext);
  useEffect(() => {
    if (roomId != null) {
      console.log(socketContext.streamRoomId);
      if (socketContext.streamRoomId == null) {
        socketContext.socket.emit(JOIN_ROOM, roomId);
        socketContext.setStreamRoomId(roomId);
      }

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

      // leaves the room
      // when the connection is closed
      return () => {
        if (socketContext.streamRoomId != null) {
          socketContext.socket.emit(LEAVE_ROOM, roomId);
          socketContext.setStreamRoomId(null);
        }
      };
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

  return { messages, sendMessage };
};

export default ChatHandler;
