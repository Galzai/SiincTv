
import {streamDataMock} from "../mocks/mockStreamData";
import LiveStreamPreview from "../components/previews/liveStreamPreview";

function SearchPage(props) {
    return(
        <div>
            <LiveStreamPreview streamData ={streamDataMock}/>
        </div>       
    )
}

export default SearchPage;