/**
 * This modules defines all the routes in our backend API
 * 
 * @module Routes
 * @category Backend
 * @subcategory Routes
 */

var express = require('express')
const passport = require("passport");
var router = express.Router()

// our controllers
var userController = require('../controllers/userController')
var streamController = require('../controllers/streamController')
var twitchController = require('../controllers/twitchController')
var friendsController = require('../controllers/friendsController')
var youtubeController = require('../controllers/youtubeController')
var notificationController = require('../controllers/notificationController')
var followController = require('../controllers/followController')


/**
 * Login using a local strategy.
 *
 * @name User Login
 * @route {POST} /api/signin
 * @bodyparam {String} username to login with
 * @bodyparam {String} password to login with
 */
router.post('/signin',userController.user_login);

/**
 * Logout from currently logged in user, uses session data.
 *
 * @name User Logout
 * @route {POST} /api/signout
 */
router.post('/signout',userController.logout); 

/**
 * Sign up using a local strategy.
 *
 * @name User Login
 * @route {POST} /api/signup
 * @bodyparam {String} username to signup with
 * @bodyparam {String} password to signup with
* @bodyparam {String} email to signup with
 */
router.post('/signup',userController.user_signup);

/**
 * Returns up-to-date data of the user logged in to the session.
 *
 * @name Get User
 * @route {GET} /api/user
 */
router.get('/user',userController.get_user);

/**
 * Get data regarding a specific user
 *
 * @name Get User Data
 * @route {POST} /api/userdata
 * @bodyparam {String} username to get data of
 */
router.post('/userdata',userController.get_user_data);

/**
 * Checks if a user with a given user name already exists.
 *
 * @name Check Username
 * @route {POST} /api/userdata
 * @bodyparam {String} username to get data of
 */
router.post('/check_username',userController.check_username_exists);

/**
 * Authenticates user using Twitch API
 *
 * @name Twitch Auth
 * @route {GET} /api/auth/twitch
 */
router.get('/auth/twitch', userController.setRedirectURL, userController.twitch_auth);

/**
 * Callback for Twitch auth
 *
 * @name Twitch Auth callback
 * @route {GET} /api/auth/twitch/callback
 */
router.get('/auth/twitch/callback', userController.twitch_auth_callback, userController.successRedirect);

/**
 * Authenticates user using Google API
 *
 * @name Google Auth
 * @route {GET} /api/auth/google
 */
router.get('/auth/google', userController.setRedirectURL, userController.google_auth);

/**
 * Callback for Google auth
 *
 * @name Google Auth callback
 * @route {GET} /api/auth/google/callback
 */
router.get('/auth/google/callback', userController.google_auth_callback, userController.successRedirect);

/**
 * Authenticates user using Facebook API
 *
 * @name Facebook Auth
 * @route {GET} /api/auth/facebook
 */
router.get('/auth/facebook', userController.setRedirectURL, userController.facebook_auth);

/**
 * Callback for Facebook auth
 *
 * @name Facebook Auth callback
 * @route {GET} /api/auth/facebook/callback
 */
router.get('/auth/facebook/callback', userController.facebook_auth_callback, userController.successRedirect);

/**
 * Creates a stream with given details, user data must be valid.
 *
 * @name Create stream
 * @route {POST} /api/user/createstream
 * @bodyparam {StreamData} Data of the stream to create
 */
router.post('/user/createstream', streamController.createStream);

/**
 * Creates a stream with given details, user data must be valid.
 *
 * @name Get Stream By Id
 * @route {POST} /api/user/find_stream_data
 * @bodyparam {String} streamId id of the stream to get data of
 */
router.post('/user/find_stream_data', streamController.getStreamById);

/**
 * Searches for streams by search string, return the page of results by page
 *
 * @name Search streams
 * @route {POST} /api/search/streams
 * @bodyparam {String} searchString string to search streams by
 * @bodyparam {String} page to return
 * @bodyparam {String} status stream status
 */
router.post('/search/streams', streamController.searchStreams);

/**
 * Returns page of all streams with status
 *
 * @name Search streams by status
 * @route {POST} /api/feed/streams
 * @bodyparam {String} page to return
 * @bodyparam {String} status stream status
 */
router.post('/feed/streams', streamController.getStreamsByStatus);

/**
 * Returns all the data from twitch regarding the streams given
 *
 * @name Get twitch streams
 * @route {POST} /api/twitch/get_streams
 * @bodyparam {streamGroup[]} streamGroups List of all the groups of streamers to search data for
 */
router.post('/twitch/get_streams', twitchController.getAllStreamGroupsStreams);

/**
 * Returns all the data from twitch regarding the streams given
 *
 * @name Get YouTube Live video id by channel id
 * @route {POST} /api/youtube/getLiveVideoId
 * @bodyparam {String} ChannelId of all the groups of streamers to search data for
 */
router.post('/youtube/getLiveVideoId', youtubeController.getLiveVideoId);

/**
 * Searches for users by search string, return the page of results by page
 *
 * @name Search users
 * @route {POST} /api/search/users
 * @bodyparam {String} searchString string to search users by
 * @bodyparam {String} page to return
 */
router.post('/search/users', userController.searchUsers);

/**
 * Sets redirect URL in order to keep users logout/login on same page
 *
 * @name Set Redirect Url
 * @route {POST} /api/auth/setRedirectUrl
 * @headerparam {String} referer URL to redirect to
 */
router.post('/auth/setRedirectUrl', userController.setRedirectURL);
 
// POST request handle friends
router.post('/user/friends', friendsController.handleFriendsRequest);

// POST request handle follows
router.post('/user/follow', followController.handleFollowRequest);

/**
 * Closes the user's current stream if it exists
 *
 * @name Close stream
 * @route {POST} /api/streams/closeStream
 */
router.post('/streams/closeStream', streamController.closeStream);

/**
 * Deletes a given notification from the logged in user
 *
 * @name Delete notification
 * @route {POST} /api/notifications/deleteNotification
 * @bodyparam {String} notificationId Id of the notification to delete
 */
router.post('/notifications/deleteNotification', notificationController.deleteNotificationFromCurrentUser);

/**
 * Deletess all clearable notifications from current users
 *
 * @name Delete notification
 * @route {POST} /api/notifications/clearNotifications
 */
router.post('/notifications/clearNotifications', notificationController.clearAllClearableNotifications);

/**
 * Requests to join a stream of a given stream creator
 *
 * @name Request to join stream
 * @route {POST} /api/streams/requestToJoinStream
 * @bodyparam {String} creatorId Id of the creator of the stream to request to join
 * @bodyparam {streamerData} data streamerData of the user requesting to join
 */
router.post('/streams/requestToJoinStream', streamController.requestToJoinStream);

/**
 * Rejects a request to join stream
 *
 * @name Reject request to join stream
 * @route {POST} /api/streams/rejectRequestToJoin
 * @bodyparam {streamerData} data streamerData of the user to reject
 */
router.post('/streams/rejectRequestToJoin', streamController.rejectRequestToJoin);

/**
 * Accepts a request to join stream
 *
 * @name Accept request to join stream
 * @route {POST} /api/streams/acceptRequestToJoin
 * @bodyparam {streamerData} data streamerData of the user to accept
 */
router.post('/streams/acceptRequestToJoin', streamController.acceptRequestToJoin);

//TODO: Delete this
// POST request poke yourself
router.post('/test/selfPoke', notificationController.pokeYourself);

router.post('/user/update_field', userController.updateUserShortDescription)

module.exports = router;
