import React, {useState} from "react";
import { HoverSlideshow } from "react-hover-slideshow";
import style from './previews.module.css'
import Streamers from "../liveStream/streamers";
const { default: streamActions } = require("../../stream/streamActions");


const height = "199";
const width = "362"
function LiveStreamPreview(props){
    
    const streamData = props.streamData;
    const [streamPreviews, setStreamPreviews] = useState([]);
    const labels = (streamData.tags == null) ?  null : streamData.tags.map((tag)=>{
        return(
            <span className={style.label}
            key={tag}>
                {tag}
            </span>
        )
    })
    displayPreviewImage();
    // We need to get the previews asynchrounisly and then update the preview
    function displayPreviewImage(){
        if(streamPreviews.length === 0 )
        {
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
        <div className={style.previewBox}>
            <div>
                <HoverSlideshow
                    aria-label={streamData.name}
                    images={streamPreviews}
                    width={`${width}px`}
                    height={`${height}px`}               
                />
            </div>
        <h2 className={style.previewTitle}>{streamData.name}</h2>
        <div className={style.streamers}>

        <Streamers
            streamGroups={streamData.streamGroups}
            />
        </div>
        <div className={style.labels}>
        {labels}
        </div>
            
        </div>
    );

}

export default LiveStreamPreview;