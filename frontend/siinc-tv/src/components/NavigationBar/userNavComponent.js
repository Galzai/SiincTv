import React, {useEffect, useState, useContext} from 'react';
import SigningModal from "../userSigning/signingModal";
import UserContext from "../../userContext";
import style from './navbar.module.css';
import {
        NavProfileMenuHeader,
        NavProfileMenuToggleOnline,
        NavProfileMenuRanking,
        NavProfileMenuBreaker,
        NavProfileMenuMyChannelLink,
        NavProfileMenuFriendsLink,
        NavProfileMenuFavoritesLink,
        NavProfileMenuSubscribedLink,
        NavProfileMenuMySettingsLink,
        NavProfileMenuLogout
       } 
       from "./navProfileMenuComponents.js"

/*-----------------------------   Icons   -------------------------------*/
import NoProfilePic from "../../assets/NoProfilePic.png"
import NavNotificationIcon from "../../assets/NavBar/NavBarNotifications.png"
import NavMessageIcon from "../../assets/NavBar/NavBarMessages.png"
/*-----------------------------------------------------------------------*/

function NavProfileMenu(props) {
    const userContext = useContext(UserContext);

    const styles = (props.open) ? {visibility: "visible"} : {visibility: "hidden"};

    return(
        <div style={styles}>  
            <div className={style.navProfileMenu}>
                <NavProfileMenuHeader></NavProfileMenuHeader>
                <NavProfileMenuToggleOnline></NavProfileMenuToggleOnline>
                <NavProfileMenuRanking></NavProfileMenuRanking>
                <NavProfileMenuBreaker style={{top: "31.4%"}}></NavProfileMenuBreaker>
                <NavProfileMenuMyChannelLink></NavProfileMenuMyChannelLink>
                <NavProfileMenuBreaker style={{top: "42.4%"}}></NavProfileMenuBreaker>
                <NavProfileMenuFriendsLink></NavProfileMenuFriendsLink>
                <NavProfileMenuFavoritesLink></NavProfileMenuFavoritesLink>
                <NavProfileMenuSubscribedLink></NavProfileMenuSubscribedLink>
                <NavProfileMenuBreaker style={{top: "70%"}}></NavProfileMenuBreaker>
                <NavProfileMenuMySettingsLink></NavProfileMenuMySettingsLink>
                <NavProfileMenuBreaker style={{top: "81.5%"}}></NavProfileMenuBreaker>
                <NavProfileMenuLogout></NavProfileMenuLogout>
            </div>
        </div>
    );
}

function NavProfileButton(props) {
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
                                      
    return(
        <div className={style.navProfileButton}>  
            <img 
                src={assignImage()} 
                style={{width:"100%", height:"100%", borderRadius: "50%"}}
                onClick={() => props.onClick()}
            > 
            </img>
        </div>
    );
}

function NavNotificationButton(props) {
    return(
        <div className={style.navNotificationButton}>
                <img src={NavNotificationIcon}
                     style={{width:"100%", height:"100%"}}
                     onClick={() => props.onClick()}>
                </img>
        </div>
    );
}

function NavMessageButton(props) {
    return(
        <div className={style.navMessageButton}>
                <img src={NavMessageIcon}
                     style={{width:"100%", height:"100%"}}
                     onClick={() => props.onClick()}>
                </img>
        </div>
    );
}

// represent user section of navigation bar ( sign in/sign up when logged out or notifications etc.. when logged in)
function UserNavComponent(props) {
    const userContext = useContext(UserContext);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    function doNothing(){
        console.log("nothing");
    }

    function handleProfileClick() {
        setProfileMenuOpen(!profileMenuOpen);
    }

    function handleMessageClick() {
        setMessageOpen(!messageOpen);
        console.log("mess = " + messageOpen);
    }

    function handleNotificationClick() {
        setNotificationOpen(!notificationOpen);
        console.log("notif = " + notificationOpen);
    }

    return(
        <div className={style.navUserComponent}>
            <NavProfileButton onClick={handleProfileClick}></NavProfileButton>             
            <SigningModal
                user={userContext.user}
                setUser={userContext.setUser}
                refreshUserData={userContext.refreshUserData}           
            >
            </SigningModal>
            {userContext.user && <NavNotificationButton onClick={handleNotificationClick}></NavNotificationButton>}
            {userContext.user && <NavMessageButton onClick={handleMessageClick}></NavMessageButton>}    
            {userContext.user && <NavProfileMenu open={profileMenuOpen}></NavProfileMenu> }       
        </div>
    );
}

export default UserNavComponent;