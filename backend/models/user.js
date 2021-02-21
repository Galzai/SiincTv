const mongoose = require("mongoose");

/**
 * Schema for twitch data   
 * @class
 * @category Backend
 * @subcategory User Models
 * @param  {String} login
 * @param  {String} display_name
 * @param  {String} description
 * @param  {String} profile_image_url
 * @param  {Number} view_count
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
 * Schema for google
 * @class
 * @category Backend
 * @subcategory User Models
 * @param  {String} displayName
 * @param  {String} youtubeId
 * @param  {String} youtubeName
 * @param  {Object} name
 * @param  {Object[]} emails
 * @param  {String[]} photos
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
 * Schema for facebook
 * @class
 * @category Backend
 * @subcategory User Models
 * @param  {String} displayName
 * @param  {String} profileUrl
 * @param  {Object} name
 * @param  {String} photos
 */
const facebookData = new mongoose.Schema({
  displayName: String,
  profileUrl: String,
  name: {familyName: String,givenName: String},
  photos:[{value:String}],
});
const FacebookData =  mongoose.model("FacebookData", facebookData );

/**
 * holds information regarding the user's upcoming events
 * @class
 * @category Backend
 * @subcategory User Models
 * @param  {String} name
 * @param  {Date} date
 * @param  {mongoose.Schema.Types.ObjectId} eventId
 */
const upComingEventData = new mongoose.Schema({
  name : String,
  date: Date,
  eventId: mongoose.Schema.Types.ObjectId
});
const UpComingEventData = mongoose.model("UpComingEventData", upComingEventData );

/**
 * holds information regarding the user's friends and friend requests
 * @class
 * @category Backend
 * @subcategory User Models
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
 * holds information regarding the user's followers
 * @class
 * @category Backend
 * @subcategory User Models
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
 * Schema for Notification data/fields ( each type of notification has different fields )
 * @class
 * @category Backend
 * @subcategory User Models
 */ 
var notificationData = new mongoose.Schema({
  type: Map,
  of: String
});
const NotificationData = mongoose.model("NotificationData", notificationData );

/**
* Schema for notifications
 * @class
 * @category Backend
 * @subcategory User Models
 * @param  {String} type
 * @param  {Boolean} clearable
 * @param  {Date} date
 * @param  {mongoose.Schema.Types.Mixed} data
 */
const notification = new mongoose.Schema({
  type: String,
  clearable: Boolean,
  date: {type: Date, default: Date.now},
  data: mongoose.Schema.Types.Mixed
});
const Notification = mongoose.model("Notification", notification );

/**
 * Schema for user account
 * @class
 * @category Backend
 * @subcategory User Models
 * @param  {String} username
 * @param  {String} email
 * @param  {String} password
 * @param  {String} twitchId
 * @param  {String} googleId
 * @param  {String} facebookId
 * @param  {String} image
 * @param  {String} shortDescription
 * @param  {String} description
 * @param  {upComingEventData} currentStream
 * @param  {twitchData} twitchData
 * @param  {googleData} googleData
 * @param  {facebookData} facebookData
 * @param  {upComingEventData[]} upcomingEvents
 * @param  {friendsData[]} friendsData
 * @param  {notification[]} notifications
 * @param  {followData} followData
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
  interests:[{label: String, value: String}]
});

// This is necessery for quick text search
user.index({username: 'text', shortDescription: 'text', description: 'text'}, 
{name: 'Search index', weights: {username: 3, shortDescription: 2, description: 1}});
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


