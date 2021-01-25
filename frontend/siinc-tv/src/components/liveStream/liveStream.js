/**
 * This module is in charge of displaying the live stream from the source according to type
 */
import React, { useState } from "react";
import TwitchLiveStream from "./twitchLiveStream";
import YoutubeLiveStream from "./youtubeLiveStream";

function LiveStream(props) {
  const [streamer, setStreamer] = useState(props.streamer);
  const [dimensions, setDimension] = useState(props.dimensions);

  const displayStreamByType = () => {
    if (streamer.youtubeId) {
      return (
        <YoutubeLiveStream
          displayName={streamer.displayName}
          youtubeId={streamer.youtubeId}
          dimensions={dimensions}
          muted={true}
        />
      );
    } //TODO: Change to if
    else {
      return (
        <TwitchLiveStream
          displayName={streamer.displayName}
          dimensions={dimensions}
          muted={true}
        />
      );
    }
  };

  return <div>{displayStreamByType()}</div>;
}

export default LiveStream;
