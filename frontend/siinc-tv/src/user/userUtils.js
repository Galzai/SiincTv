import NoProfilePic from "../assets/NoProfilePic.svg"
const userUtils ={

    /**
     * @brief assigns image if an image is found in userData
     */
    assignImage:  function(user){
        if(!user) return NoProfilePic;
        if(user.image) return user.image;
        if(user.twitchData && user.twitchData.profile_image_url) return user.twitchData.profile_image_url;
        if(user.facebookData && user.facebookData.photos) return user.facebookData.photos[0].value;
        if(user.googleData && user.googleData.photos) return user.googleData.photos[0].value;
        return NoProfilePic;
    }
    
}

export default userUtils;