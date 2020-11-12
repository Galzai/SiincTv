var express = require('express')
const passport = require("passport");
var router = express.Router()

// our controllers
var userController = require('../controllers/userController')

// POST request to sign in
router.post('/signin',userController.user_login);

// POST request to log out
router.post('/signout',userController.logout); 

// POST request to sign up
router.post('/signup',userController.user_signup);

// GET request to get currently signed in user
router.get('/user',userController.get_user);

// POST request to check if given username exists
router.post('/check_username',userController.check_username_exists);

// GET request to authenticate twitch user
router.get('/auth/twitch',userController.twitch_auth);

//Get request Twitch callback
router.get('/auth/twitch/callback', userController.twitch_auth_callback);

// GET request to authenticate google user
router.get('/auth/google',userController.google_auth);

//Get request google callback
router.get('/auth/google/callback', userController.google_auth_callback);

// GET request to authenticate google user
router.get('/auth/facebook',userController.facebook_auth);

//Get request google callback
router.get('/auth/facebook/callback', userController.facebook_auth_callback);

module.exports = router;
