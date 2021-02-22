/**
 * This module is in charge of displaying youtube streams
 */
import React, { useState, useRef } from "react";

const srcPre = "https://www.youtube.com/embed/live_stream?channel=";
const srcPost = "&autoplay=1";

/**
 * This component is in charge of displaying youtube streams
 * 
 * @prop {String} youtubeId youtube id of the streamer
 * @prop {Boolean} muted should the stream be displayed as muted
 * @category Frontend
 * @component
 * @subcategory Live stream
 */
function YoutubeLiveStream(props) {
  const [streamSrc, setStreamSrc] = useState(
    srcPre + props.youtubeId + srcPost
  );
  const [muted, setMuted] = useState(props.muted);

  return (
    <iframe
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      src={streamSrc}
      frameBorder="0"
      allowFullScreen={true}
      scrolling="no"
      muted={muted}
      allow="autoplay"
    ></iframe>
  );
}

export default YoutubeLiveStream;
