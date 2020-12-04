import StreamViewBox from '../components/liveStream/streamingViewBox'
import StreamDetails from '../components/liveStream/streamDetails'
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
            >
            </StreamDetails>
        </div>
           
    )
}

export default StreamMock;