import SingleStreamViewBox from '../components/liveStream/singleStreamingViewBox'
import SplitStreamViewBox from '../components/liveStream/splitScreenViewBox'
import StreamDetails from '../components/liveStream/streamDetails'
import StreamActions from '../stream/streamActions'
import userUtils from '../user/userUtils'
import Chat from '../chat/chat'
import {useContext, useState} from "react"
import UserContext from "../userContext";
import style from '../components/liveStream/liveStream.module.css'

function Stream(props) {
    const userContext= useContext(UserContext);
    const [streamData, setStreamData] = useState(props.streamData);
    const [isSplit, setIsSplit] = useState(false);

    // Sends a join stream request to the stream creator
    function requestToJoinStream()
    {   
        const user = userContext.user;
        const data = {
            displayName: user.username,
            userImage: userUtils.assignImage(user),
            youtubeId: user.googleData ? user.googleData.youtubeId : null   
           };

        StreamActions.requestToJoinStream(data, streamData.creator.memberId).then();
    }
    
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
          return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
      }

    // True if user can request to join, false otherwise
    function canRequestToJoin(){
        const user = userContext.user;
        if(!user) return false;
        if(streamData.joinOnly) return false;
        if(streamData.creator.memberId === user._id) return false;
        const streamGroups = streamData.streamGroups;
        if(streamGroups)
        {
            let filteredStreamers = flatten(streamData.streamGroups).filter(function(streamer){
                return streamer.memberId === user._id;
            });
            if(filteredStreamers && filteredStreamers.length > 0) return false;
        }
        return true;

    }

    return(
        <div>
            <Chat className={style.chatBox}
                    userId = {userContext.user ? userContext.user.username : ""}
                    roomId={streamData._id}
                />
            <div className={style.streamPage}>
                <div className={style.StreamBox}>
                    {(!isSplit) && <SingleStreamViewBox
                        currentStreamer={streamData.creator}
                        streamGroups={streamData.streamGroups}  
                        >
                    </SingleStreamViewBox>}
                    {(isSplit) && <SplitStreamViewBox
                        currentStreamer={streamData.creator}
                        streamGroups={streamData.streamGroups}  
                        >
                    </SplitStreamViewBox>}
                    <StreamDetails
                    id={streamData._id}
                    streamTitle={streamData.name}
                    streamGroups={streamData.streamGroups}  
                    description={streamData.description}
                    setStreamData={setStreamData}
                    >
                    </StreamDetails>
                </div>
                <button className={style.viewButton} onClick={()=>{setIsSplit(!isSplit)}} >{isSplit ? "Single main": "Split screen"}</button>
                {canRequestToJoin() && <button onClick={requestToJoinStream}>Request to join</button>}
            </div> 
        </div>
                
    )
}

export default Stream;