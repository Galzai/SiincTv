import React, { useState } from "react";
import TwitchLiveStream from "./twitchLiveStream";
import YoutubeLiveStream from "./youtubeLiveStream";

/**
 * This component is in charge of displaying the live stream from the source according to type
 * 
 * @prop {streamData} streamer data of the streamer to display live stream of
 * @prop {Object} dimensions dimensions of the requested stream
 * @category Frontend
 * @subcategory Live stream
 * @component
 */
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
