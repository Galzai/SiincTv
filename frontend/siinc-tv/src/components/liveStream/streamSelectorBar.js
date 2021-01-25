
import style from "./liveStream.module.css";
import React from "react";
import StreamSelector from "./streamerSelector";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

/**
 * This component is in charge of the selector bar in the "single main" viewbox
 * 
 * @prop {streamerData} currentStreamer current main streamer
 * @prop {Function} setCurrentStreamer setter for the main streamer
 * @category Frontend
 * @component
 */
function StreamSelectorBar(props) {
  // The initial current streamer is the host
  const currentStreamer = props.currentStreamer;
  const setCurrentStreamer = props.setCurrentStreamer;
  // For initial implementation we'll treat stream groups as one group TODO: Update this
  const streamGroups = props.streamGroups;
  const streamers = flatten(streamGroups);
  const streamSelectors = streamers.map((streamer) => {
    if (streamer.displayName !== currentStreamer.displayName) {
      return (
        <StreamSelector
          key={streamer.displayName}
          className={style.streamSelector}
          streamer={streamer}
          setCurrentStreamer={setCurrentStreamer}
          currentStreamer={currentStreamer}
        />
      );
    }
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 5000, min: 1156 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1156, min: 830 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 830, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  if (streamers.length === 3) {
    responsive["desktop"]["items"] = 2;
  }

  return (
    <div className={style.streamSelectorBar}>
      <Carousel responsive={responsive}>{streamSelectors}</Carousel>
    </div>
  );
}

export default StreamSelectorBar;
