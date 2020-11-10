const mongoose = require("mongoose");

// Schema for user account
const user = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("User", user);