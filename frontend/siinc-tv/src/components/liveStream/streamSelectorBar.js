import style from './liveStream.module.css'
import React, {useState} from "react";
import StreamSelector from "./streamerSelector";

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

function StreamSelectorBar(props){

    // The initial current streamer is the host
    const currentStreamer = props.currentStreamer;
    const setCurrentStreamer = props.setCurrentStreamer;
    // For initiall implementation we'll treat stream groups as one group TODO: Update this
    const streamGroups = props.streamGroups;
    const streamers = flatten(streamGroups);
    const streamSelectors = streamers.map(streamer=>{
        if(streamer.userName !== currentStreamer)
        {
            return <StreamSelector key={streamer.userName} className={style.streamSelector}
                streamer={streamer.userName}
                setCurrentStreamer={setCurrentStreamer}
                currentStreamer={currentStreamer}
            />         
        } 
    } )

    return(
        <div className={style.streamSelectorBar}>
            {streamSelectors}
        </div>

    );
}

export default StreamSelectorBar;