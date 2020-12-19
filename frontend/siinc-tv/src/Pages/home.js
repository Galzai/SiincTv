
import YoutubeLiveStream from '../components/liveStream/youtubeLiveStream.js'

function HomePage(props) {
    const dimensions = {height:315, width:560};
    return(

            <YoutubeLiveStream
            displayName={"Test name"}
            youtubeId = {"UCI-Ho-GaKYbtMzXJWmWAsrg"}
            dimensions={dimensions}
            muted={false}
            />
    )
}

export default HomePage;