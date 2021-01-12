import LiveFeed from '../components/liveFeed/liveFeed.js'
import style from './homepage.module.css'
import React, {useState} from "react";


function HomePage(props) {

    return(
    <div className={style.homePage}>
        <LiveFeed/>
    </div>

        )
}

export default HomePage;
