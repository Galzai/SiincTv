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
 * @brief Schema for user account
 */
const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  twitchId: String,
  googleId: String,
  facebookId: String,
  twitchData: {type: mongoose.Schema.Types.Mixed, ref: 'TwitchData'} ,
  googleData: {type: mongoose.Schema.Types.Mixed, ref: 'GoogleData'},
  facebookData:{type: mongoose.Schema.Types.Mixed, ref: 'FacebookData'},
  facebookData:{type: mongoose.Schema.Types.Mixed, ref: 'FacebookData'},
  upcomingEvents:[{type: mongoose.Schema.Types.Mixed, ref: 'UpComingEventData'}]
});
const User = mongoose.model("User", user);

module.exports = {
      User:User,
      GoogleData:GoogleData,
      TwitchData:TwitchData,
      FacebookData:FacebookData,
      UpComingEventData:UpComingEventData
}


