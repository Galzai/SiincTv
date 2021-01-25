/**
 * Thie page is in charge of the default home page
 */

import LiveFeed from "../components/liveFeed/liveFeed.js";
import style from "./homepage.module.css";
import React from "react";

function HomePage(props) {
  return (
    <div className={style.homePage}>
      <LiveFeed />
    </div>
  );
}

export default HomePage;
