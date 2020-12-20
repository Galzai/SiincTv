const passport = require("passport");
const bcrypt = require("bcryptjs");
const {User, FriendsData} = require("../models/user");
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
        
        const friendsData = new FriendsData({
          friendsList: [],
          receivedRequests: [],
          sentRequests: []
        })
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          friendsData: friendsData
        });
        await newUser.save();
        res.send("auth/user_created");
      }
    });
  };
  
  exports.get_user = function(req, res){
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  };

  exports.get_user_data = function(req, res){
    console.log("req = " + req.body.username)
    User.findOne( 
      {username: req.body.username},
       async function(err, doc){
          if (err){
            console.log("error occured");
            res.send([]);
          }
          if (doc){
            console.log(doc);
            res.send( doc );
          }
          else
          {
            console.log("couldnt get user data " + req.body.username);
            res.send([]);
          }
    })
  };

  // Check if a username exists in the DB
  exports.check_username_exists = function(req, res){
    console.log("Username exists req : " + req.body.username);
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

  exports.searchUsers = function(req, res){
    const page = req.body.page;
    const searchString = req.body.searchString;
    const PAGE_SIZE = 20;                   // Similar to 'limit'
    const skip = (page - 1) * PAGE_SIZE;    // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
    User.find({$and: [
        { $text : { $search : searchString}}]},
        { score : { $meta: "textScore" }},

    ).limit(PAGE_SIZE).skip(skip).exec(
    async function(err, result){
        if (err){;
            console.log(err)
            console.log("user/no_results");
        }
        // id exists
        if (result) res.send(result);
        else res.send('user/no_results');
    }
   
    )  
}
  
  // Redirect user back to previous url
  exports.setRedirectURL = function(req, res, next) {
    req.session.UrlToRedirect = req.headers.referer;
    next();
  }
  // Redirect on success
  exports.successRedirect = function(req, res){
    destination = req.session.UrlToRedirect || '/'
    res.redirect(destination)
  }

  // Twitch authentication
  exports.twitch_auth = function(req, res, next){
    passport.authenticate("twitch.js")(req, res, next);
  };

  // get list of all usernames in database
  exports.getUsernameList = function(req, res) {
      User.find({}).distinct('username', 
        function(err, usernames) {
        if (err){
            console.log("error occured");
        }
        // user exists
        if (usernames) res.send(usernames);
        else res.send([]);
      }
    );
  };  

  // Callback for twitch authentication
  exports.twitch_auth_callback = function(req,res, next){
    passport.authenticate("twitch.js", { failureRedirect: req.session.UrlToRedirect})(req, res, next)
};

// Google authentication
exports.google_auth = function(req, res, next){
  passport.authenticate("google")(req, res, next);
};

  // Callback for google authentication
  exports.google_auth_callback = function(req,res, next){
    console.log(req.session.UrlToRedirect);
    passport.authenticate("google", { failureRedirect: req.session.UrlToRedirect})(req, res, next)
};

  // Facebook authentication
  exports.facebook_auth = function(req, res, next){
    console.log(req.session.UrlToRedirect);
    passport.authenticate("facebook")(req, res, next);
  };

    // Callback for facebook authentication
    exports.facebook_auth_callback = function(req,res, next){
      console.log(req.session.UrlToRedirect);
      passport.authenticate("facebook", { failureRedirect: req.session.UrlToRedirect})(req, res, next)
  };



