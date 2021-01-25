import React, { useState, useEffect } from "react";
import LiveStream from "./liveStream";
import style from "./liveStream.module.css";
import StreamSelectorBar from "./streamSelectorBar";

/**
 * This component is in charge of the "single main" stream view
 * 
 * @prop {streamData} currentStreamer data of the streamer to display live stream of as main
 * @prop {streamGroup[]} streamGroups all the groups of streamers in the stream
 * @category Frontend
 * @component
 */
function SingleStreamViewBox(props) {
  // The initial current streamer is the host
  const [currentStreamer, setCurrentStreamer] = useState(props.currentStreamer);
  const [streamGroups, setStreamGroups] = useState(props.streamGroups);

  useEffect(() => {
    setStreamGroups(props.streamGroups);
  }, [props.streamGroups]);

  return (
    <div>
      <div className={style.singleStreamViewBox}>
        <LiveStream
          key={currentStreamer.displayName}
          streamer={currentStreamer}
          muted={false}
        ></LiveStream>
      </div>
      <StreamSelectorBar
        currentStreamer={currentStreamer}
        setCurrentStreamer={setCurrentStreamer}
        streamGroups={streamGroups}
      ></StreamSelectorBar>
    </div>
  );
}

export default SingleStreamViewBox;
