import style from './liveStream.module.css'
import React, {useState} from "react";
import StreamSelector from "./streamerSelector";

function StreamSelectorBar(props){

    // The initial current streamer is the host
    const currentStreamer = props.currentStreamer;
    const setCurrentStreamer = props.setCurrentStreamer;
    // For initiall implementation we'll treat stream groups as one group TODO: Update this
    const streamGroups = props.streamGroups;
    const streamSelectors = streamGroups.map(streamer=>{
        if(streamer !== currentStreamer)
        {
            return <StreamSelector key={streamer} className={style.streamSelector}
                streamer={streamer}
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