const {User, Notification} = require("../models/user");
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
        { $pull: { notifications: { _id:  new ObjectID(notificationId)} } }
        ).then(err=>
           {
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

function AddNotification(userId, notification, popupText)
{
    User.updateOne(
        {_id: new ObjectID(userId)},
        { $push: { "notifications": notification} }
        ).then(obj=>
           {
            emitReloadNotifications(userId, popupText);
           } 
        );  
}
/**
 * @brief adds a notification to a user
 * @param {*} userId 
 * @param {*} notification 
 */
exports.addNotificationToUser = function(userId, notification, popupText){
    AddNotification(userId, notification, popupText);
}

/**
 * @brief clears all clearable notifications from a user
 * @param {*} req 
 * @param {*} res 
 */
exports.clearAllClearableNotifications = function(req, res){
    const user = req.user;
    if(!user)
    {
        return res.send("failed");  
    }
    const userId = req.user._id;
    console.log("id is", userId);
    User.updateOne(
        {_id:  new ObjectID(userId)},
        { $pull: { "notifications": { clearable: true} } }
        ).then(err=>
           {
            emitReloadNotifications(userId);
           } 
        ); 
    return true;  
}

// TEST FUNCTION - to be removed
exports.pokeYourself = function(req, res){
    const user = req.user;
    if(!user)
    {
        return res.send("failed");  
    }
    const userId = req.user._id;
    const newPoke = new Notification({
        type: "poke",
        clearable: true,
    });
    if(AddNotification(userId, newPoke, "You just got poked!"))
    {
        res.send("success");
    }
    else
    {
        return res.send("failed");
    }
}


