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
                <button onClick={requestToJoinStream}>Request to join</button>
            </div> 
        </div>
                
    )
}

export default Stream;