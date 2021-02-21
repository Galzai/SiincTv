/**
 * This controller is in charge of all of the actions relating to a user/users
 * @module UserController
 * @category Backend
 * @subcategory Controllers
 */
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { User, FriendsData, FollowData, Notification  } = require("../models/user");
var notificationController = require("./notificationController");
const e = require("express");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 * 60, checkperiod: 120 });

/**
 * Tries to sign in a user with a given username and password
 * Redirects the user to the same page he previously was on
 *
 * @param {*} req.body.username userName to login with
 * @param {*} req.body.password password tor login with
 * @return if failed, a string describing the failure, otherwise the data of the user that signed in
 */
exports.user_login = function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.send("auth/login_failed");
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("auth/login_success");
      });
    }
  })(req, res, next);
};

/**
 * Logs the current user on the session out
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(req.user);
};

/**
 * Tries to register a custom user with given username , email and password
 * if succesful password is encrypted with bcrypt and user data is written to database
 *
 * @param {*} req.body.username userName to register with
 * @param {*} req.body.email email to registerwith
 * @param {*} req.body.password password tor register with
 *
 * @sends "auth/user_created" if succesful, otherwise the relevant error (username exists, etc..)
 */
exports.user_signup = function (req, res) {
  // If either the email or the username exists we do not allow registration
  User.findOne(
    { $or: [{ username: req.body.username }, { email: req.body.email }] },
    async function (err, doc) {
      if (err) {
        throw err;
      }
      if (doc) {
        if (doc.email === req.body.email) {
          res.send("auth/email_exists");
        } else {
          res.send("auth/username_exists");
        }
      }

      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // encrypt the password

        const friendsData = new FriendsData({
          friendsList: [],
          receivedRequests: [],
          sentRequests: [],
        });
        const followData = new FollowData({
          followersList: [],
          followingList: [],
        });
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          friendsData: friendsData,
          followData: followData,
        });
        await newUser.save();
        const notificationData = new Notification({
          type: "welcomeNotification",
          clearable: true,
        });
        notificationController.addNotificationToUser(newUser._id,notificationData ,null);
        res.send("auth/user_created");
      }
    }
  );
};

/**
 * Returns the up-to-date data of the currently signed in user (or null if no user exist)
 */
exports.get_user = function (req, res) {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
};

/**
 * Returns data regarding a specific requested user by username
 * @param {*} req.body.username username of the user to search for
 */
exports.get_user_data = function (req, res) {
  User.findOne({ _id: req.body.userId }, async function (err, doc) {
    if (err) {
      res.send([]);
    }
    if (doc) {
      res.send(doc);
    } else {
      res.send([]);
    }
  });
};

/**
 * Checks if a username exists in the databaase
 * @param {*} req.body.username username to check for
 * @sends true if username exists false otherwise
 */
exports.check_username_exists = function (req, res) {
  const username = req.body.username;
  let exists = myCache.get(username);
  if (exists === undefined) {
    User.findOne({ username: username }, async function (err, doc) {
      if (err) {
      }
      // user exists
      if (doc) {
        const success = myCache.set(username, true);
        res.send(true);
      } else res.send(false);
    });
  } else {
    res.send(true);
  }
};

/**
 * Searches user by a search string (looks at their username and various data) and what page to look in
 * Results are paginated to pages with 20 entries each
 *
 * @param {*} req.body.searchString string to search in
 * @param {*} req.body.page what page of the results we are looking for
 */
exports.searchUsers = function (req, res) {
  const page = req.body.page;
  const searchString = req.body.searchString;
  const PAGE_SIZE = 5; // Similar to 'limit'
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  User.find(
    { $and: [{ $text: { $search: searchString } }] },
    { score: { $meta: "textScore" } }
  )
    .skip(skip)
    .limit(PAGE_SIZE)
    .exec(async function (err, result) {
      if (err) {
        res.send("user/no_results");
      }
      // id exists
      if (result) res.send(result);
      else res.send("user/no_results");
    });
};

/**
 * Sets the redirect URI for authentication calls to be the recieved uri
 * Take the data from the header (the referrer)
 */
exports.setRedirectURL = function (req, res, next) {
  req.session.UrlToRedirect = req.headers.referer;
  next();
};

/**
 * This function redirect the caller to the redirect URI on the session
 */
exports.successRedirect = function (req, res) {
  destination = req.session.UrlToRedirect || "/";
  res.redirect(destination);
};

/**
 * Uses passport for authentication
 */
exports.twitch_auth = function (req, res, next) {
  passport.authenticate("twitch.js")(req, res, next);
};

/**
 * Callback after authentication, redirects user to previously set URI
 */
exports.twitch_auth_callback = function (req, res, next) {
  passport.authenticate("twitch.js", {
    failureRedirect: req.session.UrlToRedirect,
  })(req, res, next);
};

/**
 * Uses passport for authentication
 */
exports.google_auth = function (req, res, next) {
  passport.authenticate("google")(req, res, next);
};

/**
 * Callback after authentication, redirects user to previously set URI
 */
exports.google_auth_callback = function (req, res, next) {
  passport.authenticate("google", {
    failureRedirect: req.session.UrlToRedirect,
  })(req, res, next);
};

/**
 * Uses passport for authentication
 */
exports.facebook_auth = function (req, res, next) {
  passport.authenticate("facebook")(req, res, next);
};

/**
 * Callback after authentication, redirects user to previously set URI
 */
exports.facebook_auth_callback = function (req, res, next) {
  passport.authenticate("facebook", {
    failureRedirect: req.session.UrlToRedirect,
  })(req, res, next);
};


exports.updateUserShortDescription = function (req, res, next) {
  const data = req.body;

  User.updateOne(
    { _id: data.userId },
    { $set: { shortDescription: data.text } }
  )
    .then((obj) => {
    })
    .catch((error) => {
    });
};

exports.updateUserInterests = function (req, res, next) {
  const data = req.body;

  User.updateOne(
    { _id: data.userId },
    { $set: { interests: data.interests } }
  )
    .then((obj) => {
    })
    .catch((error) => {
    });
};
