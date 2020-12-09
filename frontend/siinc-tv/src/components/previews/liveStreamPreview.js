import React, {useState, useRef} from "react";
import { HoverSlideshow } from "react-hover-slideshow";
const { default: streamActions } = require("../../stream/streamActions");

const height = "400";
const width = "300"
function LiveStreamPreview(props){
    
    const streamData = props.streamData;
    const [streamPreviews, setStreamPreviews] = useState([]);
    displayPreviewImage();
    // We need to get the previews asynchrounisly and then update the preview
    function displayPreviewImage(){
        console.log(streamPreviews);
        if(streamPreviews.length === 0 )
        {
            console.log(streamPreviews);
            streamActions.getAllStreamGroupsStreams(streamData.streamGroups).then(
                (twitchStreamResponse)=>{
                    setStreamPreviews(twitchStreamResponse.map(
                        (twitchStream)=>
                        twitchStream.thumbnail_url.replace("{width}x{height}",`${width}x${height}`)
                        ));
                }
            )
        }
    }

    return(
        <div>
            <HoverSlideshow
				aria-label={streamData.name}
				images={streamPreviews}
				width="400px"
				height="300px"
			/>
        </div>
    );
}

export default LiveStreamPreview;