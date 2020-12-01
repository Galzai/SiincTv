import style from './liveStream.module.css'
import React, {useState} from "react";
import StreamSelector from "./streamSelector";

function StreamSelectorBar(props){

    // The initial current streamer is the host
    const [currentStreamer, setCurrentStreamer] = useState(props.streamHost);
    // For initiall implementation we'll treat stream groups as one group TODO: Update this
    const streamGroups = props.streamGroups;
    const streamSelectors = streamGroups.map(streamer=>{
        if(streamer !== currentStreamer)
        {
            return <StreamSelector className={style.streamSelector}
                streamer={streamer}
                setCurrentStreamer={setCurrentStreamer}
                currentStreamer={currentStream}
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