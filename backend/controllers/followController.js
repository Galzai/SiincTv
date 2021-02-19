const {User} = require("../models/user");
var notification = require('../Notification/notification')
var notificationController = require('../controllers/notificationController')
const {Notification} = require("../models/user");
const {emitReloadNotifications} = require("../sockets/sockets")

const FOLLOW_REQUEST = 0;
const UNFOLLOW_REQUEST = 1;

// temporary function - delete later.
function assignImage(user){
    if(!user) return "";
    if(user.image) return user.image;
    if(user.twitchData && user.twitchData.profile_image_url) return user.twitchData.profile_image_url;
    if(user.facebookData && user.facebookData.photos) return user.facebookData.photos[0].value;
    if(user.googleData && user.googleData.photos) return user.googleData.photos[0].value;
    return "";
}

function cmpIdsInList(list, user) {
    if (list.filter(function(e) { return String(e.userId) === String(user._id); }).length > 0) {
        return true;
    }
    return false;
}

/**
 * @brief handles follow related requests by delegating to appropriate methods/
 *        This function sends true if request was successfully processed, otherwise false.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.handleFollowRequest = function(req, res){   
    const fun = async() => {
        const action = req.body.action;
        console.log("Received follow request of type : " +  action);

        let status = false;

        if( action == FOLLOW_REQUEST ) 
        {
            status = await handleFollowRequest( req );
        }
        else if( action == UNFOLLOW_REQUEST ) 
        {
            status = await handleUnfollowRequest( req );
        }
        else 
        {
            console.log( "Unkown follow action type" );   
            status = false; 
        }
        return status;
    }
    fun().then( status => {res.send(status);} )
}

async function handleFollowRequest( req )
{
    let [fromUser, toUser] = await getUsersFromRequest( req );

    console.log("Handling handleAnswerFriendRequest from users : " + fromUser.username + ", " + toUser.username)

    if( cmpIdsInList( toUser.followData.followersList, fromUser) ) {
        console.log("Cant follow someone you already follow");
        return false;
    }

    // now update toUser and fromUser
    try {
       await User.updateOne( 
            { _id: fromUser._id },
            { $push: { "followData.followingList": {
                userId: toUser._id,
                youtubeId: toUser.youtubeId,
                twitchId: toUser.twitchId,
                userName : toUser.username,
                userImage : assignImage(toUser)
            }}}
        ).exec();
        
        await User.updateOne( 
            { _id: toUser._id },
            { $push: { "followData.followersList": {
                userId: fromUser._id,
                youtubeId: fromUser.youtubeId,
                twitchId: fromUser.twitchId,
                userName : fromUser.username,
                userImage : assignImage(fromUser)    
            }} }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleFollowRequest>")
        console.log(error)
        return false;
    }

    // send on screen notification that client got accepted
    const notificationData = new Notification({
        type: "newFollower",
        clearable: true,
        data: {
            userId: fromUser._id,
            username: fromUser.username,
            userImage: assignImage(fromUser)
        }
    })
    notificationController.addNotificationToUser(toUser._id, notificationData, `${fromUser.username} is now following you!.` )

    emitReloadNotifications(toUser._id, "");
    emitReloadNotifications(fromUser._id, "")

    return true;       
}

async function handleUnfollowRequest( req )
{
    let [fromUser, toUser] = await getUsersFromRequest( req );

    console.log("Handling handleUnfollowRequest from users : " + fromUser.username + ", " + toUser.username)

    if( !cmpIdsInList( toUser.followData.followersList, fromUser) ) {
        console.log("cant unfollow someone who you do not follow");
        return false;
    }

    // update fromUser and toUser
    try {
        await User.updateOne( 
            { _id: fromUser._id },
            { $pull: { "followData.followingList": { userId: toUser._id } } }
        ).exec();

        await User.updateOne( 
            { _id: toUser._id },
            { $pull: { "followData.followersList": { userId: fromUser._id } } }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleUnfollowRequest>")
        console.log(error)
        return false;
    }

    emitReloadNotifications(toUser._id, "");
    emitReloadNotifications(fromUser._id, "")

    return true;
}

async function getUsersFromRequest( req ) 
{

        console.log(req.body);
        // get sender user
        let fromUser = null;
        let toUser = null;
        try {
            fromUser = await User.findOne({_id: req.body.fromUser}).exec();
        }
        catch (error) {
            console.log("error occured in : <handleUnfriendRequest>")
            return [fromUser, toUser];
        }
    
        // no need to call second query if one is bad
        if( fromUser == null ) {
            return [fromUser, toUser];
        }
    
        // get receiver user
        try {
            toUser = await User.findOne({_id: req.body.toUser}).exec();
        }
        catch (error) {
            console.log("error occured in : <handleSendFriendRequest>")
            return [fromUser, toUser];
        }

        return [fromUser, toUser];
    
}

/**
 * @brief post notifications to all followers
 * @param {*} userId 
 * @param {*} notification 
 */
exports.addNotificationToFollowersOf = function(userId, notification, popupText){
    User.findById(userId)
    .then(obj=>
    {
        obj.followData.followersList.forEach(function(follower){
            notificationController.addNotificationToUser( follower.userId, notification, popupText)
        });
    })
    .catch(error=>
    {
        console.log("error in addNotificationToFollowersOf : ")
        console.log(error)
    })
}