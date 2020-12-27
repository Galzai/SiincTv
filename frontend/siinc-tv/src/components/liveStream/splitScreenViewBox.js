import React, {useState} from "react";
import LiveStream from "./liveStream";
import style from './liveStream.module.css'

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

function SplitScreenViewBox(props){

    // The initial current streamer is the host
    const [currentStreamer, setCurrentStreamer] = useState(props.currentStreamer);
    const [streamGroups, setStreamGroups] = useState(props.streamGroups);


    function generateSplitStream(){
        const streamers = flatten(streamGroups);
        console.log(streamers);
        return(streamers.map(streamer=>{
            return(
                <div className={style.splitScreen}>
                <LiveStream  key={streamer.displayName}
                streamer={streamer}
                dimensions={{width: "676", height:"370"}}
                muted={true}
             ></LiveStream>
                </div>

            )}
        ));
    }

    return(
        <div className={style.splitStreamDiv}>
        {generateSplitStream()}
        </div>

    );
}

export default SplitScreenViewBox;