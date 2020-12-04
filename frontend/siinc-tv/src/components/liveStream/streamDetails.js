import style from './liveStream.module.css'
import React, {useState} from "react";
import Streamers from "./streamers";
/**
 * @brief This displays details regarding the stream
 * @param {*} props 
 */
function StreamDetails(props){

    const currentStreamer = props.currentStreamer;
    const streamGroups = props.streamGroups;
    const streamTitle = props.streamTitle;

    return(
    <div>


        <h1 className={style.streamTitle}>{streamTitle}</h1>
        <Streamers
        streamGroups={streamGroups}
        />
      </div>
    );
}

export default StreamDetails;