import UserContext from "../userContext";
import NewStream from "../components/streamCreation/newStream";

function CreateStreamPage(props) {
    return(
        <div>
        <UserContext.Consumer>
        {context=>( 
        <div>
            { <NewStream user={context.user}/> }
        </div> )}
        </UserContext.Consumer>    
        </div>
    );
}

export default CreateStreamPage;