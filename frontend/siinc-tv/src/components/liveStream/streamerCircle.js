import style from "./liveStream.module.css";
import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * This a circle describing the streamer with a tooltip
 * 
 * @prop {streamData} streamer data of the streamer to display live stream of
 * @category Frontend
 * @component
 */
function StreamerCircle(props) {
  const streamer = props.streamer;
  const imgSrc = streamer.userImage
    ? streamer.userImage
    : "https://img.icons8.com/material/4ac144/256/user-male.png";
  const uniqueId = Date.now();

  return (
    <div className={style.streamerCircleDiv}>
      <Tooltip title={streamer.displayName} placement="top">
        <img className={style.streamerCircle} src={imgSrc}></img>
      </Tooltip>
    </div>
  );
}

export default StreamerCircle;
