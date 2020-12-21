import React, {useState} from "react";
import { withRouter } from 'react-router-dom';
import style from './previews.module.css'
import userUtils from "../../user/userUtils" 

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
    console.log(user);

    function handleRedirect() {
        props.history.push(`/users/${username}`);
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
                <button className={style.favoriteFriendsButtons}>Follow</button>
                <button className={style.favoriteFriendsButtons}>Add Friend</button>
             </div>
             
        </div>
        )
        
}

export default withRouter(UserPreview);