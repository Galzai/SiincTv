import style from './liveStream.module.css'
import React, {useState} from "react";
import ReactTooltip from 'react-tooltip';

/**
 * @brief This a circle describing the streamer
 * @param {*} props 
 */
function StreamerCircle(props){

    const streamer = props.streamer;
    const imgSrc = ( streamer.userImage ) ? streamer.userImage : "https://img.icons8.com/material/4ac144/256/user-male.png"
    ;
    return(
        <div data-tip={streamer.displayName} className={style.streamerCircleDiv}>
        <ReactTooltip />  
        <img className={style.streamerCircle}
            src={imgSrc} 
        > 
        </img>
    </div>
    );
}

export default StreamerCircle;