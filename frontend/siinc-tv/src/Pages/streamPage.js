import LiveStreamPage from "./liveStreamPage";
import {useContext, useState} from "react"
const { default: streamActions } = require("../stream/streamActions");

function LivetreamPage(props) {

    const [streamData, setStreamData] = useState(null);
    const id = props.match.params.id;

    const displayStream=()=>{


        const getStreamData= async ()=>{
            setStreamData(await streamActions.getStreamById(props.match.params.id));
        } 
        // We get the data asyncrhoniously and set it
        if(streamData === null)
        {
            getStreamData();
            return;
        }
        console.log(streamData);
        // If there no stream display a message TODO: Create an error page
        if(streamData === "stream/invalid_id")
        {
            return(
            <div>
                <text>"Oh No, there is no stream with such id!"</text>
            </div>);
        }
        // We select what type of page to display depending on the status
        console.log(streamData.status)
        switch(streamData.status){
            case 'Live':

                return <LiveStreamPage
                    streamData={streamData}
                />
            default:
                return <text>Not yet supported</text>
        }

    };

    return(  
        <div>
        {displayStream()}
        </div>
    );
}

export default LivetreamPage;