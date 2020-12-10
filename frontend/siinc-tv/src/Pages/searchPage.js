
import {streamDataMock} from "../mocks/mockStreamData";
import StreamSearchResults from "../components/search/streamSearchResults";
import StreamActions from '../stream/streamActions';

function SearchPage(props) {
    const searchString = props.match.params.searchString;
    return(
        <div>
            <StreamSearchResults
            searchString={searchString}
            status={"Live"}
            />
        </div>       
    )
}

export default SearchPage;