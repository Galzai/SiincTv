import axios from "axios";

const SEND_FRIEND_REQUEST = 0;
const ANSWER_FRIEND_REQUEST = 1;
const UNFRIEND_REQUEST = 2;
const FOLLOW_REQUEST = 0;
const UNFOLLOW_REQUEST = 1;

/** 
 * We use this module to access our user related backend API
 * All the calls here are to the backend of the web-app
 * 
 * @class
 * @category Frontend
 * @subcategory Actions
 */
const userActions = {
  /**
   * Tries to register a custom user with given username , email and password
   *
   * @param {*} regUsername userName to register with
   * @param {*} regEmail email to registerwith
   * @param {*} regPassword password tor register with
   *
   * @return "auth/user_created" if succesful, otherwise the relevant error (username exists, etc..)
   */
  createNewUser: async function (regUsername, regEmail, regPassword) {
    const result = await axios({
      method: "POST",
      data: {
        username: regUsername,
        email: regEmail,
        password: regPassword,
      },
      withCredentials: true,
      url: "/api/signup",
    });
    return result.data;
  },

  /**
   * Tries to sign in a user with a given username and password
   *
   * @param {*} regUsername username
   * @param {*} regPassword password
   * @return if failed, a string describing the failure, otherwise the data of the user that signed in
   */
  signinWithUsernameAndPassword: async function (regUsername, regPassword) {
    const result = await axios({
      method: "POST",
      data: {
        username: regUsername,
        password: regPassword,
      },
      withCredentials: true,
      url: "/api/signin",
    });
    return result.data;
  },

  /**
   * Logs the current user on the session out
   */
  signOut: async function () {
    const result = await axios({
      method: "POST",
      data: {},
      withCredentials: true,
      url: "/api/signout",
    });
    return result.data;
  },

  /**
   * Returns the up-to-date data of the currently signed in user (or null if no user exist)
   */
  getUser: async function () {
    const result = await axios({
      method: "GET",
      data: {},
      withCredentials: true,
      url: "/api/user",
    });
    return result.data;
  },

  /**
   * Returns data regarding a specific requested user by username
   * @param {*} userId userId of the user to search for
   */
  getUserData: async function (userId) {
    const result = await axios({
      method: "POST",
      data: {
        userId: userId,
      },
      withCredentials: true,
      url: "/api/userdata",
    });
    return result.data;
  },

  /**
   * Checks if a username exists in the databaase
   * @param {*} regUsername username to check for
   * @returns true if username exists false otherwise
   */
  checkUsernameExists: async function (regUsername) {
    const result = await axios({
      method: "POST",
      data: {
        username: regUsername,
      },
      withCredentials: true,
      url: "/api/check_username",
    });
    return result.data;
  },

  /**
   * Searches user by a search string (looks at their username and various data) and what page to look in
   * Results are paginated to pages with 20 entries each
   *
   * @param {*} searchString string to search in
   * @param {*} page what page of the results we are looking for
   */
  searchUsers: async function (searchString, page) {
    const result = await axios({
      method: "POST",
      data: { searchString, page },
      url: "/api/search/users",
    });
    return result.data;
  },

  /**
   * Sets the redirect URI for authentication calls to be the current URI
   */
  setRedirectURL: async function () {
    const result = await axios({
      method: "POST",
      url: "/api/auth/setRedirectUrl",
    });
    return result.data;
  },

  /**
   * Prompts to authenticate with twitch
   */
  authenicateTwitch: function () {
    window.location.assign("/api/auth/twitch/");
  },

  /**
   * Prompts to authenticate with google
   */
  authenicateGoogle: function () {
    window.location.assign("/api/auth/google/");
  },

  /**
   * Prompts to authenticate with facebook
   */
  authenicateFacebook: function () {
    window.location.assign("/api/auth/facebook/");
  },

  // ------------------------- FRIENDS -----------------------------

  /**
   * @brief send friend request
   * @param {String} fromUser - id of request sender
   * @param {String} toUser - id of request receiver
   */
  sendFriendRequest: async function (fromUser, toUser) {
    const result = await axios({
      method: "POST",
      data: {
        action: SEND_FRIEND_REQUEST,
        fromUser: fromUser,
        toUser: toUser,
      },
      withCredentials: true,
      url: "/api/user/friends",
    });
    return result.data;
  },

  /**
   * @brief respond to friend request
   * @param {String} fromUser - id of request sender
   * @param {String} toUser  - id of request responder
   * @param {Boolean} accepted - responder accepted or rejected
   */
  answerFriendRequest: async function (fromUser, toUser, accepted) {
    const result = await axios({
      method: "POST",
      data: {
        action: ANSWER_FRIEND_REQUEST,
        fromUser: fromUser,
        toUser: toUser,
        accepted: accepted, //boolean true for accepted, false for rejeceted.
      },
      withCredentials: true,
      url: "/api/user/friends",
    });
    return result.data;
  },

  /**
   * @brief unfriend user
   * @param {*} fromUser - id of unfriending user
   * @param {*} toUser - id of unfriended user
   */
  unfriendFriendRequest: async function (fromUser, toUser) {
    const result = await axios({
      method: "POST",
      data: {
        action: UNFRIEND_REQUEST,
        fromUser: fromUser,
        toUser: toUser,
      },
      withCredentials: true,
      url: "/api/user/friends",
    });
    return result.data;
  },

  // -------------------------------------------------------------

  // ------------------------- FOLLOW -----------------------------

  /**
   * @brief follow user
   * @param {String} fromUser - id of follower 
   * @param {String} toUser - id of followed user
   */
  sendFollowRequest: async function (fromUser, toUser) {
    console.log(
      "sending follow request from " + fromUser.username + " to user " + toUser.username
    );
    const result = await axios({
      method: "POST",
      data: {
        action: FOLLOW_REQUEST,
        fromUser: fromUser._id,
        toUser: toUser._id,
      },
      withCredentials: true,
      url: "/api/user/follow",
    });
    return result.data;
  },

  /**
   * @brief unfollow user
   * @param {String} fromUser - id of the unfollower
   * @param {String} toUser - id of the unfollowed
   */
  sendUnfollowRequest: async function (fromUser, toUser) {
    const result = await axios({
      method: "POST",
      data: {
        action: UNFOLLOW_REQUEST,
        fromUser: fromUser._id,
        toUser: toUser._id,
      },
      withCredentials: true,
      url: "/api/user/follow",
    });
    return result.data;
  },
  // -------------------------------------------------------------

  /**
   * Removes a notification with given id from current user
   * @param {*} id
   */
  deleteNotification: async function (id) {
    const result = await axios({
      method: "POST",
      data: { notificationId: id },
      url: "/api/notifications/deleteNotification",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * Temporary test function - sends a notification to your own user
   */
  pokeYourself: async function () {
    const result = await axios({
      method: "POST",
      url: "/api/test/selfPoke",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * Deletes all clearable notifications from current user
   */
  clearNotifications: async function () {
    const result = await axios({
      method: "POST",
      url: "/api/notifications/clearNotifications",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * @brief update users profile description
   * @param {*} userId - id of user
   * @param {*} data - new description text
   */
  updateUserShortDescription: async function (userId, data) {  
    const result = await axios({
      method: "POST",
      data: {
        userId: userId,
        text: data,
      },
      url: "/api/user/update_field",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * @brief update users interests
   * @param {String} userId - id of user
   * @param {String} data - list of interests
   */
  updateUserInterests: async function (userId, data) {
    const result = await axios({
      method: "POST",
      data: {
        userId: userId,
        interests: data,
      },
      url: "/api/user/update_interests",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * @brief check if user is online
   * @param {String} userId - id of user
   * @return {Boolean} true if user online, otherwise false
   */
  isUserOnline: async function (userId) {
    const result = await axios({
      method: "POST",
      data: {
        _id: userId
      },
      url: "/api/user/is_user_online",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * @brief get stream id of user
   * @param {String} userId - id of user
   * @return {streamId} stream id if user is streaming, otherwise undefined
   */
  getUserStreamId: async function (userId) {
    const result = await axios({
      method: "POST",
      data: {
        _id: userId
      },
      url: "http://localhost:4000/streams/getUserStream",
      withCredentials: true,
    });
    return result.data;
  },

};

export default userActions;
