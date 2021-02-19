import LiveFeed from "../components/liveFeed/liveFeed.js";
import style from "./homepage.module.css";
import React from "react";

/**
 * Thie page is in charge of the default home page
 * 
 * @component
 * @category Frontend
 * @subcategory Pages
 */

function HomePage(props) {
  return (
    <div className={style.homePage}>
      <LiveFeed />
    </div>
  );
}

export default HomePage;
