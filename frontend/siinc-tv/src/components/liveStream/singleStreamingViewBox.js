import React, {useState} from "react";
import LiveStream from "./liveStream";
import style from './liveStream.module.css'
import StreamSelectorBar from "./streamSelectorBar";

function SingleStreamViewBox(props){

    // The initial current streamer is the host
    const [currentStreamer, setCurrentStreamer] = useState(props.currentStreamer);
    const [streamGroups, setStreamGroups] = useState(props.streamGroups);
    

    return(
        <div className={style.singleStreamViewBox}>
        <LiveStream key={currentStreamer.displayName}
            streamer={currentStreamer}
            dimensions={{width: "845", height:"475"}}
            muted={false}
         ></LiveStream>
         <StreamSelectorBar
            currentStreamer={currentStreamer}
            setCurrentStreamer={setCurrentStreamer}
            streamGroups={streamGroups}
            ></StreamSelectorBar>
        </div>

    );
}

export default SingleStreamViewBox;