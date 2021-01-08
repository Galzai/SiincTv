const mongoose = require("mongoose");

/**
 * @brief Schema for twitch data   
 */ 
const twitchData = new mongoose.Schema({
  login: String,
  display_name: String,
  description: String,
  profile_image_url: String,
  view_count: Number
});
const TwitchData = mongoose.model("TwitchData", twitchData );

/**
 * @brief Schema for google
 */ 
const googleData = new mongoose.Schema({
  displayName: String,
  youtubeId: String,
  youtubeName: String,
  name: {familyName: String,givenName: String},
  emails:[{value: String, verified: Boolean}],
  photos:[{value:String}],
});
const GoogleData =  mongoose.model("GoogleData", googleData );

/**
 * @brief Schema for facebook
 */
const facebookData = new mongoose.Schema({
  displayName: String,
  profileUrl: String,
  name: {familyName: String,givenName: String},
  photos:[{value:String}],
});
const FacebookData =  mongoose.model("FacebookData", facebookData );

/**
 * @brief holds information regarding the user's upcoming events
 */
const upComingEventData = new mongoose.Schema({
  name : String,
  date: Date,
  eventId: mongoose.Schema.Types.ObjectId
});
const UpComingEventData = mongoose.model("UpComingEventData", upComingEventData );

/**
 * @brief holds information regarding the user's friends and friend requests
 */
const friendsData = new mongoose.Schema({
  friendsList: [{
      value: String,
      memberId: mongoose.Schema.Types.ObjectId,
      youtubeId: String,
      twitchId: String,
      displayName : String,
      userImage : String,
      label: String,
      userImage: String
    }],
    //{userId : mongoose.Schema.Types.ObjectId, username: String, }],
  receivedRequests: [{userId : mongoose.Schema.Types.ObjectId, username: String}],
  sentRequests: [{userId : mongoose.Schema.Types.ObjectId, username: String}]
});
const FriendsData = mongoose.model("FriendsData", friendsData);

/**
 * @brief holds information regarding the user's followers
 */
const followData = new mongoose.Schema({
  followersList: [{
    userId: mongoose.Schema.Types.ObjectId,
    youtubeId: String,
    twitchId: String,
    userName : String,
    userImage : String,
  }],
  followingList: [{
    userId: mongoose.Schema.Types.ObjectId,
    youtubeId: String,
    twitchId: String,
    userName : String,
    userImage : String,
  }],
});
const FollowData = mongoose.model("FollowData", followData);

/**
 * @brief Schema for Notification data/fields ( each type of notification has different fields )
 */ 
var notificationData = new mongoose.Schema({
  type: Map,
  of: String
});
const NotificationData = mongoose.model("NotificationData", notificationData );

/**
* @brief Schema for notifications
*/ 
const notification = new mongoose.Schema({
  type: String,
  clearable: Boolean,
  date: {type: Date, default: Date.now},
  data: mongoose.Schema.Types.Mixed
});
const Notification = mongoose.model("Notification", notification );

/**
 * @brief Schema for user account
 */
const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  twitchId: String,
  googleId: String,
  facebookId: String,
  image: String,
  shortDescription: String,
  description: String,
  currentStream: {type: mongoose.Schema.Types.Mixed, ref: 'UpComingEventData'},
  twitchData: {type: mongoose.Schema.Types.Mixed, ref: 'TwitchData'} ,
  googleData: {type: mongoose.Schema.Types.Mixed, ref: 'GoogleData'},
  facebookData:{type: mongoose.Schema.Types.Mixed, ref: 'FacebookData'},
  upcomingEvents:[{type: mongoose.Schema.Types.Mixed, ref: 'UpComingEventData'}],
  friendsData:{type: mongoose.Schema.Types.Mixed, ref: 'FriendsData'},
  notifications:[{type: mongoose.Schema.Types.Mixed, ref: 'Notification'}],
  followData:{type: mongoose.Schema.Types.Mixed, ref: 'FollowData'},
});

// This is necessery for quick text search
user.index({username: 'text', shortDescription: 'text', description: 'text'}, 
{name: 'Search index', weights: {username: 10, shortDescription: 8, description: 5}});
const User = mongoose.model("User", user);

module.exports = {
      User:User,
      GoogleData:GoogleData,
      TwitchData:TwitchData,
      FacebookData:FacebookData,
      UpComingEventData:UpComingEventData,
      FriendsData:FriendsData,
      Notification:Notification,
      NotificationData:NotificationData,
      FollowData:FollowData,
}


