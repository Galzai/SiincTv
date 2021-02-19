import React, {useState, useContext, useEffect} from 'react';
import style from './profile.module.css'

import Friends from './friends'
import AboutOffline from './aboutOffline'
import AboutOnline from './aboutOnline'
import Schedule from './schedule'
import UserContext from "../../userContext";
import userActions from "../../user/userActions";
import userUtils from "../../user/userUtils";
import {getFriendState, handleFriendAction} from "../../user/friends";
import {isFollowing, handleFollowAction} from "../../user/follows";
import { withRouter } from 'react-router-dom';
import LiveStreamPreview from "../previews/liveStreamPreview";
import SocketContext from "../../socketContext"
import streamActions from '../../stream/streamActions';

import YoutubeLogo from "../../assets/YoutubeIcon.ico"
import TwitchLogo from "../../assets/TwitchIcon.ico"


function Profile(props) {
    
    const [display, setUserInfoDisplay] = useState('about');
    const userContext = useContext(UserContext);
    const userid = props.match.params.userid;
    const [user, setUser] = useState(null);
    const userOnline = 'true';  //todo
    const userRating  = 3 ;  //todo
    const lables = ['LabelOne','LabelTwo','LabelThree', 'LabelFour'] //todo
    const [aboutInfo, setAboutInfo] = useState('') 
    const [editAboutInfo, setEditAboutInfo] = useState(false);
    const [friendsData, setFriendsData] = useState(null)
    const [profilePhoto, setProfilePhoto] = useState("")
    const [userName, setUserName] = useState("")
    const socketContext = useContext(SocketContext);

    useEffect(()=>{
        console.log("MyReder1")
        let isMounted = true;
        userActions.getUserData( userid )
        .then(data=>{
            if( isMounted ) { 
                setFriendsData(data.friendsData);
                setProfilePhoto(userUtils.assignImage(data))
                setUser(data);
                setAboutInfo(data.shortDescription)
                setUserName(data.username)
                if( data.currentStream && data.currentStream !== "" )
                    setUserInfoDisplay("live")
            }
        });
        return (() => {isMounted = false})
    }, [props.match])

    useEffect(()=>{if( user ) setAboutInfo(user.shortDescription)}, [user])

    const showDisplay = () => {
        if( !user )
            return 
        if( display === 'live' ) {
            if( !user.currentStream )
                return
            return <ProfileLiveDisplay streamId={user.currentStream.eventId}></ProfileLiveDisplay>
        }
        if( display === 'friends') {
            return <ProfileFriendsDisplay user={user} routerHistory={props.history}></ProfileFriendsDisplay>
        }
        if( display === 'followers') {
            return <ProfileFollowersDisplay user={user} routerHistory={props.history}></ProfileFollowersDisplay>
        }

    }

    function About(userOnline){
        if (userOnline=true){
            return <AboutOnline
            userName = {userName} />
        } else {
            return <AboutOffline
            userName = {userName}/>
        }
    }

    // Sets type of form to display
    const setLiveDisplay=()=>{
        setUserInfoDisplay('live')
    }
    const setFollowersDisplay=()=>{
        setUserInfoDisplay('followers')
    }
    const setFriendsDisplay=()=>{
        setUserInfoDisplay('friends')
    }

   const debugFriendRepr=()=> {
    if( userContext.user == null || user == null || friendsData == null ) {
        return "Loading";
    }
    if( !userContext.user ) {
        return "Not logged";
    }
    if( String(userContext.user._id) === String(user._id) ) {
        return "Its you!";
    }
    if(userContext.user.friendsData)
    {
        console.log(userContext.user.friendsData)
        console.log(String(user._id))
        if( userContext.user.friendsData.friendsList.find(x=>String(x.memberId)===String(user._id)) != undefined ) {     
            return "Unfriend";
        }
        if( userContext.user.friendsData.sentRequests.find(x=>String(x.userId)===String(user._id)) != undefined ) {
            return "Pending";
        }
        if( userContext.user.friendsData.receivedRequests.find(x=>String(x.userId)===String(user._id)) != undefined ) {
            return "Accept";
        }
    }

    return "Add Friend";
}

    const handleLive=()=>{
        props.history.push(`/stream_pages/${user.currentStream.eventId}`);
    }

    const onClickFriendAction=()=>{
        handleFriendAction(userContext.user, {username: user.username, userId: user._id});
        userContext.refreshUserData();
    }

    const handleSubscribe=()=>{
        //todo
    }

    const onClickFollowAction=()=>{
        if( user )
            handleFollowAction(userContext.user, user);
        userContext.refreshUserData();
    }

    const debugFollowRepr=()=> {
        if( userContext.user == null || user == null )
            return "";
        if( String(userContext.user._id) === String(user._id) )
            return "you!";
        if(userContext.user.followData && 
           userContext.user.followData.followingList.find(x=>String(x.userId)===String(user._id)) != undefined )
            return "Unfollow"
        return "Follow"
    }
    
    const isMe=()=>{
        if( !userContext.user || !user || String(userContext.user._id) !== String(user._id) )
            return false
        return true;
        
    }

    const isUserStreaming=()=>{
        if( !user || 
            !user.currentStream || 
            user.currentStream === "" )
        {
            return false;
        }
        return true;
    }

    const numOfFriends=()=>{
        if( !user )
            return 0;
        console.log("Print user from numOffriends")
        console.log(user)
        return user.friendsData.friendsList.length;
    }

    const numOfFollowers=()=>{
        if( !user )
            return 0;
        return user.followData.followersList.length;
    }

    const shortDescription=()=>{
        if( !user )
            return ""
        return user.shortDescription
    }

    const isUserOnline=()=>{
        
    }

    const onClickEditDesc=()=>{
        setEditAboutInfo(true);
    }

    const onYoutubeClick=()=>{
        console.log("redirect to youtube channel : " + String(user.googleId))
    }

    const onTwitchClick=()=>{
        console.log("redirect to twitch channel : " + String(user.twitchId))
    }

    const onClickDoneEditDesc=()=>{
        userActions.updateUserShortDescription(user._id, aboutInfo)
        .then(() => {
            userActions.getUserData( user._id )
        .then(data => {
            setUser(data)
        })})
        .catch(error => {
            console.log("Error editing desc")
            console.log(error)
        })
        setEditAboutInfo(false);
    }

    return (
        <div>  
            <hr className={style.seperatorTitle}></hr>      
            <div>
                <img className={style.profilePhoto} src={profilePhoto}/>
            </div>
            <div className={style.userInfo}>
                <div className={style.userTitle}>
                    <ul className={style.testMyUl}>
                    <li className={style.testMyLi}><span className={style.name}>{userName}</span></li>
                    <li className={style.testMyLi}>{userOnline==='true' && <span className={style.online}/>}</li>
                    <li className={style.testMyLi}>{ isUserStreaming() && <span className={style.live} onClick={handleLive}>Live</span>}</li>
                    <li className={style.testMyLi}><TwitchLogoLink  user={user} onClick={onTwitchClick}></TwitchLogoLink></li>
                    <li className={style.testMyLi}><YoutubeLogoLink user={user} onClick={onYoutubeClick}></YoutubeLogoLink></li>
                    
                    </ul>
                </div>
                <div className={style.userSocial}>
                    <span className={style.number}>
                                {numOfFriends()} Friends
                                <br />
                                {numOfFollowers()} Followers
                    </span>
                </div>
                <br />
                <div className={style.aboutContent}>
                    <AboutContainer desc={aboutInfo} setDescription={setAboutInfo} editShortDesc={editAboutInfo}></AboutContainer>
                </div>
                <div className={style.pointsSpan}>Points of Interest: </div>
                        {lables.map((value, index) => {
                            return <label className={style.pointsLabel} key={index}>{value}</label>
                        })}
            </div>
            { userContext.user && <div className={style.responsiveButtons}>
                { !isMe() && <button className={style.addFriendsButton} onClick={onClickFriendAction}>{debugFriendRepr()}</button>}
                { !isMe() && <button className={style.addFavoritesButton} onClick={onClickFollowAction}>{debugFollowRepr()}</button>}
                { ( isMe() && (!editAboutInfo) ) &&
                                    <a><button className={style.editButton} onClick={onClickEditDesc} > Edit </button></a> }
                                { ( isMe() && (editAboutInfo) ) &&
                                    <a><button className={style.editButton} onClick={onClickDoneEditDesc} > Done </button></a> }
            </div> }
            <div className={style.userPageSelector}>
                <hr className={style.seperatorSelector}></hr>
                { isUserStreaming() && <button className={style.tabListBtn} onClick={setLiveDisplay}>Live</button>}
                            {<button className={style.tabListBtn} onClick={setFollowersDisplay}>Followers</button>}
                            <button className={style.tabListBtn} onClick={setFriendsDisplay}>Friends</button>
                <div className={style.displayContainer}>
                    {showDisplay()}
                </div>
            </div>
        </div>
    );
}

