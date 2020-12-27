import React, {useState, useRef} from "react";

const srcPre = "https://player.twitch.tv/?channel=";
const srcPost = "&parent=localhost" 
function LiveStream(props){

    const [displayName, setUserName] = useState(props.displayName);
    const [dimensions, setDimension] = useState(props.dimensions);
    const [streamSrc, setStreamSrc] = useState(srcPre + props.displayName + srcPost);
    const [muted, setMuted] = useState(props.muted);

    return(

        <iframe style ={{margin:"0px"}}
            src={streamSrc}
            frameBorder="0" 
            allowFullScreen={true}
            scrolling="no" 
            height={dimensions.height}
            width={dimensions.width}
            muted={muted}
            >

        </iframe>
    );
}

export default LiveStream;