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
    const imgSrc = ( userContext.user ) ? "https://img.icons8.com/material/4ac144/256/user-male.png"
                                        : "https://cdn4.iconfinder.com/data/icons/linear-generic/200/linear-generic-user-myself-512.png";
    return(
        <div className={style.navProfileButton}>  
            <img 
                src={imgSrc} 
                style={{width:"100%", height:"100%"}}
                onClick={() => props.onClick()}
            > 
            </img>
        </div>
    );
}

// represent user section of navigation bar ( sign in/sign up when logged out or notifications etc.. when logged in)
function UserNavComponent(props) {
    const userContext = useContext(UserContext);
    const[profileMenuOpen, setProfileMenuOpen] = useState(false);

    //---------------- temporary ----------
    const modalButtonStyle = {
        marginTop:"20px", 
        marginLeft:"15px", 
        marginRight:"15px"
    }
    //-------------------------------------

    function doNothing(){
        console.log("nothing");
    }

    function handleProfileClick() {
        if( profileMenuOpen ) {
            setProfileMenuOpen(false);
        }
        else {
            setProfileMenuOpen(true);
        }
    }

    return(
        <div className={style.navUserComponent}>
            {userContext.user && <NavProfileButton onClick={handleProfileClick}></NavProfileButton> }            
            {/*!userContext.user && <NavProfileButton onClick={doNothing}></NavProfileButton> */}       
            <SigningModal
                user={userContext.user}
                setUser={userContext.setUser}
                refreshUserData={userContext.refreshUserData}
                styles={modalButtonStyle}               
            >
            </SigningModal>
            {userContext.user && <NavProfileMenu open={profileMenuOpen}></NavProfileMenu> }       
        </div>
    );
}

export default UserNavComponent;