//---------------------- Live stream preview display -----------------------------

function ProfileLiveDisplay(props) {
    const streamId = props.streamId;
    const [streamData, setStreamData] = useState(null)

    useEffect(() => {
        streamActions.getStreamById(streamId)
        .then(data => {
            setStreamData(data);
        })
        .catch(error => {
            console.log("Error in ProfileLiveDisplay")
            console.log(error);
        })
    }, [props.streamId]) 


    return (
        <div className={style.relevantContent}>
            <br />
            { streamData && 
              <LiveStreamPreview key={streamData._id} 
                streamData={streamData} 
              /> }
        </div>
    )
}

//------------------------------------------------------------------------------

// ------------------------------- Friends display -----------------------------

function FriendDisplayPreview(props) {
    const friend = props.friend
    const routerHistory = props.routerHistory

    return (
        <div>
                <div className={style.friendDiv}>
                    <img className={style.streamerCircle}
                        src={friend.userImage}/>
                    <div className={style.friend}
                    onClick={()=>(routerHistory.push(`/users/${friend.memberId}`))}> 
                        {friend.displayName}
                    </div>
                </div>            
        </div>
    )
}

function ProfileFriendsDisplay(props) {

    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    function mapFriends(){
        if( !user )
            return

        if( user.friendsData.friendsList.length == 0 ) {
            return "Friends list is empty"
        }

        return((user.friendsData.friendsList).map((friend, index)=>{
            return(
                    <FriendDisplayPreview friend={friend} routerHistory={props.routerHistory}></FriendDisplayPreview>
            )
            
        })) ;
    }

    return (
        <div className={style.relevantContentText}>
            <br />
            <div className={style.aboutContent}>
                {mapFriends()}
            </div>
        </div>
    )
}

