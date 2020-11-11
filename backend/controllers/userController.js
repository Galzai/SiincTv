const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.user_login = function(req, res, next){
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  };
  
  
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
      }
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // encrypt the password
  
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  };
  
  exports.get_user = function(req, res){
    console.log(req.user);
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
  };