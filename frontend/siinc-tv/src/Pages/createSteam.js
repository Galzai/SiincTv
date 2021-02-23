import UserContext from "../userContext";
import { useContext } from "react";
//import NewScheduledStream from "../components/streamCreation/newScheduledStream";
import NewLiveStream from "../components/streamCreation/newLiveStream";
import style from "./searchPage.module.css";

/**
 * This is the stream creation page
 * 
 * @component
 * @category Frontend
 * @subcategory Pages
 */
function CreateStreamPage(props) {
  const userContext = useContext(UserContext);
  console.log(userContext.user);
  return (
    <div>
      {/* { user && user.twitchData && <NewScheduledStream user={user}/> } */}
      {userContext.user &&
        (userContext.user.twitchData || (userContext.user.googleData && 
          userContext.user.googleData.youtubeId)) &&
        !userContext.user.currentStream && (
          <NewLiveStream user={userContext.user} />
        )}
      {(!userContext.user ||
        (!userContext.user.twitchData && !(userContext.user.googleData && 
          userContext.user.googleData.youtubeId))) && (
        <h1 className={style.endStream}>
          Login with a twitch account or a Google account with a YouTube channel in order to create a stream!{" "}
        </h1>
      )}
      {userContext.user && userContext.user.currentStream && (
        <h1 className={style.endStream}>
          You already have a a current stream!
        </h1>
      )}
    </div>
  );
}

export default CreateStreamPage;
