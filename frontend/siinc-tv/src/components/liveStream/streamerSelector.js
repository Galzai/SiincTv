import style from './liveStream.module.css'
import React, {useState} from "react";
import LiveStream from "./liveStream";


/**
 * @brief This is a small clickable stream window used to select current streamer.
 * @param {*} props 
 */
function StreamSelector(props){

    const [streamer, setStreamer] = useState(props.streamer);
    const setCurrentStreamer = useState(setCurrentStreamer);
    const currentStreamer = useState(currentStreamer);

    // Replaces the main streamer with this streamer
    const selectAsMainStream=()=>{
            setCurrentStreamer(streamer);
            setStreamer(currentStreamer)
    }

    return(
      <div onClick={selectAsMainStream}>
        <LiveStream style={{display:"relative", marginRight:"10px"}}
            userName={streamer}
            dimensions={{width: "264", height:"145.13"}}
         />
        </div>
    );
}

export default StreamSelector;