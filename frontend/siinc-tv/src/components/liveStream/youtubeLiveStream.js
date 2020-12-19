import React, {useState, useRef} from "react";

const srcPre = "https://www.youtube.com/embed/live_stream?channel=";
function YoutubeLiveStream(props){

    const [displayName, setUserName] = useState(props.displayName);
    const [youtubeId, setYoutubeId] = useState(props.youtubeId)
    const [dimensions, setDimension] = useState(props.dimensions);
    const [streamSrc, setStreamSrc] = useState(srcPre + props.youtubeId);
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

export default YoutubeLiveStream;