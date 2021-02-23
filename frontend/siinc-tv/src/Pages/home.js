import LiveFeed from "../components/feed/liveFeed.js";
import ReccomendedFeed from "../components/feed/reccomendedFeed.js";
import style from "./homepage.module.css";
import UserContext from "./../userContext";
import React, {useContext } from "react";

/**
 * Thie page is in charge of the default home page
 * 
 * @component
 * @category Frontend
 * @subcategory Pages
 */

function HomePage(props) {
  const userContext = useContext(UserContext);

  React.useEffect(() => {
    userContext.refreshUserData().then();
  }, []);
  return (
    <div className={style.homePage}>
      <LiveFeed />
      {userContext.user && <ReccomendedFeed />}
    </div>
  );
}

export default HomePage;
