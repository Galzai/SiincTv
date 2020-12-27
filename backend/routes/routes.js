var express = require('express')
const passport = require("passport");
var router = express.Router()

// our controllers
var userController = require('../controllers/userController')
var streamController = require('../controllers/streamController')
var twitchController = require('../controllers/twitchController')
var friendsController = require('../controllers/friendsController')
var youtubeController = require('../controllers/youtubeController')

// POST request to sign in
router.post('/signin',userController.user_login);

// POST request to log out
router.post('/signout',userController.logout); 

// POST request to sign up
router.post('/signup',userController.user_signup);

// GET request to get currently signed in user
router.get('/user',userController.get_user);

// POST request to get user data
router.post('/userdata',userController.get_user_data);

// POST request to check if given username exists
router.post('/check_username',userController.check_username_exists);

// GET request to authenticate twitch user
router.get('/auth/twitch', userController.setRedirectURL, userController.twitch_auth);

// GET request Twitch callback
router.get('/auth/twitch/callback', userController.twitch_auth_callback, userController.successRedirect);

// GET request to authenticate google user
router.get('/auth/google', userController.setRedirectURL, userController.google_auth);

// GET request google callback
router.get('/auth/google/callback', userController.google_auth_callback, userController.successRedirect);

// GET request to authenticate google user
router.get('/auth/facebook', userController.setRedirectURL, userController.facebook_auth);

// GET request google callback
router.get('/auth/facebook/callback', userController.facebook_auth_callback, userController.successRedirect);

// POST request create stream
router.post('/user/createstream', streamController.createStream);

// POST request getStreamById
router.post('/user/find_stream_data', streamController.getStreamById);

// GET request getUsernameList
router.get('/user/getusernamelist', userController.getUsernameList);

// POST request searchStreams
router.post('/search/streams', streamController.searchStreams);

// POST request getStreamsByStatus
router.post('/feed/streams', streamController.getStreamsByStatus);

// POST request getAllStreamGroupsStreams
router.post('/twitch/get_streams', twitchController.getAllStreamGroupsStreams);

// POST request getLiveVideoId
router.post('/youtube/getLiveVideoId', youtubeController.getLiveVideoId);

// POST request searchStreams
router.post('/search/users', userController.searchUsers);

// POST request redirectBack
router.post('/auth/setRedirectUrl', userController.setRedirectURL);
 
router.post('/user/friends', friendsController.handleFriendsRequest);

router.post('/streams/closeStream', streamController.closeStream);



module.exports = router;
