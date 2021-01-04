import React, {useEffect, useState, useContext} from 'react';
import SigningModal from "../userSigning/signingModal";
import NotificationMenu from '../notifications/notificationMenu.js'
import UserContext from "../../userContext";
import userUtils from "../../user/userUtils" 
import style from './navbar.module.css';
import {
        NavProfileMenuHeader,
        NavProfileMenuRanking,
        NavProfileMenuBreaker,
        NavProfileMenuMyChannelLink,
        NavProfileMenuFriendsLink,
        NavProfileMenuFavoritesLink,
        NavProfileMenuMySettingsLink,
        NavProfileMenuLogout
       } 
       from "./navProfileMenuComponents.js"

function NavProfileMenu(props) {
    const userContext = useContext(UserContext);

    const styles = (props.open) ? {visibility: "visible"} : {visibility: "hidden"};

    return(
        <div style={styles}>  
            <div className={style.navProfileMenu}>
                <NavProfileMenuHeader onProfileClick={props.onProfileClick}></NavProfileMenuHeader>
                <NavProfileMenuRanking></NavProfileMenuRanking>
                <NavProfileMenuBreaker style={{top: "32.5%"}}></NavProfileMenuBreaker>
                <NavProfileMenuMyChannelLink></NavProfileMenuMyChannelLink>
                <NavProfileMenuFriendsLink></NavProfileMenuFriendsLink>
                <NavProfileMenuFavoritesLink></NavProfileMenuFavoritesLink>
                <NavProfileMenuMySettingsLink></NavProfileMenuMySettingsLink>
                <NavProfileMenuBreaker style={{top: "82%"}}></NavProfileMenuBreaker>
                <NavProfileMenuLogout></NavProfileMenuLogout>
            </div>
        </div>
    );
}

function NavProfileButton(props) {
    const userContext = useContext(UserContext);
                                  
    return(
        <div className={style.navProfileButton}>  
            <img 
                src={userUtils.assignImage(userContext.user)} 
                style={{width:"100%", height:"100%", borderRadius: "50%"}}
                onClick={() => props.onClick()}
            > 
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
            {userContext.user && <NotificationMenu/>}
            {userContext.user && <NavProfileMenu open={profileMenuOpen} onProfileClick={handleProfileClick}></NavProfileMenu> }       
        </div>
    );
}

export default UserNavComponent;