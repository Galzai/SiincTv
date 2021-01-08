const {User, NotificationData, Notification} = require("../models/user");
const {emitToUser} = require("../sockets/sockets")
const mongoose = require("mongoose");


// Use this as a real time updater rather than a notification system 
// TODO: rename stuff here later if got time

/*
async function insertReceivedFriendRequestNotification(fromUser, toUser) {
    try {
        console.log("Attempting to add notification to user : " + toUser.username + " notification is : ")
        await User.updateOne( 
            { username: toUser.username },
            { $push: { "notifications": {
                _id: new mongoose.Types.ObjectId(),
                type: "friendRequest",
                data: {
                    username: fromUser.username,
                    id: toString(fromUser.id),
                }
            }}}
        ).exec();
        return true;
    }
    catch(error) {
        console.log("Could not insert new friend req notif");
        console.log(error);
        return false;
    }
}

async function insertAcceptedFriendRequestNotification(fromUser, toUser) {
    try {
        console.log("Attempting to add notification to user : " + fromUser.username + " notification is : ")
        await User.updateOne( 
            { username: fromUser.username },
            { $push: { "notifications": {
                _id: new mongoose.Types.ObjectId(),
                type: "friendRequestAccepted",
                data: {
                    username: fromUser.username,
                    id: toString(fromUser.id),
                    
                }
            }}}
        ).exec();
        return true;
    }
    catch(error) {
        console.log("Could not insert new friend req notif");
        console.log(error);
        return false;
    }
}
*/

// send notification to the receiver of the request with id and username info of the sender
exports.notifyReceivedFriendRequest = function(fromUser, toUser) {
    /*
    insertReceivedFriendRequestNotification(fromUser, toUser)
    .then((res) => 
    {
        emitToUser(toUser._id, "receivedFriendRequest", {id: fromUser._id,
            name: fromUser.username})
    });
    */
   emitToUser(toUser._id, "receivedFriendRequest", {id: fromUser._id,
    name: fromUser.username})
}

// send notification to the sender of the request with id and username of the accepter
exports.notifyFriendRequestAccepted = function(fromUser, toUser) {
    /*
    insertAcceptedFriendRequestNotification(fromUser, toUser)
    .then((res) => 
    {
        emitToUser(fromUser._id, "friendRequestAccepted", {id: toUser._id,
            name: toUser.username})
    })
    */
   emitToUser(fromUser._id, "friendRequestAccepted", {id: toUser._id,
    name: toUser.username})
}

// send notification to the sender of the request with id and username of decliner
exports.notifyFriendRequestDeclined = function(fromUser, toUser) {
    emitToUser(fromUser._id, "friendRequestDeclined", {id: toUser._id,
                                                       name: toUser.username})    
}

// send notification to the unfriended with id and username of the unfriending user
exports.notifyUnfriendFriend = function(fromUser, toUser) {
    emitToUser(fromUser._id, "receivedUnfriend", {id: toUser._id,
        name: toUser.username})   
    emitToUser(toUser._id, "receivedUnfriend", {id: fromUser._id,
        name: fromUser.username})                              
         
}




