import StreamViewBox from '../components/liveStream/streamingViewBox'
import StreamDetails from '../components/liveStream/streamDetails'
import Chat from '../chat/chat'
import {streamGroupsMock} from "../mocks/streamGroupsMock";
import style from '../components/liveStream/liveStream.module.css'

function StreamMock(props) {
    return(
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
            <Chat
                roomId="test"
             />

        </div>
           
    )
}

export default StreamMock;