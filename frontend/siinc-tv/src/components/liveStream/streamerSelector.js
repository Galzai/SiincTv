import style from './liveStream.module.css'
import React, {useState} from "react";
import LiveStream from "./liveStream";


/**
 * @brief This is a small clickable stream window used to select current streamer.
 * @param {*} props 
 */
function StreamSelector(props){

    const [streamer, setStreamer] = useState(props.streamer);
    const setCurrentStreamer = props.setCurrentStreamer;
    const currentStreamer = props.currentStreamer;

    // Replaces the main streamer with this streamer
    const selectAsMainStream=()=>{
            setCurrentStreamer(streamer);
            setStreamer(currentStreamer)
    }

    return(
      <div className={style.streamSelector}>
        <LiveStream style={{display:"relative", marginRight:"4px"}}
            streamer={streamer}
            dimensions={{width: "264", height:"148.5"}}
            muted={true}
         />
         <button className={style.streamSelectorButton} onClick={selectAsMainStream}>
           Set as main
         </button>
        </div>
    );
}

export default StreamSelector;