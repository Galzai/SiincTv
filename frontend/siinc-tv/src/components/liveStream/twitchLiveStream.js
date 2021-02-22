import React, { useState } from "react";

const srcPre = "https://player.twitch.tv/?channel=";

const srcPost = "&parent=siinc.tv" 
/**
 * This component is in charge of displaying twitch streams
 * 
 * @prop {String} displayName display name of the streamer
 * @prop {Boolean} muted should the stream be displayed as muted
 * @category Frontend
 * @subcategory Live stream
 * @component
 */
function LiveStream(props) {
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
