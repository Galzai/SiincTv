import React, {useState} from "react";
import { withRouter } from 'react-router-dom';
import { HoverSlideshow } from "react-hover-slideshow";
import style from './previews.module.css'
import Streamers from "../liveStream/streamers";
const { default: streamActions } = require("../../stream/streamActions");


const height = "199";
const width = "362"
function LiveStreamPreview(props){
    const streamData = props.streamData;
    const streamers = flatten(streamData.streamGroups);
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
    
    // Flattens an array of arrays
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
    }

    async function mapYoutubeThumbnails()
    {
        let resArray = [];
        const youtubeStreamers = streamers.filter((streamer)=> (streamer.youtubeId != null));
        if(youtubeStreamers && youtubeStreamers.length > 0){
            youtubeStreamers.forEach(async (streamer)=>{

                let url = await streamActions.getYoutubeVideoId(streamer.youtubeId);
                    console.log(url);     
                    resArray.push(`https://img.youtube.com/vi/${url}/mqdefault.jpg`);   
            });
        }
        return resArray;


    }

    // Maps twitch thumbnails to correct size
    function mapTwitchThumbnails(twitchStreamResponse){
        return twitchStreamResponse.map(
            (twitchStream)=>
            twitchStream.thumbnail_url.replace("{width}x{height}",`${width}x${height}`)
            )
    }


    // We need to get the previews asynchrounisly and then update the preview
    function displayPreviewImage(){

        if(streamPreviews.length === 0 )
        {
            streamActions.getAllStreamGroupsStreams(streamData.streamGroups).then(
                async (twitchStreamResponse)=>{
                    console.log(twitchStreamResponse);
                    let res = [];
                    res.push(...mapTwitchThumbnails(twitchStreamResponse));
                    res.push(await mapYoutubeThumbnails());
                    setStreamPreviews(res);
                }

            )
        }
    }


    function handleRedirect() {
        props.history.push(`/stream_pages/${streamData._id}`);
      }

    return(
        <div className={style.previewBox} onClick={handleRedirect}>
            <div>
                <div className={style.preloadDiv}>
                <HoverSlideshow
                    aria-label={streamData.name}
                    images={streamPreviews}
                    width={`${width}px`}
                    height={`${height}px`} 
          
                />
            </div>
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

export default withRouter(LiveStreamPreview);