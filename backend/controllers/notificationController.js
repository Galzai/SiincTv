const {User, Notifications} = require("../models/user");
const NodeCache = require( "node-cache" );
const e = require("express");
const {emitReloadNotifications} = require("../sockets/sockets")
var ObjectID = require('mongodb').ObjectID;



function deleteNotification(userId, notificationId)
{
    if(notificationId == null)
    {
        console.log("Nah");
        return false;
    }
    console.log("id is", notificationId);
    console.log("id is", userId);
    User.updateOne(
        {_id:  new ObjectID(userId)},
        { $pull: { "notifications": { _id:  new ObjectID(notificationId)} } }
        ).then(err=>
           {
            console.log(err);
            emitReloadNotifications(userId);
           } 
        ); 
    return true;  
}
/**
 * @brief deletes as notification from a specific user
 *
 * @param {*} userId 
 * @param {*} notificationId 
 */
exports.deleteNotificationFromUser = function(userId, notificationId)
{
    return deleteNotification(userId, notificationId);
}
/**
 * @brief removes a notification from the current user with id if it exists
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteNotificationFromCurrentUser = function(req, res){
    const user = req.user;
    const notificationId = req.body.notificationId;
    console.log(notificationId);
    if(!user)
    {
        console.log("failed");
        return res.send("failed");  
    }
    const userId = req.user._id;
    if(deleteNotification(userId, notificationId))
    {
        res.send("success");
    }
    else
    {
        return res.send("failed");
    }
}

/**
 * @brief adds a notification to a user
 * @param {*} userId 
 * @param {*} notification 
 */
exports.addNotificationToUser = function(userId, notification){
    User.updateOne(
        {"_id": userId},
        { $push: { "notifications": notification} }
        ).then(obj=>
           {
            emitReloadNotifications(req.userId);
           } 
        );   
}
