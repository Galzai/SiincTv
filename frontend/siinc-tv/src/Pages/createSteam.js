import UserContext from "../userContext";
import {useContext} from "react"
import NewScheduledStream from "../components/streamCreation/newScheduledStream";
import NewLiveStream from "../components/streamCreation/newLiveStream";

function CreateStreamPage(props) {
    const userContext = useContext(UserContext);
    console.log(userContext.user);
    return(
        <div>
            {/* { user && user.twitchData && <NewScheduledStream user={user}/> } */}
            {userContext.user && (userContext.user.twitchData || userContext.user.googleData) && (!userContext.user.currentStream) && <NewLiveStream user={userContext.user}/> }
            {(!userContext.user || (!userContext.user.twitchData && !userContext.user.googleData)) && 
            <h1>Must have a twitch or youtube account in order to create a stream! </h1>}
            {(userContext.user && (userContext.user.currentStream)) && <h1>You already have a a current stream!</h1>}
  
        </div>
    );
}

export default CreateStreamPage;