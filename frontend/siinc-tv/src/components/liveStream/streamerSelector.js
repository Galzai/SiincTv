import style from './liveStream.module.css'
import React, {useState} from "react";
import TwitchLiveStream from "./twitchLiveStream";


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
        <TwitchLiveStream style={{display:"relative", marginRight:"10px"}}
            displayName={streamer.displayName}
            dimensions={{width: "264", height:"145.13"}}
            muted={true}
         />
         <button className={style.streamSelectorButton} onClick={selectAsMainStream}>
           Set as main
         </button>
        </div>
    );
}

export default StreamSelector;