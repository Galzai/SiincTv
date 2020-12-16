
import {streamDataMock} from "../mocks/mockStreamData";
import {streamGroupsMock} from "../mocks/streamGroupsMock";
import StreamSearchResults from "../components/search/streamSearchResults";
import UserPreview from "../components/previews/userPreview"

function SearchPage(props) {
    const searchString = props.match.params.searchString;
    const resultType = "users" 
    return(
        <div>
           {resultType === "liveStream" &&  <StreamSearchResults
            searchString={searchString}
            status={"Live"}
            />}
            {resultType === "users" &&  <UserPreview
            user={streamGroupsMock[0][0]}
            />}
                        {resultType === "users" &&  <UserPreview
            user={streamGroupsMock[0][0]}
            />}
        </div>       
    )
}

export default SearchPage;