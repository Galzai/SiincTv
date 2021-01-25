/**
 * This controller is in charge of handling actions relating to notifications
 */
const { User, Notification } = require("../models/user");
const { emitReloadNotifications } = require("../sockets/sockets");
var ObjectID = require("mongodb").ObjectID;

/**
 * Delets a notification with given id from given user
 * @param {*} userId user id
 * @param {*} notificationId notification id
 */
function deleteNotification(userId, notificationId) {
  if (notificationId == null) {
    return false;
  }
  User.updateOne(
    { _id: new ObjectID(userId) },
    { $pull: { notifications: { _id: new ObjectID(notificationId) } } }
  ).then((response) => {
    emitReloadNotifications(userId);
  });
  return true;
}
/**
* Exposes deletion API to other part of the backend only
 */
exports.deleteNotificationFromUser = function (userId, notificationId) {
  return deleteNotification(userId, notificationId);
};

/**
 * @brief removes a notification from the current user that is logged in to the session
 */
exports.deleteNotificationFromCurrentUser = function (req, res) {
  const user = req.user;
  const notificationId = req.body.notificationId;
  console.log(notificationId);
  if (!user) {
    console.log("failed");
    return res.send("failed");
  }
  const userId = req.user._id;
  if (deleteNotification(userId, notificationId)) {
    res.send("success");
  } else {
    return res.send("failed");
  }
};

/**
 * Adds a new notification to a specified user with an optional popup
 * 
 * @param {*} userId id of the user to send to
 * @param {*} notification notification object
 * @param {*} popupText optional text to pop up on the user screen
 */
function AddNotification(userId, notification, popupText) {
  User.updateOne(
    { _id: new ObjectID(userId) },
    { $push: { notifications: notification } }
  ).then((obj) => {
    emitReloadNotifications(userId, popupText);
  });
}

/**
 * Exposes the add notification function to other 
 */
exports.addNotificationToUser = function (userId, notification, popupText) {
  AddNotification(userId, notification, popupText);
};

/**
 * @brief clears all clearable notifications from the currently signed  user
 */
exports.clearAllClearableNotifications = function (req, res) {
  const user = req.user;
  if (!user) {
    return res.send("failed");
  }
  const userId = req.user._id;
  console.log("id is", userId);
  User.updateOne(
    { _id: new ObjectID(userId) },
    { $pull: { notifications: { clearable: true } } }
  ).then((err) => {
    emitReloadNotifications(userId);
  });
  return true;
};

// TEST FUNCTION - to be removed
exports.pokeYourself = function (req, res) {
  const user = req.user;
  if (!user) {
    return res.send("failed");
  }
  const userId = req.user._id;
  const newPoke = new Notification({
    type: "poke",
    clearable: true,
  });
  if (AddNotification(userId, newPoke, "You just got poked!")) {
    res.send("success");
  } else {
    return res.send("failed");
  }
};
