
import LiveStream from '../components/liveStream/liveStream.js'
import {streamGroupsMock} from "../mocks/streamGroupsMock";
import streamActions from "../stream/streamActions";
import React, {useState} from "react";
function HomePage(props) {
    const dimensions = {height:315, width:560};
    const [videUrl, setVideoUrl] = useState(null);

    function test(){
        if(!videUrl){
            async function test2(){
                setVideoUrl(await streamActions.getYoutubeVideoId("UCI-Ho-GaKYbtMzXJWmWAsrg"));
            }
            test2().then();
        }
    }
    test();
    return(

<div>
<LiveStream
            streamer={streamGroupsMock[0][1]}
            dimensions={dimensions}
            muted={false}
            />
           {videUrl && < img src={`https://img.youtube.com/vi/${videUrl}/mqdefault.jpg`}></img>}

</div>

    )
}

export default HomePage;