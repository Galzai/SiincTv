/**
 * This module is used to provide friend related notifications
 * @module FriendNotification
 * @category Backend
 */

const {User, NotificationData, Notification} = require("../models/user");
const {emitToUser} = require("../sockets/sockets")
const mongoose = require("mongoose");

// Use this as a real time updater rather than a notification system 

/**
 * send notification indicating a user received a friend request
 * @param {*} fromUser notification sender
 * @param {*} toUser notification receiver 
 */
exports.notifyReceivedFriendRequest = function(fromUser, toUser) {
   emitToUser(toUser._id, "receivedFriendRequest", {id: fromUser._id,
    name: fromUser.username})
}

/**
 * send notification indicating a user accepted a friend request
 * @param {*} fromUser notification sender ( accepted user )
 * @param {*} toUser notification receiver ( accepter user )
 */
exports.notifyFriendRequestAccepted = function(fromUser, toUser) {
   emitToUser(fromUser._id, "friendRequestAccepted", {id: toUser._id,
    name: toUser.username})
}

/**
 * send notification indicating a user declined a friend request
 * @param {*} fromUser notification sender ( declined used )
 * @param {*} toUser notification receiver ( declining user )
 */
exports.notifyFriendRequestDeclined = function(fromUser, toUser) {
    emitToUser(fromUser._id, "friendRequestDeclined", {id: toUser._id,
                                                       name: toUser.username})    
}

/**
 * send notification indicating a user unfriended a friend
 * @param {*} fromUser unfriending user
 * @param {*} toUser unfriended user
 */
exports.notifyUnfriendFriend = function(fromUser, toUser) {
    emitToUser(fromUser._id, "receivedUnfriend", {id: toUser._id,
        name: toUser.username})   
    emitToUser(toUser._id, "receivedUnfriend", {id: fromUser._id,
        name: fromUser.username})                              
         
}




