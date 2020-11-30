import React, {useState} from 'react';
import style from './profile.module.css'

import Friends from './friends'
import AboutOffline from './aboutOffline'
import AboutOnline from './aboutOnline'
import Schedule from './schedule'

import profilePhoto from '../../assets/userProfilePic.png'; //todo

import blackStar from '../../assets/blackstar.png'; //todo
import purpleStar from '../../assets/purpelstar.png'; //todo



function Profile(props) {
    
    const [display, setUserInfoDisplay] = useState('about');
    const userName = props.userName;
    const userOnline = 'true';  //todo
    const userStreaming = 'true'; //todo
    const userRating  = 3 ;  //todo
    const subscribers = '12k'; //todo
    const friends = '200'; //todo
    const lables = ['LabelOne','LabelTwo','LabelThree', 'LabelFour'] //todo
    const aboutInfo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum posuere. Consectetur adipiscing elit. Nulla elementum posuere.' //todo
  
    
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

    const handleLive=()=>{
        //todo - open a window to the live stream
    }

    const handleAddFriends=()=>{
        //todo
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
                                <a href=""><button className={style.addFriends} onClick={handleAddFriends}/> Add Friend</a>
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
            <div className={style.mt40}>
                <div className={style.container}>
                    <div className={style.div100}>
                        {showDisplay()==='about' && <About userOnline = {userOnline}/>}
                        {showDisplay()==='schedule' && <Schedule userName = {userName}/>}
                        {showDisplay()==='friends' && <Friends userName = {userName} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile