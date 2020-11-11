const User = require("../models/user");
const bcrypt = require("bcryptjs");

//all our strategies
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitchStrategy = require("passport-twitch.js").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//our keys
const passportConfigs = require('./passportConfigs.js')

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
      callbackURL: "http://localhost:4000/auth/twitch/callback",
    },
    function(accessToken, refreshToken, profile , done){
      console.log("access token :", accessToken);
      console.log("refreshToken :", refreshToken);
      console.log("profile :", profile);
        User.findOrCreate({ twitchId: profile.id }, 
          function (err, user) {
            if(err){
              console.log(err);
            }
            console.log(user);
              return done(err, user);
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
        email: user.email
      };
      cb(err, userInformation);
    });
  });
};