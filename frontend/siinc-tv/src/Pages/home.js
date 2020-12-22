import LiveStream from '../components/liveStream/liveStream.js'
import {streamGroupsMock} from "../mocks/streamGroupsMock";
import streamActions from "../stream/streamActions";
import LiveFeed from '../components/liveFeed/liveFeed.js'
import React, {useState} from "react";
function HomePage(props) {


 return(

<div>
    <h1>Live Now</h1>
    <LiveFeed/>
</div>

    )
}

export default HomePage;
