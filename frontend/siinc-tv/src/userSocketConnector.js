import SocketContext from "./socketContext";
import UserContext from "./userContext";
import { useContext, useEffect} from "react";

function UserSocketConnector()
{
    const userContext = useContext(UserContext);
    const socketContext = useContext(SocketContext);

    useEffect(() => {
        console.log("useEffect2");
        console.log(userContext.user);
        console.log(userContext);
        if(userContext.user && userContext.user._id)
        {
            socketContext.socket.emit('userConnection', userContext.user._id);
        }
    },[userContext, socketContext]);
    return(
        <div></div>
    );
}
export default UserSocketConnector;