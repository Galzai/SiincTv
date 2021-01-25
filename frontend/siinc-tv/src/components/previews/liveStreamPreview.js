import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { HoverSlideshow } from "react-hover-slideshow";
import style from "./previews.module.css";
import Streamers from "../liveStream/streamers";
import BlockIcon from "@material-ui/icons/Block";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const { default: streamActions } = require("../../stream/streamActions");

const height = "240";
const width = "426";

/**
 * This module is in charge of displaying the preview of a single stream
 * 
 * @prop {streamData} streamData The data describing the stream
 * @component
 * @category Frontend
 */
function LiveStreamPreview(props) {
  const streamData = props.streamData;
  const streamers = flatten(streamData.streamGroups);
  const [streamPreviews, setStreamPreviews] = useState([]);
  const labels =
    streamData.tags == null
      ? null
      : streamData.tags.map((tag) => {
          return (
            <span className={style.label} key={tag}>
              {tag}
            </span>
          );
        });

  displayPreviewImage();

  // Flattens an array of arrays
  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }

  /**
   * Maps preview thubmnails from youtube to array
   */
  async function mapYoutubeThumbnails() {
    let resArray = [];
    const youtubeStreamers = streamers.filter(
      (streamer) => streamer.youtubeId != null
    );
    if (youtubeStreamers && youtubeStreamers.length > 0) {
      for (let i = 0; i < youtubeStreamers.length; ++i) {
        let streamer = youtubeStreamers[i];
        let url = await streamActions.getYoutubeVideoId(streamer.youtubeId);
        resArray.push(`https://img.youtube.com/vi/${url}/mqdefault.jpg`);
      }
    }
    return resArray;
  }

  /**
   * Maps twitch streams response to preview images
   *
   * @param {*} twitchStreamResponse The response of the stream id's from the backend
   */
  function mapTwitchThumbnails(twitchStreamResponse) {
    if (Array.isArray(twitchStreamResponse)) {
      return twitchStreamResponse.map((twitchStream) =>
        twitchStream.thumbnail_url.replace(
          "{width}x{height}",
          `${width}x${height}`
        )
      );
    }
    return [];
  }

  /**
   * Displays the preview images
   */
  function displayPreviewImage() {
    if (streamPreviews.length === 0) {
      streamActions
        .getAllStreamGroupsStreams(streamData.streamGroups)
        .then(async (twitchStreamResponse) => {
          let res = [];
          if (twitchStreamResponse) {
            res.push(...mapTwitchThumbnails(twitchStreamResponse));
          }
          const youtubeThumb = await mapYoutubeThumbnails();
          if (youtubeThumb.length !== 0) res.push(...youtubeThumb);
          setStreamPreviews(res);
        });
    }
  }

  /**
   * Redirects to the stream page on click
   */
  function handleRedirect() {
    props.history.push(`/stream_pages/${streamData._id}`);
  }

  return (
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
      <h2 className={style.viewers}>Viewers: {streamData.numOfViewers}</h2>
      <div>
        {!streamData.joinOnly && (
          <div className={style.joinableDiv}>
            <h2 className={style.joinable}> Joinable</h2>
            {<CheckCircleIcon style={{ color: "green" }} />}
          </div>
        )}
      </div>
      <div className={style.streamers}>
        <Streamers streamGroups={streamData.streamGroups} />
      </div>
      <div className={style.labels}>{labels}</div>
    </div>
  );
}

export default withRouter(LiveStreamPreview);
