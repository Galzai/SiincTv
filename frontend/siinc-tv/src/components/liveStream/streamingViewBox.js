import style from './liveStream.module.css'
import React, {useState} from "react";
import LiveStream from "./liveStream";

function StreamViewBox(props){

    // The initial current streamer is the host
    const [currentStreamer, setCurrentStreamer] = useState(props.streamHost);
    const [streamGroups, setStreamGroups] = useState(props.streamGroups);


    return(
        <div>
        <LiveStream
            userName={currentStream}
            dimensions={{width: "845", height:"463"}}
         ></LiveStream>
        </div>

    );
}

export default StreamViewBox;