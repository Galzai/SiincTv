import style from './liveStream.module.css'
import React, {useState} from "react";
import Streamers from "./streamers";
import ShowMoreText from 'react-show-more-text';
import StreamSocket from './streamSocket'

/**
 * This displays details regarding the stream
 * 
 * @prop {Function} setStreamData setter for current stream data
 * @prop {streamerData} currentStreamer current main streamer
 * @prop {streamGroup[]} streamGroups groups of streamers in the stream
 * @prop {String} streamTitle title of the stream
 * @prop {String} description description of the stream
 * @category Frontend
 * @subcategory Live stream
 * @component
 */
function StreamDetails(props){
    const id = props.id;
    const {endStream, sendEndStream, numOfViews} = StreamSocket(id, props.setStreamData);
    const currentStreamer = props.currentStreamer;
    const streamGroups = props.streamGroups;
    const streamTitle = props.streamTitle;
    const streamDescription = props.description;

    return(
    <div>
        <h3 className={style.streamTitle}>{streamTitle}</h3>
        <h4 className={style.numOfViews}>Viewing: {numOfViews}</h4>
        <Streamers
            streamGroups={streamGroups}
        />
        <div className={style.descriptionDiv}>
            <ShowMoreText className={style.textStyle}>{streamDescription}</ShowMoreText>
        </div>
    </div>
    );
}

export default StreamDetails;