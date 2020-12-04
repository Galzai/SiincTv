import StreamViewBox from '../components/liveStream/streamingViewBox'
import {streamGroupsMock} from "../mocks/streamGroupsMock";

function StreamMock(props) {
    return(
        <div>
            <StreamViewBox
                currentStreamer="thehalfwayhouse"
                streamGroups={streamGroupsMock}  
                >
            </StreamViewBox>
        </div>
        
        

        
    )
}

export default StreamMock;