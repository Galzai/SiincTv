import style from "./liveFeed.module.css";
import React, { useState, useContext } from "react";
import UserContext from "./../../userContext";
import LiveStreamPreview from "../previews/liveStreamPreview";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const { default: streamActions } = require("../../stream/streamActions");

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1600, min: 1200 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 1200, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

/**
 * This component is in charge of displaying the reccomendations for the current users
 * 
 * @category Frontend
 * @component
 */
function ReccomendedFeed(props) {
  const userContext = useContext(UserContext);
  const [streamDatas, setStreamDatas] = useState([]);
  const streamPreviews = streamDatas.map((streamData) => {
    return (
      <div className={style.liveFeedContainer}>
        <LiveStreamPreview key={streamData._id} streamData={streamData} />
      </div>
    );
  });

  React.useEffect(() => {
      if(userContext.user && userContext.user.interests){
        let searchString = "";
        userContext.user.interests.forEach((interest)=>{
          searchString += " " + interest.value;
        }
          
        );
        streamActions.searchStreams(searchString, 1, "Live").then((result) => {
          setStreamDatas(result);
        });
      }
  }, [userContext.user]);

  return (
    <div>
      <div className={style.liveFeedBar}>
        <h1 className={style.titleOpacity}>Recommendations</h1>
        {(userContext.user.interests && userContext.user.interests.length > 0) && <Carousel responsive={responsive} infinite={true}>
          {streamPreviews}
        </Carousel>}
        {(!(userContext.user.interests && userContext.user.interests.length > 0)) && <label className={style.titleOpacity}>Add interests to your profile to help us reccomend streams!</label>}
        {((userContext.user.interests && userContext.user.interests.length > 0) && (streamPreviews.length === 0)) && <label className={style.titleOpacity}>Could not find any reccomendations for your interests.</label>}
      </div>
    </div>
  );
}

export default ReccomendedFeed;
