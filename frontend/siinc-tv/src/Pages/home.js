import userActions from "../user/userActions";
import LiveFeed from '../components/liveFeed/liveFeed.js'
import React, {useState} from "react";


function HomePage(props) {

    function poke(){
        userActions.pokeYourself().then();
    }

    return(
    <div>
        <h1>Live Now</h1>
        <LiveFeed/>
        <button onClick={poke}>Poke yoself</button>
    </div>

        )
}

export default HomePage;