// ----------------------------------------------------------------------

// ----------------------  Follower display ---------------------------

function FollowerDisplayPreview(props) {
    const follower = props.follower
    const routerHistory = props.routerHistory

    return (
        <div>
                <div className={style.friendDiv}>
                    <img className={style.streamerCircle}
                        src={follower.userImage}/>
                    <div className={style.friend}
                    onClick={()=>(routerHistory.push(`/users/${follower.userId}`))}> 
                        {follower.userName}
                    </div>
                </div>            
        </div>
    )
}

function ProfileFollowersDisplay(props) {

    const [user, setUser] = useState(props.user);

    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    function mapFollowers(){
        if( !user )
            return

        if( user.followData.followersList.length == 0 ) {
            return "No followers"
        }

        return((user.followData.followersList).map((follower, index)=>{
            return(
                    <FollowerDisplayPreview follower={follower} routerHistory={props.routerHistory}></FollowerDisplayPreview>
            )
        })) ;
    }

    return (
        <div className={style.relevantContentText}>
            <br />
            <div className={style.aboutContent}>
                {mapFollowers()}
            </div>
        </div>
    )

}
//-------------------------------------------------------------------

// ---------------------   Short description  ---------------------

function AboutContainerEdit(props) {
    const setDescription = props.setDescription;

    return (
        <div>
            <textarea className={style.descriptionTextEditor}  
                onChange={e => setDescription(e.target.value)} 
                type="text" value={props.desc}/>
        </div>
    )
}

function AboutContainerView(props) {

    return (
        <p>
            {props.desc}
        </p>
    )
}

function AboutContainer(props) {
    const description = props.desc;
    const setDescription = props.setDescription;

    if(props.editShortDesc) {
        return (
            <AboutContainerEdit desc={description} setDescription={setDescription}></AboutContainerEdit>
        )
    }
    else {
        return (
            <AboutContainerView desc={description}></AboutContainerView>
        )
    }
}

// ---------------------------------------------------------

// ------------ Twitch and Youtube logos -------------------

function TwitchLogoLink(props) {
    const user = props.user;

    const isTwitchUser=()=>{
        if( !user ||
            !user.twitchId ||
            user.twitchId === "")
        {
            console.log("No twitch")
            return false;
        }
        console.log("Yes twitch")
        return true;
    }

    return(
        <div className={style.twitchLogoLink} >
        {
            isTwitchUser() && 
            <a href={String("https://www.twitch.tv/" + user.username)} target="_blank">
                <img Style="width:100%;height:100%;"
                   src={TwitchLogo}
                   onClick={props.onClick}
                >
                </img>
            </a>
        }
        </div>
    )

}

function YoutubeLogoLink(props) {
    const user = props.user;
    
    const isYoutubeUser=()=>{
        if( !user ||
            !user.googleId ||
            user.googleId === "")
        {
            console.log("Not youtube")
            return false;
        }
        console.log("Yes youtube")
        return true;
    }

    return(
        <div>
        {   
            isYoutubeUser() && 
            <a href={String("https://www.youtube.com/channel/" + user.googleData.youtubeId)} target="_blank">
                <img className={style.youtubeLogoLink} 
                   src={YoutubeLogo}
                   onClick={props.onClick}
                >
                </img>
            </a>
        }     
        </div>
    )
}
// ---------------------------------------------------------

export default withRouter(Profile)
