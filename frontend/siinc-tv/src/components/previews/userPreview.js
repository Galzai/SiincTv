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
    const username = user.username;
    const image = assignImage();
    const numFollowers = user.numFollowers ? user.numFollowers +  " Followers" : "No Followers";
    const description = user.shortDescription ? user.shortDescription :" No Description";
    const currentstream = user.currentstream;
    console.log(user);

    /**
     * @brief assigns image if an image is found in userData
     */
    function assignImage()
    {
        if(user.image) return user.image;
        if(user.twitchData && user.twitchData.profile_image_url) return user.twitchData.profile_image_url;
        if(user.facebookData && user.facebookData.photos) return user.facebookData.photos[0].value;
        if(user.googleData && user.googleData.photos) return user.googleData.photos[0].value;
    }

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
                <button>Follow</button>
                <button>Add Friend</button>
             </div>
             
        </div>
        )
        
}

export default withRouter(UserPreview);