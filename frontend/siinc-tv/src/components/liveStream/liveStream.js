import React, {useState, useRef} from "react";
import TwitchLiveStream from "./twitchLiveStream";
import YoutubeLiveStream from "./youtubeLiveStream";
import style from './liveStream.module.css'

const srcPre = "https://player.twitch.tv/?channel=";
const srcPost = "&parent=localhost" 
function LiveStream(props){
    const [streamer, setStreamer] = useState(props.streamer);
    const [dimensions, setDimension] = useState(props.dimensions);

    const displayStreamByType=()=>{
        if(streamer.youtubeId)
        {
            return(
                <YoutubeLiveStream
                displayName={streamer.displayName}
                youtubeId = {streamer.youtubeId}
                dimensions={dimensions}
                muted={true}
                />
            )
        }
        else //TODO: Change to if
        {
            return(
                <TwitchLiveStream
                displayName={streamer.displayName}
                dimensions={dimensions}
                muted={true} />
            )
        }
    }

    return(
        <div>
            {displayStreamByType()}
        </div>

    );
}

export default LiveStream;