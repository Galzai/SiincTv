import { useEffect, useContext, useState } from "react";
import SocketContext from "../../socketContext";

const END_STREAM = "endStream"; // Name of the event
const VIEWERS_CHANGED = "viewersChanged"; // Name of the event
const JOIN_ROOM = "joinRoom"; // Name of the event
const LEAVE_ROOM = "leaveRoom"; // Name of the event


const StreamSocket = (roomId) => {
  const [endStream, setEndStream] = useState(false); // Sent and received messages
  const [numOfViews, setNumViewers] = useState(0);
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    if(roomId !== null){
      // If not already in room join room
      if(socketContext.streamRoomId == null)
      {
        console.log("here");
        socketContext.socket.emit(JOIN_ROOM, roomId);
        socketContext.setStreamRoomId(roomId);
      }
        // Listens for incoming messages
        socketContext.socket.on(END_STREAM, () => {
            window.location.assign("http://localhost:3000/stream_pages/ended");
        });

        // Listen for new viewers
        socketContext.socket.on(VIEWERS_CHANGED, (numViewers) => {
          setNumViewers(numViewers);
      });
        
        // leaves the room
        // when the connection is closed
        return () => {
          if(socketContext.streamRoomId != null)
          {
            socketContext.socket.emit(LEAVE_ROOM,roomId);
            socketContext.setStreamRoomId(null);
          }
        };
    }
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendEndStream = () => {
    socketContext.socket.emit(END_STREAM, roomId);
  };

  return { endStream, sendEndStream, numOfViews };
};

export default StreamSocket;