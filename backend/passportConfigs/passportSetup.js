const User = require("../models/user");
const bcrypt = require("bcryptjs");

//all our strategies
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitchStrategy = require("passport-twitch.js").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//our keys
const passportConfigs = require('./passportConfigs.js');
const { response } = require("express");
const { json } = require("body-parser");

// Used for authenticating users, passport is passed to not create new instance
module.exports = function (passport) {


  // Local strategy
  passport.use( new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  // Twitch Strategy
  passport.use(new TwitchStrategy(
    {
      clientID: passportConfigs.TWITCH_CONFIG.clientID,
      clientSecret: passportConfigs.TWITCH_CONFIG.clientSecret,
      callbackURL: "/auth/twitch/callback",
    },
    function(accessToken, refreshToken, profile , done){
      console.log("access token :", accessToken);
      console.log("refreshToken :", refreshToken);
      console.log("profile :", profile);
      // We try to see if we have an existing user with this id
      User.findOne({twitchId: profile.id},async function(err, doc){
        if(err){
          console.log("error occured");
          throw err;
        }
        // If we find a user with the existing twitch id we just sign in
        if(doc){
          console.log(profile.id);
          console.log("found user:", doc);
          return done(null, doc);
        }
        //Otherwise we create a new user
        else{
          const newUser = new User({
            username: profile.display_name,
            twitchId: profile.id,
            twitchData:{
              login: profile.login,
              display_name: profile.display_name,
              description: profile.description,
              profile_image_url: profile.profile_image_url,
              view_count: profile.view_count
            }
          });
          // we save and finish
          await newUser.save();
          console.log("Added new user");
          return done(null, newUser);
           }
          }      
        );
      }
    ));
    
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      // We only return relevant data
      const userInformation = {
        username: user.username,
        email: user.email,
        twitchId: user.twitchId,
        twitchData: {
          display_name: user.twitchData.display_name,
          description: user.twitchDatadescription,
          profile_image_url: user.twitchDataprofile_image_url,
          view_count:user.twitchDataview_count
        }

      };
      cb(err, userInformation);
    });
  });
};