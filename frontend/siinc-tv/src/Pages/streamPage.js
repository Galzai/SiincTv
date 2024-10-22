import LiveStreamPage from "./liveStreamPage";
import { useState } from "react";
import style from "./searchPage.module.css";
const { default: streamActions } = require("../stream/streamActions");

/**
 * This class is in charge of rendering the correct stream page according to id
 * 
 * @prop {String} props.match.params.id; the id of the stream we are trying to show
 * @component
 * @category Frontend
 * @subcategory Pages
 */
function LivetreamPage(props) {
  const [streamData, setStreamData] = useState(null);
  const id = props.match.params.id;

  const displayStream = () => {
    const getStreamData = async () => {
      setStreamData(await streamActions.getStreamById(props.match.params.id));
    };
    // If there no stream display a message TODO: Create an error page
    if (id === "ended") {
      return (
        <div className={style.endStream}>
          <h1>This stream has ended!</h1>
        </div>
      );
    }
    // We get the data asyncrhoniously and set it
    if (streamData === null) {
      getStreamData();
      return;
    }
    // If there no stream display a message TODO: Create an error page
    if (streamData === "stream/invalid_id") {
      return (
        <div className={style.endStream}>
          <h1>Oh No, there is no stream with such id! = (</h1>
        </div>
      );
    }
    // We select what type of page to display depending on the status
    switch (streamData.status) {
      case "Live":
        return <LiveStreamPage streamData={streamData} id={id} />;
      case "Scheduled":
        return (
          <div>
            <h1>Scheduled stream page - under construction</h1>
            <h1>Stream Name:</h1>
            <h1>{streamData.name}</h1>
            <h1>Stream date:</h1>
            <h1>{streamData.date}</h1>
          </div>
        );
      default:
        return;
    }
  };

  return <div>{displayStream()}</div>;
}

export default LivetreamPage;
