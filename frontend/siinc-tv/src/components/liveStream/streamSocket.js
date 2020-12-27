import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const END_STREAM = "endStream"; // Name of the event
const VIEWERS_CHANGED = "viewersChanged"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const StreamSocket = (roomId) => {
  const [endStream, setEndStream] = useState(false); // Sent and received messages
  const [numOfViews, setNumViewers] = useState(0);
  const socketRef = useRef();

  useEffect(() => {
    if(roomId !== null){
            // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            withCredentials: true,
            query: { roomId },
            transports: ['websocket']
          });

        // Listens for incoming messages
        socketRef.current.on(END_STREAM, () => {
            window.location.assign("http://localhost:3000/stream_pages/ended");
        });

        // Listen for new viewers
        socketRef.current.on(VIEWERS_CHANGED, (numViewers) => {
          setNumViewers(numViewers);
          console.log("NumVIewers", numViewers);
      });
        
        // Destroys the socket reference
        // when the connection is closed
        return () => {
        socketRef.current.disconnect();
        };
    }
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendEndStream = () => {
    socketRef.current.emit(END_STREAM, {
      senderId: socketRef.current.id,
    });
  };

  return { endStream, sendEndStream, numOfViews };
};

export default StreamSocket;