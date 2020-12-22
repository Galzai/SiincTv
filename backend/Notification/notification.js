const {User} = require("../models/user");
const {emitToUser} = require("../sockets/sockets")

// send notification to the receiver of the request with id and username info of the sender
exports.notifyReceivedFriendRequest = function(fromUser, toUser) {
    emitToUser(toUser._id, "receivedFriendRequest", {id: fromUser._id,
                                                     name: fromUser.username})
}

// send notification to the sender of the request with id and username of the accepter
exports.notifyFriendRequestAccepted = function(fromUser, toUser) {
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
}



