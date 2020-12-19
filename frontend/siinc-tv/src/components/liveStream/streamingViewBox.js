import style from './liveStream.module.css'
import React, {useState} from "react";
import TwitchLiveStream from "./twitchLiveStream";
import StreamSelectorBar from "./streamSelectorBar";

function StreamViewBox(props){

    // The initial current streamer is the host
    const [currentStreamer, setCurrentStreamer] = useState(props.currentStreamer);
    const [streamGroups, setStreamGroups] = useState(props.streamGroups);


    return(
        <div>
        <TwitchLiveStream key={currentStreamer.displayName}
            displayName={currentStreamer.displayName}
            dimensions={{width: "845", height:"463"}}
            muted={false}
         ></TwitchLiveStream>
         <StreamSelectorBar
            currentStreamer={currentStreamer}
            setCurrentStreamer={setCurrentStreamer}
            streamGroups={streamGroups}
            ></StreamSelectorBar>
        </div>

    );
}

export default StreamViewBox;