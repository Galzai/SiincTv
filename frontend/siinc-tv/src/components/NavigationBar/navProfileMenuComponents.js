import React, {useEffect, useState, useContext} from 'react';
import UserContext from "../../userContext";
import style from './navprofilemenu.module.css';
import userActions from "../../user/userActions" 
import { Link } from "react-router-dom";

/*-----------------------------   Icons   -------------------------------*/
import MyChannelIcon from "../../assets/NavBar/NavProfileMyChannel.png"
import FriendsIcon from "../../assets/NavBar/NavProfileFriends.png"
import FavoritesIcon from "../../assets/NavBar/NavProfileFavorites.png"
import SubscribedIcon from "../../assets/NavBar/NavProfileSubscribed.png"
import SettingsIcon from "../../assets/NavBar/NavProfileSettings.png"
import LogOutIcon from "../../assets/NavBar/NavProfileLogOut.png"
import NoProfilePic from "../../assets/NoProfilePic.svg"
/*-----------------------------------------------------------------------*/


export function NavProfileMenuHeader() {
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
        <div>
            <div className={style.navProfileMenuPic}>
                <img src={assignImage()}
                     style={{width:"100%", height:"100%", borderRadius: "50%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuNameText}>
                {userContext.user.username}
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

//helper toggle button component
function ToggleButton(props) {
    const { selected, toggleSelected } = props;
  
    function getContainerStyle() {
        if( selected ) {
            return {backgroundColor: "green"};
        }
        return {backgroundColor: "rgb(50,50,50)"};
    }

    function getCircleStyle() {
        if( selected ) {
            return {right: "5%"};
        }
        return {left: "5%"};
    }

    return (
        <div className={style.navProfileMenuToggleButtonContainer} style={getContainerStyle()} onClick={toggleSelected}>
            <div className={style.navProfileMenuToggleButtonCircle} style={getCircleStyle()}>
            </div>
        </div>
    );
}

export function NavProfileMenuToggleOnline() {
    //TODO - Need to decide later on if and how to synchronize with servers online visibility state
    const [selected, setSelected] = useState(false);
    
    return(
        <div>
            <div className={style.navProfileMenuOnlineText}>
                Online
            </div>
            <ToggleButton
                selected={selected}
                toggleSelected={ ()=>setSelected(!selected) }
            >
            </ToggleButton>
        </div>
    );
}

export function NavProfileMenuBreaker(props) {
    return(<div className={style.navProfileMenuBreak} style={props.style}></div>);
}

export function NavProfileMenuRanking() {
    let rank = 3.5 * 2; //change with user contex rank data when field is added.

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
                MyChannel
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

export function NavProfileMenuSubscribedLink() {
    return(
        <div className={style.navProfileMenuSubscribedDiv}>
            <div className={style.navProfileMenuSubscribedIcon}>
                <img src={SubscribedIcon}
                     style={{width:"100%", height:"100%"}}>
                </img>
            </div>
            <div className={style.navProfileMenuSubscribedText}>
                Subscribed
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