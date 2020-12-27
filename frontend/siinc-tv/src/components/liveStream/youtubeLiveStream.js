import React, {useState, useRef} from "react";

const srcPre = "https://www.youtube.com/embed/live_stream?channel=";
const srcPost = "&autoplay=1"
function YoutubeLiveStream(props){

    const [displayName, setdisplayName] = useState(props.displayName);
    const [youtubeId, setYoutubeId] = useState(props.youtubeId)
    const [dimensions, setDimension] = useState(props.dimensions);
    const [streamSrc, setStreamSrc] = useState(srcPre + props.youtubeId + srcPost);
    const [muted, setMuted] = useState(props.muted);

    return(

        <iframe style ={{marginRight:"0px"}}
            src={streamSrc}
            frameBorder="0" 
            allowFullScreen={true}
            scrolling="no" 
            height={dimensions.height}
            width={dimensions.width}
            muted={muted}
            allow="autoplay"
            >
        </iframe>
    );
}

export default YoutubeLiveStream;