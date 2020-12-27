
import style from './sidebar.module.css';
import { withRouter } from 'react-router-dom';
import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import UserContext from "../../userContext";
import StreamSocket from "../liveStream/streamSocket";
const { default: streamActions } = require("../../stream/streamActions");

function NavSiincHome(props) {
    return(
        <Link to="/">         
            <div className={style.siincIcon}></div>
        </Link>    
    )
}

function NavCreateStreamButton(props) {
    return(
         <Link to="/create_stream">         
             <div className={style.navCreateStreamButton}>
             </div> 
        </Link> 
    );  
}

function SideBar(props) {
    const userContext = useContext(UserContext);
    const currentStream = userContext.user ? userContext.user.currentStream : null;
    const {endStream, sendEndStream} = StreamSocket(currentStream ? currentStream.eventId : null);
    const friends = userContext.user && userContext.user.friendsData ?userContext.user.friendsData.friendsList : [];

    function handleRedirect() {
        props.history.push(`/stream_pages/${currentStream.eventId}`);
      }

    function closeStream()
    {
        streamActions.closeStream().then();
        sendEndStream();
        window.location.reload();
    }

    function mapFriends(){
        return((friends).map((friend, index)=>{
            return(
                    <div className={style.friendDiv}>
                        <img className={style.streamerCircle}
                            src={friend.userImage}/>
                        <div className={style.friend}
                        onClick={()=>(props.history.push(`/users/${friend.displayName}`))}> 
                            {friend.displayName}
                        </div>
                    </div>


            )
            
        })) ;
    }
    return(
        <div className={style.sidebar}>
            <NavSiincHome></NavSiincHome>
            {userContext.user && <NavCreateStreamButton></NavCreateStreamButton>}
            <div className={style.sidebarContent}>
                {currentStream && <div className={style.currentStreamDiv}>
                    <h3 className={style.sidebarTitle}>My current stream</h3>
                    <div className={style.currentStream}
                    onClick={handleRedirect}>
                        {currentStream.name ? currentStream.name : "Untitled stream"}
                    </div>
                    <button className={style.closeCurrentStreamBtn} onClick={closeStream}></button>
                </div>}
                {(friends.length != 0) && <div>
                <h3 className={style.sidebarTitle}>Friends</h3> 
                {mapFriends()}
                </div>}


        </div>
        </div>
    );
}

export default withRouter(SideBar);