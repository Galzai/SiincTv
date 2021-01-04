import React, {useState, useEffect} from "react";
import LiveStream from "./liveStream";
import style from './liveStream.module.css'
import StreamSelectorBar from "./streamSelectorBar";

function SingleStreamViewBox(props){

    // The initial current streamer is the host
    const [currentStreamer, setCurrentStreamer] = useState(props.currentStreamer);
    const [streamGroups, setStreamGroups] = useState(props.streamGroups);


    useEffect(() => {
        setStreamGroups(props.streamGroups);
      }, [props.streamGroups]);

    return(
        <div>
            <div className={style.singleStreamViewBox}>
                <LiveStream key={currentStreamer.displayName}
                    streamer={currentStreamer}
                    muted={false}
                ></LiveStream>
            </div>
            <StreamSelectorBar
                currentStreamer={currentStreamer}
                setCurrentStreamer={setCurrentStreamer}
                streamGroups={streamGroups}
            ></StreamSelectorBar>
        </div>

    );
}

export default SingleStreamViewBox;