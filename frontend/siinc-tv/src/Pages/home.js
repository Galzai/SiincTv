import userActions from "../user/userActions";
import LiveFeed from '../components/liveFeed/liveFeed.js'
import style from './homepage.module.css'
import React, {useState} from "react";


function HomePage(props) {

    function poke(){
        userActions.pokeYourself().then();
    }

    return(
    <div className={style.homePage}>
        <LiveFeed/>
        <button onClick={poke}>Poke yoself</button>
    </div>

        )
}

export default HomePage;
