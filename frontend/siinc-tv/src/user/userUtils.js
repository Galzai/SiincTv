import NoProfilePic from "../assets/NoProfilePic.svg";

/**
 * This module holds re-usable utility functions for users
 * @class
 * @category Frontend
 */
const userUtils = {
  /**
   *Assigns a user image according to what image data is stored within the user
   */
  assignImage: function (user) {
    if (!user) return NoProfilePic;
    if (user.image) return user.image;
    if (user.userImage) return user.userImage;
    if (user.twitchData && user.twitchData.profile_image_url)
      return user.twitchData.profile_image_url;
    if (user.facebookData && user.facebookData.photos)
      return user.facebookData.photos[0].value;
    if (user.googleData && user.googleData.photos)
      return user.googleData.photos[0].value;
    return NoProfilePic;
  },
};

export default userUtils;
