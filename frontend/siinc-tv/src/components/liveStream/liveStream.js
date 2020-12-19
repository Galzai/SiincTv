import React, {useState, useRef} from "react";
import style from './liveStream.module.css'
import Streamers from "./streamers";

const srcPre = "https://player.twitch.tv/?channel=";
const srcPost = "&parent=localhost" 
function LiveStream(props){

    const [displayName, setUserName] = useState(props.displayName);
    const [dimensions, setDimension] = useState(props.dimensions);
    const [streamSrc, setStreamSrc] = useState(srcPre + props.displayName + srcPost);
    const [muted, setMuted] = useState(props.muted);

    return(
        <div>
            <h1 className={style.streamTitle}>{props.streamTitle}</h1>
            <iframe style ={{marginRight:"27px"}}
                src={streamSrc}
                frameBorder="0" 
                allowFullScreen={true}
                scrolling="no" 
                height={dimensions.height}
                width={dimensions.width}
                muted={muted}
            >
            </iframe>
            <Streamers
            streamGroups={props.streamGroups}
            />
        </div>
        
    );
}

export default LiveStream;