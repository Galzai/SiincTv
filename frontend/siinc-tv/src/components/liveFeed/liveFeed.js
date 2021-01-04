import style from './liveFeed.module.css'
import React, {useState} from "react";
import LiveStreamPreview from "../previews/liveStreamPreview";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const { default: streamActions } = require("../../stream/streamActions");

  const responsive = {
    superLargeDesktop: {
      breakpoint: {max: 4000, min: 3000},
      items: 5,
      slidesToSlide: 2
    },
    desktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1600, min: 1200 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 1200, min: 0 },
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

        if(streamDatas.length === 0){
          streamActions.getStreamsByStatus(1, "Live").then((result)=>{
            setStreamDatas(result);
        });
        }

      }, [streamDatas]);

    return(
      <div>
         <div className={style.liveFeedBar}> 
          <h1>Live Now</h1>
          <Carousel responsive={responsive}
                    infinite={true}
          >
                {streamPreviews}

          </Carousel>
        </div>
      </div>
    );
}

export default LiveStreamFeed;