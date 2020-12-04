import React, {useState, useRef} from "react";

const srcPre = "https://player.twitch.tv/?channel=";
const srcPost = "&parent=localhost" 
function LiveStream(props){

    const [userName, setUserName] = useState(props.userName);
    const [dimensions, setDimension] = useState(props.dimensions);
    const [streamSrc, setStreamSrc] = useState(srcPre + props.userName + srcPost);
    const [muted, setMuted] = useState(props.muted);

    return(

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
    );
}

export default LiveStream;