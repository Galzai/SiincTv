
import {streamDataMock} from "../mocks/mockStreamData";
const { default: streamActions } = require("../stream/streamActions");
function SearchPage(props) {
    return(
        <div>
            <button onClick={()=>{streamActions.getAllStreamGroupsStreams(streamDataMock.streamGroups)}}>Click me boy</button>
        </div>       
    )
}

export default SearchPage;