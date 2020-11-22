const passport = require("passport");
const bcrypt = require("bcryptjs");
const {User} = require("../models/user");
const e = require("express");

exports.user_login = function(req, res, next){
    passport.authenticate("local", (err, user, info) => {
      if (err){
          console.log(err);
          throw err;
      }
      if (!user){
        res.send("auth/login_failed");
      }
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("auth/login_success");
          console.log(info);
        });
      }
    })(req, res, next);
  };
  
  exports.logout = function(req,res){
    console.log("user requested sign out");
    req.logout();
    res.send(req.user);
}

  // we first try to check if a user with the same username exists, otherwise we allow registration
  exports.user_signup = function(req, res){
    // If either the email or the username exists we do not allow registration
    User.findOne({ $or: [
        {username: req.body.username},
        {email: req.body.email}
    ]
     }, async function(err, doc){
      if (err){
          console.log("error occured");
          throw err;
      }
      if (doc){
        if(doc.email === req.body.email){
            res.send("auth/email_exists");
        }

        else
        {
            res.send("auth/username_exists");
        }
      }

      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // encrypt the password
  
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("auth/user_created");
      }
    });
  };
  
  exports.get_user = function(req, res){
    console.log(req.user);
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  };

  // Check if a username exists in the DB
  exports.check_username_exists = function(req, res){
    User.findOne({username: req.body.username},
        async function(err, doc){
            if (err){
                console.log("error occured");
            }
            // user exists
            if (doc) res.send(true);
            else res.send(false);
        })
  };
  
  // Twitch authentication
  exports.twitch_auth = function(req, res, next){
    passport.authenticate("twitch.js")(req, res, next);
  };

  // Callback for twitch authentication
  exports.twitch_auth_callback = function(req,res, next){
    passport.authenticate("twitch.js", { failureRedirect: "http://localhost:3000/" ,successRedirect:"http://localhost:3000/" })(req, res, next)
};

// Google authentication
exports.google_auth = function(req, res, next){
  passport.authenticate("google")(req, res, next);
};

  // Callback for google authentication
  exports.google_auth_callback = function(req,res, next){
    passport.authenticate("google", { failureRedirect: "http://localhost:3000/" ,successRedirect:"http://localhost:3000/" })(req, res, next)
};

  // Facebook authentication
  exports.facebook_auth = function(req, res, next){
    passport.authenticate("facebook")(req, res, next);
  };

    // Callback for facebook authentication
    exports.facebook_auth_callback = function(req,res, next){
      passport.authenticate("facebook", { failureRedirect: "http://localhost:3000/" ,successRedirect:"http://localhost:3000/" })(req, res, next)
  };

