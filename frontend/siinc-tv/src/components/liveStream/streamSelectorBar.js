import style from './liveStream.module.css'
import React, {useState} from "react";
import StreamSelector from "./streamerSelector";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  
function StreamSelectorBar(props){

    // The initial current streamer is the host
    const currentStreamer = props.currentStreamer;
    const setCurrentStreamer = props.setCurrentStreamer;
    // For initial implementation we'll treat stream groups as one group TODO: Update this
    const streamGroups = props.streamGroups;
    const streamers = flatten(streamGroups);
    const streamSelectors = streamers.map(streamer=>{
        if(streamer.displayName !== currentStreamer.displayName)
        {
            return <StreamSelector key={streamer.displayName} className={style.streamSelector}
                streamer={streamer}
                setCurrentStreamer={setCurrentStreamer}
                currentStreamer={currentStreamer}
            />         
        } 
    } )

    return(
        <div className={style.streamSelectorBar}> 
        <Carousel responsive={responsive}>
                {streamSelectors}
                </Carousel>
            </div>
    );
}

export default StreamSelectorBar;