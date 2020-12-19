
import LiveStream from '../components/liveStream/liveStream.js'
import {streamGroupsMock} from "../mocks/streamGroupsMock";
function HomePage(props) {
    const dimensions = {height:315, width:560};
    return(
<div>
<LiveStream
            streamer={streamGroupsMock[0][1]}
            dimensions={dimensions}
            muted={false}
            />
            <img src="https://i.ytimg.com/vi/live/UCI-Ho-GaKYbtMzXJWmWAsrg/default_live.jpg" alt="Italian Trulli"></img>

</div>

    )
}

export default HomePage;