const mongoose = require("mongoose");

// Schema for user account
const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  twitchId: String,
  twitchData:{
    login: String,
    display_name: String,
    description: String,
    profile_image_url: String,
    view_count: Number    

  }
});

module.exports = mongoose.model("User", user);