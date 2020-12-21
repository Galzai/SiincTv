import style from './liveFeed.module.css'
import React, {useState} from "react";
import LiveStreamPreview from "../previews/liveStreamPreview";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const { default: streamActions } = require("../../stream/streamActions");

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
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
  
function LiveStreamFeed(props){
    // Take a streamData and display it in a carousel
    const [streamDatas, setStreamDatas] = useState([]);
    const streamPreviews = streamDatas.map(streamData=>{

            return(
            <div className={style.liveFeedContainer}>
                <LiveStreamPreview key={streamData._id} 
                streamData={streamData}
                />
            </div>); 
         
    } )

    React.useEffect(() => {
        console.log("useEffect")
        streamActions.getStreamsByStatus(1, "Live").then((result)=>{
            setStreamDatas(result);
        });
      }, [streamDatas]);

    return(
        <div className={style.liveFeedBar}> 
        <Carousel responsive={responsive}
                        infinite={true}
        >
                {streamPreviews}

                </Carousel>
            </div>
    );
}

export default LiveStreamFeed;