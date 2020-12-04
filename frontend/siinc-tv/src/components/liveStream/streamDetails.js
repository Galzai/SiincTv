import style from './liveStream.module.css'
import React, {useState} from "react";
import Streamers from "./streamers";
import ShowMoreText from 'react-show-more-text';

/**
 * @brief This displays details regarding the stream
 * @param {*} props 
 */
function StreamDetails(props){

    const currentStreamer = props.currentStreamer;
    const streamGroups = props.streamGroups;
    const streamTitle = props.streamTitle;
    const streamDescription = props.description;

    return(
    <div>
        <h1 className={style.streamTitle}>{streamTitle}</h1>
            <Streamers
            streamGroups={streamGroups}
            />
        <div className={style.descriptionDiv}>
            <ShowMoreText className={style.textStyle}>{streamDescription}</ShowMoreText>
        </div>
      </div>
    );
}

export default StreamDetails;