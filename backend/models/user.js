const mongoose = require("mongoose");

const twitchData = new mongoose.Schema({
  login: String,
  display_name: String,
  description: String,
  profile_image_url: String,
  view_count: Number
});
const TwitchData = mongoose.model("TwitchData", twitchData );
const googleData = new mongoose.Schema({
  displayName: String,
  name: {familyName: String,givenName: String},
  emails:[{value: String, verified: Boolean}],
  photos:[{value:String}],
});
const GoogleData =  mongoose.model("GoogleData", googleData );

// Schema for user account
const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  twitchId: String,
  googleId: String,
  twitchData: {type: mongoose.Schema.Types.Mixed, ref: 'TwitchData'} ,
  googleData: {type: mongoose.Schema.Types.Mixed, ref: 'GoogleData'}
});
const User = mongoose.model("User", user);




module.exports = {
      User:User,
      GoogleData:GoogleData,
      TwitchData:TwitchData
}


