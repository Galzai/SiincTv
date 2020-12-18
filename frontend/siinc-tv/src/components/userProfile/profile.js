import React, {useState, useContext, useEffect} from 'react';
import style from './profile.module.css'

import Friends from './friends'
import AboutOffline from './aboutOffline'
import AboutOnline from './aboutOnline'
import Schedule from './schedule'
import UserContext from "../../userContext";
import userActions from "../../user/userActions";

import profilePhoto from '../../assets/userProfilePic.png'; //todo

import blackStar from '../../assets/blackstar.png'; //todo
import purpleStar from '../../assets/purpelstar.png'; //todo



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


    useEffect(()=>{
        console.log("profile useEffect : call")
        let isMounted = true;
        (async()=>{
            let data = await userActions.getUserData( userName );
            if( isMounted ) {
                setFriendsData(data.friendsData);
            }
        })();
        console.log("profile useEffect : finished updating and getting data")
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
        console.log( "debugFriendRepr : thisfriends, contextuser, contextfreinds" );
        console.log( friendsData )
        console.log( userContext.user );
        console.log( userContext.userData );
        if( !userContext.user ) {
            return "Not logged";
        }
        if( userContext.user.username == userName ) {
            return "Its you!";
        }
        if( userContext.userData.friendsData.friendsList.find(x=>x.username=userName) != undefined ) {
                                         
            return "Unfriend";
        }
        if( userContext.userData.friendsData.sentRequests.find(x=>x.username=userName) != undefined ) {
            return "Pending";
        }
        if( userContext.userData.friendsData.receivedRequests.find(x=>x.username=userName) != undefined ) {
            return "Accept";
        }
        return "Add Friend";
    }

    const handleLive=()=>{
        //todo - open a window to the live stream
    }

    const handleAddFriends=()=>{
        if( userName = userContext.user.username ) {
            console.log("Cant add yourself")
            return;
        }
        let status = userActions.sendFriendRequest( userContext.user.username, userName );
        if( !status ) {
            console.log("An error occured while adding friend")
            return;
        }

        // update user context
        userContext.refreshData();

        // update friends data of this profile
        let data = userActions.getUserData( userName );
        setFriendsData(data.friendsData);
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
                            <img className={style.profilePhoto} src={profilePhoto}/>
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
                                <a href=""><button className={style.addFriends} onClick={handleAddFriends}/>{debugFriendRepr()}</a>
                                <a href=""><button className={style.subscribe} onClick={handleSubscribe} /> Subscribe</a>
                                <a href=""><button className={style.addFavorites} onClick={handleAddFavourites} /> Add to Favourites</a>
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