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
        // If there no stream display a message TODO: Create an error page
        if(id == "ended")
        {
            return(
                <div>
                    <h1>This stream has ended!</h1>
                </div>);
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
                <h1>Oh No, there is no stream with such id! = (</h1>
            </div>);
        }
        // We select what type of page to display depending on the status
        console.log(streamData.status)
        switch(streamData.status){
            case 'Live':
                return <LiveStreamPage
                    streamData={streamData}
                />
                case 'Scheduled':
                    return(
                        <div>
                        <h1>Scheduled stream page - under construction</h1>
                        <h1>Stream Name:</h1>
                        <h1>{streamData.name}</h1>
                        <h1>Stream date:</h1>
                        <h1>{streamData.date}</h1>
                        </div>
                    );
        }

    };

    return(  
        <div>
        {displayStream()}
        </div>
    );
}

export default LivetreamPage;