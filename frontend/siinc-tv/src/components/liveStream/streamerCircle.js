/**
 * This is the module in charge of displaying the user icon and data in the streamer
 */

import style from "./liveStream.module.css";
import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * @brief This a circle describing the streamer
 * @param {*} props
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
