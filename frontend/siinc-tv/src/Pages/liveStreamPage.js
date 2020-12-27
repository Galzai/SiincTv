import SingleStreamViewBox from '../components/liveStream/singleStreamingViewBox'
import SplitStreamViewBox from '../components/liveStream/splitScreenViewBox'
import StreamDetails from '../components/liveStream/streamDetails'
import Chat from '../chat/chat'
import {useContext, useState} from "react"
import UserContext from "../userContext";
import style from '../components/liveStream/liveStream.module.css'

function Stream(props) {
    const userContext= useContext(UserContext);
    const [streamData] = useState(props.streamData);
    const [isSplit, setIsSplit] = useState(false);
    
    return(
            <div className={style.streamPage}>
            <button className={style.viewButton} onClick={()=>{setIsSplit(!isSplit)}} >{isSplit ? "Single main": "Split screen"}</button>
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
                    >
                    </StreamDetails>
                </div>

            <Chat className={style.chatBox}
                userId = {userContext.user ? userContext.user.username : ""}
                roomId={streamData._id}
                />
            </div>     
    )
}

export default Stream;