import { useEffect, useContext, useState } from "react";
import SocketContext from "../../socketContext";
const { default: streamActions } = require("../../stream/streamActions");

const END_STREAM = "endStream"; // Name of the event
const VIEWERS_CHANGED = "viewersChanged"; // Name of the event
const JOIN_ROOM = "joinRoom"; // Name of the event
const LEAVE_ROOM = "leaveRoom"; // Name of the event
const NEW_STREAMER = "newStreamer"; // Name of the event

/**
 * This component is in charge of the socket handler for stream related emits
 * 
 * @category Frontend
 * @component
 * @subcategory Live stream
 */
const StreamSocket = (roomId, setStreamData) => {
  const [endStream, setEndStream] = useState(false); // Sent and received messages
  const [numOfViews, setNumViewers] = useState(0);
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    if (roomId !== null) {
      // If not already in room join room
      if (socketContext.streamRoomId == null) {
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

      // Reload the stream data on join
      socketContext.socket.on(NEW_STREAMER, () => {
        console.log("new streamer");
        streamActions.getStreamById(roomId).then((result) => {
          setStreamData(result);
        });
      });
    }  
    // leaves the room
    // when the connection is closed
    return () => {
      console.log("Leaving", socketContext.streamRoomId);
        socketContext.socket.emit(LEAVE_ROOM, roomId);
        socketContext.setStreamRoomId(null);
    };
  }, []);

  /**
   *Sends a message to the server that
   * forwards it to all users in the same room
   */
  const sendEndStream = () => {
    socketContext.socket.emit(END_STREAM, roomId);
  };

  return { endStream, sendEndStream, numOfViews };
};

export default StreamSocket;
