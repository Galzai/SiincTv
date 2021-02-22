import React, {useContext} from 'react';
import UserContext from "../../userContext";
import SocketContext from "../../socketContext"
import style from './navprofilemenu.module.css';
import userActions from "../../user/userActions" 
import userUtils from "../../user/userUtils" 
import { Link } from "react-router-dom";

/*-----------------------------   Icons   -------------------------------*/
import MyChannelIcon from "../../assets/NavBar/NavProfileMyChannel.svg"
import FriendsIcon from "../../assets/NavBar/NavProfileFriends.svg"
import FavoritesIcon from "../../assets/NavBar/NavProfileFavorites.svg"
import SettingsIcon from "../../assets/NavBar/NavProfileSettings.svg"
import LogOutIcon from "../../assets/NavBar/NavProfileLogOut.svg"
/*-----------------------------------------------------------------------*/

/**
 * @brief Header for navigation bar profile menu
 * @category Frontend
 * @subcategory NavProfileMenu
 */
export function NavProfileMenuHeader(props) {
    const userContext = useContext(UserContext);

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
                <img src={userUtils.assignImage(userContext.user)}
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

/**
 * @brief My channel link for navigation bar profile menu
 * @category Frontend
 * @subcategory NavProfileMenu
 */
export function NavProfileMenuMyChannelLink() {
    const userContext = useContext(UserContext);
    const mychannel = "/users/" + userContext.user._id;

    return(
        <Link to={mychannel} className={style.link} underline="none">
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

/**
 * @brief My friends link for navigation bar profile menu
 * @category Frontend
 * @subcategory NavProfileMenu
 */
export function NavProfileMenuFriendsLink() {
    const userContext = useContext(UserContext);
    const friends = "/users/" + userContext.user._id + "/friends";

    return(
        <Link to={friends} className={style.link} underline="none">
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
        </Link>
    );   
}

/**
 * @brief My followings link for navigation bar profile menu
 * @category Frontend
 * @subcategory NavProfileMenu
 */
export function NavProfileMenuFavoritesLink() {
    const userContext = useContext(UserContext);
    const followers = "/users/" + userContext.user._id + "/following";

    return(
        <Link to={followers} className={style.link} underline="none">
        <div className={style.navProfileMenuFavoritesDiv}>
            <div className={style.navProfileMenuFavoritesIcon}>
                <img src={FavoritesIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuFavoritesText}>
                Followers
            </div>
        </div>
        </Link>
    );   
}

/**
 * @brief Edit Channel link for navigation bar profile menu
 * @category Frontend
 * @subcategory NavProfileMenu
 */
export function NavProfileMenuMySettingsLink() {
    const userContext = useContext(UserContext);
    const edit = "/users/" + userContext.user._id + "/edit";

    return(
        <Link to={edit} className={style.link} underline="none">
        <div className={style.navProfileMenuSettingsDiv}>
            <div className={style.navProfileMenuSettingsIcon}>
                <img src={SettingsIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuSettingsText}>
                Edit Channel
            </div>
        </div>
        </Link>
    );   
}

/**
 * @brief Logout button for navigation bar profile menu
 * @category Frontend
 * @subcategory NavProfileMenu
 */
export function NavProfileMenuLogout() {
    const userContext = useContext(UserContext)
    const socketContext = useContext(SocketContext)

    function signOut(){
        userActions.signOut();
        socketContext.socket.emit('userDisconnect', userContext.user._id);
        userContext.setUser(null);
        window.location.reload(false);
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