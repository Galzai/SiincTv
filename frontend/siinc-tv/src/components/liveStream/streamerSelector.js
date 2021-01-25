import style from "./liveStream.module.css";
import React, { useState } from "react";
import LiveStream from "./liveStream";

/**
 * @brief This is a small clickable stream window used to select current streamer in "single main" view
 * 
 * @prop {streamerData} streamer the streamer this selector belongs to
 * @prop {streamerData} currentStreamer current main streamer
 * @prop {Function} setCurrentStreamer setter for the main streamer
 * @category Frontend
 * @component
 */
function StreamSelector(props) {
  const [streamer, setStreamer] = useState(props.streamer);
  const setCurrentStreamer = props.setCurrentStreamer;
  const currentStreamer = props.currentStreamer;

  // Replaces the main streamer with this streamer
  const selectAsMainStream = () => {
    setCurrentStreamer(streamer);
    setStreamer(currentStreamer);
  };

  return (
    <div className={style.streamSelector}>
      <LiveStream
        style={{ display: "relative" }}
        streamer={streamer}
        muted={true}
      />
      <button
        className={style.streamSelectorButton}
        onClick={selectAsMainStream}
      ></button>
    </div>
  );
}

export default StreamSelector;
