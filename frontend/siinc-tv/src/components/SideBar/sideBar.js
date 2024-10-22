
import style from './sidebar.module.css';
import { withRouter } from 'react-router-dom';
import React, {useContext, useState, useEffect} from 'react';
import UserContext from "../../userContext";
import StreamSocket from "../liveStream/streamSocket";
import userActions from "../../user/userActions";
import userUtils from "../../user/userUtils" 

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
                            src={/*friend.userImage*/userUtils.assignImage(friend)}/>
                        <div className={style.friend}> 
                            <label className = {style.friendName} onClick={()=>(props.history.push(`/users/${friend.memberId}`))}>
                                {friend.displayName}
                            </label>
                            <div className={style.statusContainer}>
                                <OnlineStatus userId={friend.memberId}></OnlineStatus>
                                <LiveStatus userId={friend.memberId} history={props.history}></LiveStatus>
                            </div>
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
                            src={/*following.userImage*/userUtils.assignImage(following)}/>
                        <div className={style.friend}>
                            <label className = {style.followName} onClick={()=>(props.history.push(`/users/${following.userId}`))}> 
                                {following.userName}
                            </label>
                            <OnlineStatus userId={following.userId}></OnlineStatus>
                            <LiveStatus userId={following.userId} history={props.history}></LiveStatus>
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
                {(friends && friends.length !== 0) && <div>
                <h3 className={style.sidebarTitle}>Friends</h3> 
                {mapFriends()}
                {(friends && friends.length >= 10 ) && <label className={style.seeAllStyle} onClick={redirectToFriends}>See all friends...</label>}
                </div>}
                {(friends && followings.length !== 0) && <div>
                <h3 className={style.sidebarTitle}>Following</h3> 
                {mapFollowings()}
                {(followings && followings.length >= 10) && <label className={style.seeAllStyle} onClick={redirectoToFollowing}>See all following...</label>}
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

function LiveStatus(props) {
    const userId = props.userId;
    const [streamId, setStreamId] = useState(undefined)

    useEffect(()=>{ 
        let isMounted = true;
        userActions.getUserStreamId(userId)
        .then((data) => {
            if( isMounted ) {
                setStreamId(data)
            }
        })
        return (() => {isMounted = false})
    })

    const redicrectToStream = function (){
        props.history.push(`/stream_pages/${streamId}`);
    }

    return(
        <div style={{display:"inline-block"}}>
            { (streamId !== undefined && streamId !== null && streamId !== "") && 
              <div className={style.live} onClick={redicrectToStream}>live</div>}
        </div>
    )
}

export default withRouter(SideBar);