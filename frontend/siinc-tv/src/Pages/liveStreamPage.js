import StreamViewBox from '../components/liveStream/streamingViewBox'
import StreamDetails from '../components/liveStream/streamDetails'
import Chat from '../chat/chat'
import {useContext, useState} from "react"
import UserContext from "../userContext";
import style from '../components/liveStream/liveStream.module.css'

function Stream(props) {
    const userContext= useContext(UserContext);
    const [streamData] = useState(props.streamData);
    
    return(
        <div className={style.streamPage}>
            <div className={style.StreamBox}>
                <StreamViewBox
                    currentStreamer={streamData.creator}
                    streamGroups={streamData.streamGroups}  
                    >
                </StreamViewBox>
                <StreamDetails
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