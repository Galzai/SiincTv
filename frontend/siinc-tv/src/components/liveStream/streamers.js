import style from './liveStream.module.css'
import StreamerCircle from "./streamerCircle";
import React, {useState} from "react";


function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

/**
 * @brief This holds all our streamers
 * @param {*} props 
 */
function Streamers(props){

    const streamGroups = props.streamGroups;
    const flatGroups = flatten(streamGroups);
    const streamCircles = flatGroups.map(streamer=>{
            return <StreamerCircle
            key={streamer.userName}
            streamer={streamer}
            />         
    } )

    return(
        <div className={style.streamers}>
        {streamCircles}
        </div>
    );
}
export default Streamers;