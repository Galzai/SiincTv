
const { default: streamActions } = require("../stream/streamActions");
function SearchPage(props) {
    return(
        <div>
            <button onClick={()=>{streamActions.getTwitchUserDataByName('thehalfwayhouse')}}>Click me boy</button>
        </div>       
    )
}

export default SearchPage;