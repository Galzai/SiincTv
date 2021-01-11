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
import { withRouter } from 'react-router-dom'
import LiveStreamPreview from "../previews/liveStreamPreview"

//import profilePhoto from '../../assets/userProfilePic.png'; //todo

import blackStar from '../../assets/blackstar.png'; //todo
import purpleStar from '../../assets/purpelstar.png'; //todo

import SocketContext from "../../socketContext"
import streamActions from '../../stream/streamActions';

function Profile(props) {
    
    const [display, setUserInfoDisplay] = useState('about');
    const userContext = useContext(UserContext);
    const userNameOld = (userContext.user) ? userContext.user.username : "Null";//props.userName;
    const userName = props.match.params.username;
    const [user, setUser] = useState(null);
    const userOnline = 'true';  //todo
    const userRating  = 3 ;  //todo
    const subscribers = '12k'; //todo
    const lables = ['LabelOne','LabelTwo','LabelThree', 'LabelFour'] //todo
    const aboutInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum posuere. Consectetur adipiscing elit. Nulla elementum posuere.' //todo
    const [friendsData, setFriendsData] = useState(null)
    const [profilePhoto, setProfilePhoto] = useState("")
    const socketContext = useContext(SocketContext);

    useEffect(()=>{
        let isMounted = true;
        userActions.getUserData( userName )
        .then(data=>{
            if( isMounted ) { 
                setFriendsData(data.friendsData);
                setProfilePhoto(userUtils.assignImage(data))
                setUser(data);
            }
        });
        return (() => {isMounted = false})
    }, [props.match])

    const showDisplay = () => {
        if( !user )
            return 
        if( display === 'live' ) {
            if( !user.currentStream )
                return
            return <ProfileLiveDisplay streamId={user.currentStream.eventId}></ProfileLiveDisplay>
        }
        if( display === 'friends') {
            return <ProfileFreindsDisplay></ProfileFreindsDisplay>
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
    const setScheduleDisplay=()=>{
        setUserInfoDisplay('schedule')
    }
    const setFriendsDisplay=()=>{
        setUserInfoDisplay('friends')
    }

   const debugFriendRepr=()=> {
    if( userContext.user == null || friendsData == null ) {
        return "Loading";
    }
    if( !userContext.user ) {
        return "Not logged";
    }
    if( userContext.user.username == userName ) {
        return "Its you!";
    }
    if(userContext.user.friendsData)
    {
        if( userContext.user.friendsData.friendsList.find(x=>x.displayName===userName) != undefined ) {     
            return "Unfriend";
        }
        if( userContext.user.friendsData.sentRequests.find(x=>x.username===userName) != undefined ) {
            return "Pending";
        }
        if( userContext.user.friendsData.receivedRequests.find(x=>x.username===userName) != undefined ) {
            return "Accept";
        }
    }

    return "Add Friend";
}

    const handleLive=()=>{
        props.history.push(`/stream_pages/${user.currentStream.eventId}`);
    }

    const onClickFriendAction=()=>{
        handleFriendAction(userContext.user, userName);
        userContext.refreshUserData();
    }

    const handleSubscribe=()=>{
        //todo
    }

    const onClickFollowAction=()=>{
        handleFollowAction(userContext.user, userName);
        userContext.refreshUserData();
    }

    const debugFollowRepr=()=> {
        if( userContext.user == null )
            return "";
        if( userContext.user.username == userName )
            return "you!";
        if(userContext.user.followData && userContext.user.followData.followingList.find(x=>x.userName===userName) != undefined )
            return "Unfollow"
        return "Follow"
    }
    
    const isMe=()=>{
        if( !userContext.user || userContext.user.username !== userName )
            return false
        return true;
        
    }

    const isUserStreaming=()=>{
        if( !user || 
            !user.currentStream || 
            user.currentStream == "" )
        {
            return false;
        }
        return true;
    }

    const numOfFriends=()=>{
        if( !user )
            return 0;
        return user.friendsData.friendsList.length;
    }

    const numOfFollowers=()=>{
        if( !user )
            return 0;
        return user.followData.followersList.length;
    }

    const isUserOnline=()=>{
        
    }

    const onClickEditDesc=()=>{
        console.log("TODO onClickEditDesc")
    }

    return (
        <div>        
            <div className={style.mt40}>
                <div className={style.container}>
                    <div className={style.div20}>
                        <div>
                            <img className={style.profilePhoto} src={/*assignImage(userName)*/profilePhoto}/>
                        </div>
                    </div>
                    <div className={style.div80}>
                        <div className={style.firstDiv}>
                            <span className={style.name}>{userName}</span>
                            {userOnline==='true' && <span className={style.online}/>}
                            { isUserStreaming() && <span className={style.live} onClick={handleLive}>Live</span>}
                            <span className={style.star}>
                                {userRating>=1 && <img className={style.starImg} src={purpleStar}/>}
                                {userRating>=2 && <img className={style.starImg} src={purpleStar}/>}
                                {userRating>=3 && <img className={style.starImg} src={purpleStar}/>}
                                {userRating>=4 && <img className={style.starImg} src={purpleStar}/>}
                                {userRating>=5 && <img className={style.starImg} src={purpleStar}/>}
                                {userRating<1 && <img className={style.starImg} src={blackStar}/>}
                                {userRating<2 && <img className={style.starImg} src={blackStar}/>}
                                {userRating<3 && <img className={style.starImg} src={blackStar}/>}
                                {userRating<4 && <img className={style.starImg} src={blackStar}/>}
                                {userRating<5 && <img className={style.starImg} src={blackStar}/>}
                            </span>
                        </div>
                        <hr />
                        <div className={style.secondDiv}>
                            <span className={style.number}>
                                {numOfFriends()} Friends
                                <br />
                                {numOfFollowers()} Followers
                            </span>
                            <span className={style.btns}>
                                { !isMe() && <a><button className={style.addFriends} onClick={onClickFriendAction}/>{debugFriendRepr()}</a> }
                                { !isMe() && <a><button className={style.addFavorites} onClick={onClickFollowAction} /> {debugFollowRepr()}</a>}
                                { isMe() && <button className={style.editDescriptionButton} onClick={onClickEditDesc} > Edit </button> }
                            </span>
                        </div>
                        <div className={style.aboutContent}>
                            <p>
                                {aboutInfo}
                            </p>
                        </div>                        
                        <div className={style.pointsSpan}>Points of Interest: </div>
                        {lables.map((value, index) => {
                            return <label className={style.pointsLabel} key={index}>{value}</label>
                        })}
                    </div>
                </div>
            </div>
            <div className={style.mt40}>
                <div className={style.container}>
                    <div className={style.div100}>
                        <div className={style.tabList}>
                            { isUserStreaming() && <button className={style.tabListBtn} onClick={setLiveDisplay}>Live</button> }
                            {/*<button className={style.tabListBtn} onClick={setScheduleDisplay}>Schedule</button>*/}
                            <button className={style.tabListBtn} onClick={setFriendsDisplay}>Friends</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.container}>
                {showDisplay()}
            </div>
        </div>
    );
}

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
        <div>
            <p>live stream</p>
            { streamData && 
              <LiveStreamPreview key={streamData._id} 
                streamData={streamData} 
              /> }
        </div>
    )
}

function ProfileFreindsDisplay(props) {

    return (
        <div>
            <p>testingtesting12341234</p>
        </div>
    )
}

export default withRouter(Profile)
