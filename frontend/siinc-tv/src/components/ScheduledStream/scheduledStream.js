import style from "./scheduledStream.module.css";
import { Link } from "react-router-dom";

/**
 * @param {newStream} newStream - after a new stream is created, directed to here.
 */

function WaitingRoom(newStream){
    
    const streamName = newStream.name;
    const streamDate = newStream.date;
    const streamDescription = newStream.description;
    const streamGroups = newStream.streamGroups;

    return (
        <div className = {style.createStreamBox}>
            <label className = {style.titleLabel}>The stream</label>
            <label className = {style.streamLabel}>{streamName}</label>
            <label className = {style.descriptionLabel}>{streamDescription}</label>
            <label className = {style.titleLabel}>will occur at {streamDate}</label>
        </div>
    );
}

export default WaitingRoom

