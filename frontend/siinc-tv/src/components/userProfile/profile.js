import React, {useState, useContext, useEffect} from 'react';
import style from './profile.module.css'

import Friends from './friends'
import AboutOffline from './aboutOffline'
import AboutOnline from './aboutOnline'
import Schedule from './schedule'
import UserContext from "../../userContext";
import userActions from "../../user/userActions";
import userUtils from "../../user/userUtils";

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


    // TODO: Move all friends stuff into a different .js
    const socketContext = useContext(SocketContext);

    // TODO : Move this as well together with friends stuff
    /*
    useEffect(() => {
        console.log("Running profile useeffect. socket : ")
        console.log(socketContext.socket)
        if( socketContext.socket != null) {
        // setup socket event listeners
        socketContext.socket.on('receivedFriendRequest', (data) => {
            console.log("socket : received friend request from : " + data.name)
            //userContext.refreshUserData();
        })

        socketContext.socket.on('friendRequestAccepted', (data) => {
            console.log("socket : friend request accepted from : " + data.name);
            //userContext.refreshUserData();
        })

        socketContext.socket.on('friendRequestDeclined', (data) => {
            console.log("socket : friend request declined from : " + data.name + " (no need to notify about it visually)")
            //userContext.refreshUserData();
        })

        socketContext.socket.on('receivedUnfriend', (data) => {
            console.log("socket : got unfriended by : " + data.name + " (no need to notify about it visually)")
            //userContext.refreshUserData();            
        })
        }
        return () => {
            if(socketContext.socker != null) {
                socketContext.socket.off('receivedFriendRequest');
                socketContext.socket.off('friendRequestAccepted');
                socketContext.socket.off('friendRequestDeclined');
            }
        }
     }, []);
     */

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

    const handleLive=()=>{
        //todo - open a window to the live stream
    }

    const handleAddFriends=()=>{
        const fun = async() => {
            console.log("Adding friend")
            if( userName == userContext.user.username ) {
                console.log("Cant add yourself")
                return;
            }
            let status = await userActions.sendFriendRequest( userContext.user.username, userName );
            if( !status ) {
                console.log("An error occured while adding friend")
                return false;
            }
            
            // update user context
            await userContext.refreshUserData();
    
            // update friends data of this profile
            let data = await userActions.getUserData( userName )
            setFriendsData(data.friendsData);
            return true;
        }
        fun().then(ret => {
            console.log("Finished running add friend funciton")
        })
    }

    const handleUnfriend = () => {
        const fun = async() => {
            console.log("Unfriending friend")
            if( userName == userContext.user.username ) {
                console.log("Cant unfriend yourself")
                return;
            }
            let status = await userActions.unfriendFriendRequest( userContext.user.username, userName );
            if( !status ) {
                console.log("An error occured while unfriending")
                return false;
            }
    
            // update user context
            await userContext.refreshUserData();
    
            // update friends data of this profile
            let data = await userActions.getUserData( userName )
            setFriendsData(data.friendsData);
            return true;
        }
        fun().then(ret => {
            console.log("Finished running unfriend funciton")
        })       
    }

    const handleAcceptFriend = () => {
        const fun = async() => {
            console.log("Accepting friend")
            if( userName == userContext.user.username ) {
                console.log("Cant accpet yourself")
                return;
            }
            let status = await userActions.answerFriendRequest( userName, userContext.user.username, true );
            if( !status ) {
                console.log("An error occured while accepting friend")
                return false;
            }
    
            // update user context
            await userContext.refreshUserData();
    
            // update friends data of this profile
            let data = await userActions.getUserData( userName )
            setFriendsData(data.friendsData);
            return true;
        }
        fun().then(ret => {
            console.log("Finished running accept friend funciton")
        })       
    }

    const handleFriendAction=()=>{
        if( userContext.user == null || friendsData == null ) {
            console.log("usercontext or profile friends data = null");
            return;
        }

        if( !userContext.user ) {
            console.log("Dont know why it is here if its included in above case - check later");
            return;
        }
        if( userContext.user.username == userName ) {
            console.log("Its you man");
            return;
        }
        if( userContext.user.friendsData.friendsList.find(x=>x.displayName==userName) != undefined ) {
            handleUnfriend();                                         
            return;
        }
        if( userContext.user.friendsData.sentRequests.find(x=>x.username==userName) != undefined ) {
            console.log("unimplemented - maybe cancell request");
            return;
        }
        if( userContext.user.friendsData.receivedRequests.find(x=>x.username==userName) != undefined ) {
            handleAcceptFriend();
            return;
        }
        handleAddFriends()
    }

    const handleSubscribe=()=>{
        //todo
    }

    const handleAddFavourites=()=>{
        //todo
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
                                <a><button className={style.addFriends} onClick={handleFriendAction}/>{debugFriendRepr()}</a>
                                <a><button className={style.subscribe} onClick={handleSubscribe} /> Subscribe</a>
                                <a><button className={style.addFavorites} onClick={handleAddFavourites} /> Add to Favourites</a>
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