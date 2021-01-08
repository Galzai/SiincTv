import React, {useState, useContext} from "react";
import { withRouter } from 'react-router-dom';
import style from './previews.module.css'
import userUtils from "../../user/userUtils" 
import UserContext from "../../userContext"
import {getFriendState, handleFriendAction} from "../../user/friends";
import {isFollowing, handleFollowAction} from "../../user/follows";

/**
 * @brief displays a preview of a user
 * 
 * @param {*user} props 
 */
function UserPreview(props){
    const user = props.user;
    const username = user.username;
    const image = userUtils.assignImage(user);
    const numFollowers = user.numFollowers ? user.numFollowers +  " Followers" : "No Followers";
    const description = user.shortDescription ? user.shortDescription :" No Description";
    const currentstream = user.currentstream;
    const userContext = useContext(UserContext);
    console.log(user);

    function handleRedirect() {
        props.history.push(`/users/${username}`);
      }

      const debugFriendRepr=()=> {
        if(  userContext.user == null ) 
            return "";
        if( userContext.user.username == username ) 
            return "Its you!";
        if( userContext.user.friendsData.friendsList.find(x=>x.displayName===username) != undefined ) 
            return "Unfriend";
        if( userContext.user.friendsData.sentRequests.find(x=>x.username===username) != undefined ) 
            return "Pending";
        if( userContext.user.friendsData.receivedRequests.find(x=>x.username===username) != undefined ) 
            return "Accept";
        return "Add Friend";
    }

    const onClickFriendAction=()=>{
        handleFriendAction(userContext.user, username);
        userContext.refreshUserData();
    }

    const debugFollowRepr=()=> {
        if( userContext.user == null )
            return "";
        if( userContext.user.username == username )
            return "you!";
        if( userContext.user.followData.followingList.find(x=>x.userName===username) != undefined )
            return "Unfollow"
        return "Follow"
    }

    const onClickFollowAction=()=>{
        handleFollowAction(userContext.user, username);
        userContext.refreshUserData();
    }

    return(
        <div className={style.UserPreviewBox} onClick={handleRedirect}>
            {image &&<img className={style.streamerCircle}
                src={image} 
            > 
            </img>}
            <div className={style.UserTitle}>
                <h2 className={style.userName}>{username}</h2>
                <h3 className={style.NumFollowers}>{numFollowers}</h3>
                <span className={style.shortDescription}>{description}</span>

            </div>
            <div className={style.UserButtons}>
                <button onClick={onClickFollowAction} className={style.favoriteFriendsButtons}>{debugFollowRepr()}</button>
                <button onClick={onClickFriendAction} className={style.favoriteFriendsButtons}>{debugFriendRepr()}</button>
             </div>
             
        </div>
        )
        
}

export default withRouter(UserPreview);