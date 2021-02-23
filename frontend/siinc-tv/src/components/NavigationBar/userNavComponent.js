import React, {useState, useContext, useEffect, useRef} from 'react';
import SigningModal from "../userSigning/signingModal";
import NotificationMenu from '../notifications/notificationMenu.js'
import UserContext from "../../userContext";
import userUtils from "../../user/userUtils" 
import style from './navbar.module.css';
import { Fade } from '@material-ui/core';

import {
        NavProfileMenuHeader,
        NavProfileMenuBreaker,
        NavProfileMenuMyChannelLink,
        NavProfileMenuFriendsLink,
        NavProfileMenuFavoritesLink,
        NavProfileMenuFollowersLink,
        NavProfileMenuMySettingsLink,
        NavProfileMenuLogout
       } 
       from "./navProfileMenuComponents.js"

/**
 * This component represents the user menu in the navigation bar
 * 
 * @prop {Boolean} open Menu is open or not
 * @prop {Function} onProfileClick action upon clicking on profile menu button
 * @component
 * @category Frontend
 * @subcategory Menu
 */
function NavProfileMenu(props) {

    return(
        <Fade in={props.open}>
            <div className={style.navProfileMenu}>
                <NavProfileMenuHeader onProfileClick={props.onProfileClick}></NavProfileMenuHeader>
                <NavProfileMenuBreaker style={{top: "23%"}}></NavProfileMenuBreaker>
                <NavProfileMenuMyChannelLink onClickMenuClose={props.onProfileClick}></NavProfileMenuMyChannelLink>
                <NavProfileMenuFriendsLink onClickMenuClose={props.onProfileClick}></NavProfileMenuFriendsLink>
                <NavProfileMenuFavoritesLink onClickMenuClose={props.onProfileClick}></NavProfileMenuFavoritesLink>
                <NavProfileMenuFollowersLink onClickMenuClose={props.onProfileClick}></NavProfileMenuFollowersLink>
                <NavProfileMenuMySettingsLink onClickMenuClose={props.onProfileClick}></NavProfileMenuMySettingsLink>
                <NavProfileMenuBreaker style={{top: "84%"}}></NavProfileMenuBreaker>
                <NavProfileMenuLogout onClickMenuClose={props.onProfileClick}></NavProfileMenuLogout>
            </div>
        </Fade>
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
    const wrapperRef = useRef(null);

    function handleProfileClick() {
        setProfileMenuOpen(!profileMenuOpen);
    }

      // below is the same as componentDidMount and componentDidUnmount
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
    };
    
    return(
        <div className={style.navUserComponent} ref={wrapperRef}>
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