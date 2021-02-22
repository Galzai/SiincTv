
import style from './sidebar.module.css';
import { withRouter } from 'react-router-dom';
import React, {useContext, useState, useEffect} from 'react';
import UserContext from "../../userContext";
import StreamSocket from "../liveStream/streamSocket";
import userActions from "../../user/userActions";

const { default: streamActions } = require("../../stream/streamActions");

/**
 * @brief Side bar component
 * 
 * @component
 * @category Frontend
 * @subcategory Menu
 */
function SideBar(props) {
    const userContext = useContext(UserContext);
    const currentStream = userContext.user ? userContext.user.currentStream : null;
    const {endStream, sendEndStream} = StreamSocket(currentStream ? currentStream.eventId : null);
    const friends = userContext.user && userContext.user.friendsData ?userContext.user.friendsData.friendsList : [];
    const followings = userContext.user && userContext.user.followData ?userContext.user.followData.followingList : [];

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
        return((friends).slice(0, 10).map((friend, index)=>{
            return(
                    <div className={style.friendDiv}>
                        <img alt="" className={style.streamerCircle}
                            src={friend.userImage}/>
                        <div className={style.friend}
                        onClick={()=>(props.history.push(`/users/${friend.memberId}`))}> 
                            {friend.displayName}
                            <OnlineStatus userId={friend.memberId}></OnlineStatus>
                        </div>
                    </div>
            )
            
        })) ;
    }
    // change later css styles to followers specific styles
    function mapFollowings(){
        return((followings).slice(0, 10).map((following, index)=>{
            return(
                    <div className={style.friendDiv}>
                        <img alt="" className={style.streamerCircle}
                            src={following.userImage}/>
                        <div className={style.friend}
                        onClick={()=>(props.history.push(`/users/${following.userId}`))}> 
                            {following.userName}
                            <OnlineStatus userId={following.userId}></OnlineStatus>
                        </div>
                    </div>
            )
            
        })) ;
    }

    function redirectToFriends(){
        props.history.push(`/users/${userContext.user._id}/friends`);
    }

    function redirectoToFollowing(){
        props.history.push(`/users/${userContext.user._id}/following`);
    }

    return(
        <div className={style.sidebar}>
            <div className={style.sidebarContent}>
                {currentStream && <div className={style.currentStreamDiv}>
                    <h3 className={style.sidebarTitle}>My current stream</h3>
                    <div className={style.currentStream}
                    onClick={handleRedirect}>
                        {currentStream.name ? currentStream.name : "Untitled stream"}
                    </div>
                    <button className={style.closeCurrentStreamBtn} onClick={closeStream}></button>
                </div>}
                {(friends.length !== 0) && <div>
                <h3 className={style.sidebarTitle}>Friends</h3> 
                {mapFriends()}
                {(friends.length >= 10 ) && <label className={style.seeAllStyle} onClick={redirectToFriends}>See all friends...</label>}
                </div>}
                {(followings.length !== 0) && <div>
                <h3 className={style.sidebarTitle}>Following</h3> 
                {mapFollowings()}
                {(followings.length >= 10) && <label className={style.seeAllStyle} onClick={redirectoToFollowing}>See all following...</label>}
                </div>}
                <div className={style.reportMail}>
                    For suggestions and bug reports send us an email at <a className = {style.emailDesign} href="mailto:report@siinc.tv">report@siinc.tv</a>
                </div>
            </div>
        </div>
    );
}

/**
 * @brief Online green circle for users in side bar
 * 
 * @component
 * @category Frontend
 * @subcategory Sidebar
 */
function OnlineStatus(props) {
    const userId = props.userId;
    const [userOnline, setUserOnline] = useState(false);

    useEffect(()=>{ 
        let isMounted = true;
        userActions.isUserOnline(userId)
        .then((data) => {
            if( isMounted ) {
                setUserOnline(data)
            }
        })
        return (() => {isMounted = false})
    })

    return(
        <div style={{display:"inline-block"}}>
            { userOnline && <div className={style.online}></div>}
        </div>
    )
}

export default withRouter(SideBar);