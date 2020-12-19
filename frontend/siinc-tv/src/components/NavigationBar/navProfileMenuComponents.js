import React, {useEffect, useState, useContext} from 'react';
import UserContext from "../../userContext";
import style from './navprofilemenu.module.css';
import userActions from "../../user/userActions" 
import { Link } from "react-router-dom";

/*-----------------------------   Icons   -------------------------------*/
import MyChannelIcon from "../../assets/NavBar/NavProfileMyChannel.svg"
import FriendsIcon from "../../assets/NavBar/NavProfileFriends.svg"
import FavoritesIcon from "../../assets/NavBar/NavProfileFavorites.svg"
import SettingsIcon from "../../assets/NavBar/NavProfileSettings.svg"
import LogOutIcon from "../../assets/NavBar/NavProfileLogOut.svg"
import NoProfilePic from "../../assets/NoProfilePic.svg"
/*-----------------------------------------------------------------------*/


export function NavProfileMenuHeader(props) {
    const userContext = useContext(UserContext);

    /**
     * @brief assigns image if an image is found in userData
     */
    function assignImage()
    {
        const user = userContext.user;
        if(user.image) return user.image;
        if(user.twitchData && user.twitchData.profile_image_url) return user.twitchData.profile_image_url;
        if(user.facebookData && user.facebookData.photos) return user.facebookData.photos[0].value;
        if(user.googleData && user.googleData.photos) return user.googleData.photos[0].value;
        return NoProfilePic;
    }

    function checkUserName(temp){
        if(temp.length < 12){
            return temp;
        }
        return temp.slice(0,12)+"...";
    }

    let relevant_username = checkUserName(userContext.user.username);

    return(
        <div>
            <div className={style.navProfileMenuPic} onClick={props.onProfileClick}>
                <img src={assignImage()}
                     style={{width:"100%", height:"100%", borderRadius: "50%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuNameText}>
                {relevant_username}
            </div>
            <div className={style.navProfileMenuStatusText}>
                {/* Change this to user.showOnline after implementing feature on server side */}
                {userContext.user && <div>
                    Online
                    <div className={style.navProfileMenuOnlineStatusIndicator}></div>
                </div>}
                {!userContext.user && <div>
                    Online
                </div>}
                    
            </div>
        </div>
    );

}

export function NavProfileMenuBreaker(props) {
    return(<div className={style.navProfileMenuBreak} style={props.style}></div>);
}

export function NavProfileMenuRanking() {
    let rank = 5 * 2; //change with user contex rank data when field is added.

    const stars = new Array(rank);
    for(let i = 0 ; i < rank ; i++) {        
        stars[i] = (i%2==0) ? <div className={style.navProfileMenuRankLeftHalf} key={i}></div>
                            : <div className={style.navProfileMenuRankRightHalf} key={i}></div>;
    }

    return(
        <div>
            <div className={style.navProfileMenuRankingText}>
                Ranking
            </div>
            <div className={style.navProfileMenuStarContainer}>
                {stars}
            </div>
        </div>
    );
}

export function NavProfileMenuMyChannelLink() {

    return(
        <Link to="/my_channel" className={style.link} underline="none">
        <div className={style.navProfileMenuMyChannelDiv}>
            <div className={style.navProfileMenuMyChannelIcon}>
                <img src={MyChannelIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuMyChannelText}>
                My Channel
            </div>
        </div>
        </Link>
    );
    
}

export function NavProfileMenuFriendsLink() {
    return(
        <div className={style.navProfileMenuFriendsDiv}>
            <div className={style.navProfileMenuFriendsIcon}>
                <img src={FriendsIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuFriendsText}>
            Friends
            </div>
        </div>
    );   
}

export function NavProfileMenuFavoritesLink() {
    return(
        <div className={style.navProfileMenuFavoritesDiv}>
            <div className={style.navProfileMenuFavoritesIcon}>
                <img src={FavoritesIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuFavoritesText}>
                Favorites
            </div>
        </div>
    );   
}

export function NavProfileMenuMySettingsLink() {
    return(
        <div className={style.navProfileMenuSettingsDiv}>
            <div className={style.navProfileMenuSettingsIcon}>
                <img src={SettingsIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuSettingsText}>
                Settings
            </div>
        </div>
    );   
}

export function NavProfileMenuLogout() {
    const userContext = useContext(UserContext)

    function signOut(){
        userActions.signOut();
        userContext.setUser(null);
    }

    return(
        <div className={style.navProfileMenuLogoutDiv} onClick={()=>signOut()}>
            <div className={style.navProfileMenuLogoutIcon}>
                <img src={LogOutIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuLogoutText}>
                Log Out
            </div>
        </div>
    );   
}