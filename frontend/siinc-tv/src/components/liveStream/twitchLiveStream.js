/**
 * This module is in charge of displaying twitch streams
 */
import React, { useState } from "react";

const srcPre = "https://player.twitch.tv/?channel=";
const srcPost = "&parent=localhost";
function LiveStream(props) {
  const [displayName, setUserName] = useState(props.displayName);
  const [dimensions, setDimension] = useState(props.dimensions);
  const [streamSrc, setStreamSrc] = useState(
    srcPre + props.displayName + srcPost
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
    ></iframe>
  );
}

export default LiveStream;
