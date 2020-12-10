
import {streamDataMock} from "../mocks/mockStreamData";
import StreamSearchResults from "../components/search/streamSearchResults";
import StreamActions from '../stream/streamActions';

function SearchPage(props) {
    // const test = StreamActions.searchStreams("Test", 1, "Live");
    return(
        <div>
            <StreamSearchResults
            searchString={"test"}
            status={"Live"}
            />
        </div>       
    )
}

export default SearchPage;