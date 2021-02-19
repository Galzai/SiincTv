import React, {useState, useContext} from "react";
import { withRouter } from 'react-router-dom';
import style from './previews.module.css'
import userUtils from "../../user/userUtils" 
import UserContext from "../../userContext"
import {getFriendState, handleFriendAction} from "../../user/friends";
import {isFollowing, handleFollowAction} from "../../user/follows";

/**
 * displays a preview of a user
 * 
 * @prop {userData} user  the data of the user to display
 * @component
 * @category Frontend
 * @subcategory Previews
 */
function UserPreview(props){
    const user = props.user;
    const username = user.username;
    const userid = user._id;
    const image = userUtils.assignImage(user);
    const numFollowers = user.numFollowers ? user.numFollowers +  " Followers" : "No Followers";
    const description = user.shortDescription ? user.shortDescription :" No Description";
    const currentstream = user.currentstream;
    const userContext = useContext(UserContext);

    function handleRedirect() {
        props.history.push(`/users/${userid}`);
      }

      const debugFriendRepr=()=> {
        if(  userContext.user == null || user == null ) 
            return "";
        if( String(userContext.user._id) === String(user._id) ) 
            return "Its you!";
        if(userContext.user.friendsData)
        {
            if( userContext.user.friendsData.friendsList.find(x=>String(x.memberId)===String(user._id)) != undefined ) 
                return "Unfriend";
            if( userContext.user.friendsData.sentRequests.find(x=>String(x.userId)===String(user._id)) != undefined ) 
                return "Pending";
            if( userContext.user.friendsData.receivedRequests.find(x=>String(x.userId)===String(user._id)) != undefined ) 
                return "Accept";
        }

        return "Add Friend";
    }

    const onClickFriendAction=()=>{
        handleFriendAction(userContext.user, {username: user.username, userId: user._id});
        userContext.refreshUserData();
    }

    const debugFollowRepr=()=> {
        if( userContext.user == null || user == null )
            return "";
        if( String(userContext.user._id) === String(user._id) )
            return "you!";
        if(userContext.user.followData &&
           userContext.user.followData.followingList.find(x=>String(x.userId)===String(user._id)) != undefined )
            return "Unfollow"
        return "Follow"
    }

    const onClickFollowAction=()=>{
        if( user )
            handleFollowAction(userContext.user, user);
        userContext.refreshUserData();
    }

    return(
        <div className={style.UserPreviewBox}>
            {image &&<img className={style.streamerCircle}
                src={image} onClick={handleRedirect}
            > 
            </img>}
            <div className={style.UserTitle}>
                <h2 className={style.userName} onClick={handleRedirect}>{username}</h2>
                <h3 className={style.NumFollowers}>{numFollowers}</h3>
                <span className={style.shortDescription}>{description}</span>

            </div>
            <div className={style.UserButtons}>
                { userContext.user && <button onClick={onClickFollowAction} className={style.favoriteFriendsButtons}>{debugFollowRepr()}</button> }
                { userContext.user && <button onClick={onClickFriendAction} className={style.favoriteFriendsButtons}>{debugFriendRepr()}</button> }
             </div>
             
        </div>
        )
        
}

export default withRouter(UserPreview);