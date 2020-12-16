import React, {useState} from "react";
import { withRouter } from 'react-router-dom';
import style from './previews.module.css'

/**
 * @brief displaysa preview of a user
 * 
 * @param {*user} props 
 */
function UserPreview(props){
    const user = props.user;
    const userName = user.userName;
    const image = assignImage();
    const numFollowers = user.numFollowers ? user.numFollowers +  " Followers" : "No Followers";
    const description = user.shortDescription;
    const currentstream = user.currentstream;

    
    function assignImage()
    {
        if(user.image) return user.image;
        if(user.twitchData && user.twitchData.profile_image_url) return user.twitchData.profile_image_url;
        if(user.facebookData && user.FacebookData.photos) return user.FacebookData.photos[0];
        if(user.googleData && user.FacebookData.photos) return user.FacebookData.photos[0];
    }

    function handleRedirect() {
        props.history.push(`/users/${userName}`);
      }

    return(
        <div className={style.UserPreviewBox} onClick={handleRedirect}>
            <img className={style.streamerCircle}
                src={image} 
            > 
            </img>
            <div className={style.UserTitle}>
                <h2 className={style.UserName}>{userName}</h2>
                <h3 className={style.NumFollowers}>{numFollowers}</h3>
                <span className={style.shortDescription}>{description}</span>

            </div>
            <div className={style.UserButtons}>
                <button>Follow</button>
                <button>Add Friend</button>
             </div>
             
        </div>
        )
        
}

export default withRouter(UserPreview);