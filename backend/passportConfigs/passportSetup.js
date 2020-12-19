var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
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
const { GOOGLE_CONFIG, FACEBOOK_CONFIG } = require("./passportConfigs.js");

// our Models
const {User} = require("../models/user");
const {GoogleData} = require("../models/user");
const {TwitchData} = require("../models/user");
const {FacebookData} = require("../models/user");

const YOUTUBE_SCOPE = "https://www.googleapis.com/auth/youtube.readonly";

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
      callbackURL: "/auth/twitch/callback"
    },
    // Twitch auth callback function
    function(accessToken, refreshToken, profile , done){
      // We try to see if we have an existing user with this id
      User.findOne({twitchId: profile.id},
        // findOne callback function
        async function(err, doc){
        if(err){
          console.log("error occured");
          throw err;
        }
        // If we find a user with the existing twitch id we just sign in
        if(doc){
          console.log(profile.id);
          return done(null, doc);
        }
        //Otherwise we create a new user
        else{

          const newTwitchData = new TwitchData({
            login: profile.login,
            display_name: profile.display_name,
            description: profile.description,
            profile_image_url: profile.profile_image_url,
            view_count: profile.view_count
          });
          const newUser = new User({
            username: profile.display_name,
            twitchId: profile.id,
            twitchData:newTwitchData
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
  
// Google strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CONFIG.clientID,
  clientSecret: GOOGLE_CONFIG.clientSecret,
  callbackURL: "/auth/google/callback",
  scope: ['profile', 'email', YOUTUBE_SCOPE]
},
   // Google auth callback function
  async function(accessToken ,refreshToken ,profile, done){
    console.log(profile);
    // We try to see if we have an existing user with this id
    User.findOne({googleId: profile.id},
      // findOne callback function
      async function(err, doc){
      if(err){
        console.log("error occured");
        throw err;
      }
    //****************Getting user's youtube channels **************** */
    var oauth2Client = new OAuth2(GOOGLE_CONFIG.clientID, GOOGLE_CONFIG.clientSecret, "/auth/google/callback");
    oauth2Client.credentials = {
      access_token: accessToken,
      refresh_token: refreshToken
  };
    var service = google.youtube('v3');
    service.channels.list({
      auth: oauth2Client,
      part: 'snippet,contentDetails,statistics',
      forUsername: 'GoogleDevelopers'
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                    'it has %s views.',
                    channels[0].id,
                    channels[0].snippet.title,
                    channels[0].statistics.viewCount);
      }
    });

      // If we find a user with the existing google id we just sign in
      if(doc){
        return done(null, doc);
      }
      //Otherwise we create a new user
      else{
        const newGoogleData = new GoogleData({
          displayName: profile.displayName,
          name: profile.name,
          emails: profile.emails,
          photos: profile.photos
        });
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id,
          googleData:newGoogleData
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

// Facebook strategy
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CONFIG.clientID,
  clientSecret: FACEBOOK_CONFIG.clientSecret,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'link', 'picture.type(large)']
},
   // Facebook auth callback function
  async function(accessToken ,refreshToken ,profile, done){
    // We try to see if we have an existing user with this id
    User.findOne({facebookId: profile.id},
      // findOne callback function
      async function(err, doc){
      if(err){
        console.log("error occured");
        throw err;
      }
      // If we find a user with the existing facebook id we just sign in
      if(doc){
        return done(null, doc);
      }
      //Otherwise we create a new user
      else{
        const newFacebookData = new FacebookData({
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
          name: profile.name,
          photos: profile.photos
        });
        const newUser = new User({
          username: profile.displayName,
          facebookId: profile.id,
          facebookData:newFacebookData
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
      if(err || user == null) {
        return cb(err,null);

      }

      // We only return relevant data
      const userInformation = {
        _id: user._id,
        username: user.username,
        image:user.image,
        shortDescription:user.shortDescription,
        description:user.description,
        currentStream:user.currentStream,
        twitchId: user.twitchId,
        googleId: user.googleId,
        twitchData: user.twitchData,
        googleData: user.googleData,
        facebookData: user.facebookData,
        upcomingEvents :user.upcomingEvents
      };
      cb(err, userInformation);
    });
  });
};