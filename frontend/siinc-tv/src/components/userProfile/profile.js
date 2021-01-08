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

//import profilePhoto from '../../assets/userProfilePic.png'; //todo

import blackStar from '../../assets/blackstar.png'; //todo
import purpleStar from '../../assets/purpelstar.png'; //todo

import SocketContext from "../../socketContext"



function FriendButtonComponent(props) {

    

}

function Profile(props) {
    
    const [display, setUserInfoDisplay] = useState('about');
    const userContext = useContext(UserContext);
    const userNameOld = (userContext.user) ? userContext.user.username : "Null";//props.userName;
    const userName = props.match.params.username;
    const [user, setUser] = useState(userName);
    const userOnline = 'true';  //todo
    const userStreaming = 'true'; //todo
    const userRating  = 3 ;  //todo
    const subscribers = '12k'; //todo
    const friends = '200'; //todo
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
            }
        });
        return (() => {isMounted = false})
    }, [props.match])

    const showDisplay = () => {
        return display;
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
    const setAboutDisplay=()=>{
        setUserInfoDisplay('about')
    }
    const setScheduleDisplay=()=>{
        setUserInfoDisplay('schedule')
    }
    const setFriendsDisplay=()=>{
        setUserInfoDisplay('friends')
    }

    /*
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
        if( userContext.user.friendsData.friendsList.find(x=>x.displayName===userName) != undefined ) {     
            return "Unfriend";
        }
        if( userContext.user.friendsData.sentRequests.find(x=>x.username===userName) != undefined ) {
            return "Pending";
        }
        if( userContext.user.friendsData.receivedRequests.find(x=>x.username===userName) != undefined ) {
            return "Accept";
        }
        return "Add Friend";
    }
    */

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
        //todo - open a window to the live stream
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
                            {userStreaming==='true' && <span className={style.live} onClick={handleLive}>Live</span>}
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
                                {friends} Friends
                                <br />
                                {subscribers} Subscribers
                            </span>
                            <span className={style.btns}>
                                <a><button className={style.addFriends} onClick={onClickFriendAction}/>{debugFriendRepr()}</a>
                                <a><button className={style.subscribe} onClick={handleSubscribe} /> Subscribe</a>
                                <a><button className={style.addFavorites} onClick={onClickFollowAction} /> {debugFollowRepr()}</a>
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
                            <button className={style.tabListBtn} onClick={setAboutDisplay}>About</button>
                            <button className={style.tabListBtn} onClick={setScheduleDisplay}>Schedule</button>
                            <button className={style.tabListBtn} onClick={setFriendsDisplay}>Friends</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.container}>
                {showDisplay()==='about' && <About userOnline = {userOnline}/>}
                {showDisplay()==='schedule' && <Schedule userName = {userName}/>}
                {showDisplay()==='friends' && <Friends userName = {userName} />}
            </div>
        </div>
    );
}

export default Profile
