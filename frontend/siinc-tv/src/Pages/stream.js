import StreamViewBox from '../components/liveStream/streamingViewBox'
import StreamDetails from '../components/liveStream/streamDetails'
import Chat from '../chat/chat'
import {streamGroupsMock} from "../mocks/streamGroupsMock";
import {useContext} from "react"
import UserContext from "../userContext";
import style from '../components/liveStream/liveStream.module.css'

function Stream(props) {
    const userContext= useContext(UserContext);
    
    return(
        <div className={style.streamPage}>
            <div className={style.StreamBox}>
                <StreamViewBox
                    currentStreamer="thehalfwayhouse"
                    streamGroups={streamGroupsMock}  
                    >
                </StreamViewBox>
                <StreamDetails
                streamTitle="Test stream title"
                streamGroups={streamGroupsMock}  
                description=
                {"test stream description test stream description test stream description\n\
                test stream description test stream description test stream description\n\
                test stream description test stream description test stream description\n\
                test stream description test stream description test stream description\n\
                test stream description test stream description test stream description\n\
                "}
                >
                </StreamDetails>
            </div>
            <Chat
                userId = {userContext.user ? userContext.user.username : ""}
                roomId="test"
                />
        </div>


           
    )
}

export default Stream;