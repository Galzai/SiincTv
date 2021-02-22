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
      url: "http://localhost:4000/signup",
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
      url: "http://localhost:4000/signin",
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
      url: "http://localhost:4000/signout",
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
      url: "http://localhost:4000/user",
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
      url: "http://localhost:4000/userdata",
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
      url: "http://localhost:4000/check_username",
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
      url: "http://localhost:4000/search/users",
    });
    return result.data;
  },

  /**
   * Sets the redirect URI for authentication calls to be the current URI
   */
  setRedirectURL: async function () {
    const result = await axios({
      method: "POST",
      url: "http://localhost:4000/auth/setRedirectUrl",
    });
    return result.data;
  },

  /**
   * Prompts to authenticate with twitch
   */
  authenicateTwitch: function () {
    window.location.assign("http://localhost:4000/auth/twitch/");
  },

  /**
   * Prompts to authenticate with google
   */
  authenicateGoogle: function () {
    window.location.assign("http://localhost:4000/auth/google/");
  },

  /**
   * Prompts to authenticate with facebook
   */
  authenicateFacebook: function () {
    window.location.assign("http://localhost:4000/auth/facebook/");
  },

  // ------------------------- FRIENDS -----------------------------

  // String:fromUser(id) - friend request sender
  // String:toUser(id)   - friend request receiver
  sendFriendRequest: async function (fromUser, toUser) {
    const result = await axios({
      method: "POST",
      data: {
        action: SEND_FRIEND_REQUEST,
        fromUser: fromUser,
        toUser: toUser,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/friends",
    });
    return result.data;
  },

  // String:fromUser - the sender of the request which is now being responded to (id)
  // String:toUser   - the one who responds to the requests (id)
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
      url: "http://localhost:4000/user/friends",
    });
    return result.data;
  },

  // String:fromUser(id) - the one who unfriends
  // String:toUser(id)   - the one being unfriended
  unfriendFriendRequest: async function (fromUser, toUser) {
    const result = await axios({
      method: "POST",
      data: {
        action: UNFRIEND_REQUEST,
        fromUser: fromUser,
        toUser: toUser,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/friends",
    });
    return result.data;
  },

  // -------------------------------------------------------------

  // ------------------------- FOLLOW -----------------------------

  // String:fromUser - the follower
  // String:toUser   - who the follower follows
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
      url: "http://localhost:4000/user/follow",
    });
    return result.data;
  },

  // String:fromUser - the follower
  // String:toUser   - who the follower follows
  sendUnfollowRequest: async function (fromUser, toUser) {
    const result = await axios({
      method: "POST",
      data: {
        action: UNFOLLOW_REQUEST,
        fromUser: fromUser._id,
        toUser: toUser._id,
      },
      withCredentials: true,
      url: "http://localhost:4000/user/follow",
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
      url: "http://localhost:4000/notifications/deleteNotification",
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
      url: "http://localhost:4000/test/selfPoke",
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
      url: "http://localhost:4000/notifications/clearNotifications",
      withCredentials: true,
    });
    return result.data;
  },

  updateUserShortDescription: async function (userId, data) {  
    const result = await axios({
      method: "POST",
      data: {
        userId: userId,
        text: data,
      },
      url: "http://localhost:4000/user/update_field",
      withCredentials: true,
    });
    return result.data;
  },

  updateUserInterests: async function (userId, data) {
    const result = await axios({
      method: "POST",
      data: {
        userId: userId,
        interests: data,
      },
      url: "http://localhost:4000/user/update_interests",
      withCredentials: true,
    });
    return result.data;
  },

  isUserOnline: async function (userId) {
    const result = await axios({
      method: "POST",
      data: {
        _id: userId
      },
      url: "http://localhost:4000/user/is_user_online",
      withCredentials: true,
    });
    return result.data;
  },

};

export default userActions;
