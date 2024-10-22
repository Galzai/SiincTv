/**
 *T his controller is in charge of handling requests relating to users friend system
 * @module FriendsControler
 * @category Backend
 * @subcategory Controllers
 */

const {User, Notification} = require("../models/user");
var notification = require('../Notification/notification')
var notificationController = require('../controllers/notificationController')
const {emitReloadNotifications} = require("../sockets/sockets")


const SEND_FRIEND_REQUEST = 0;
const ANSWER_FRIEND_REQUEST = 1;
const UNFRIEND_REQUEST = 2;

function cmpIdsInList(list, user) {
    if (list.filter(function(e) { return e.memberId === user._id; }).length > 0) {
        return true;
    }
    return false;
}

function verifyUserFriendData(user) {
    if(!user || !user.friendsData || !user.friendsData.sentRequests ||
        !user.friendsData.receivedRequests || !user.friendsData.friendsList) {
            return false;
        }
    return true;
}

// temporary function - delete later.
function assignImage(user){
    if(!user) return "";
    if(user.image) return user.image;
    if(user.twitchData && user.twitchData.profile_image_url) return user.twitchData.profile_image_url;
    if(user.facebookData && user.facebookData.photos) return user.facebookData.photos[0].value;
    if(user.googleData && user.googleData.photos) return user.googleData.photos[0].value;
    return "";
}

/**
 * @brief handles friends related requests by delegating to appropriate methods/
 *        This function sends true if request was successfully processed, otherwise false.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.handleFriendsRequest = function(req, res){
    
    const fun = async() => {
        const action = req.body.action;
        console.log("Received friends request of type : " +  action);

        let status = false;

        if( action == SEND_FRIEND_REQUEST ) 
        {
            status = await handleSendFriendRequest( req );
        }
        else if( action == ANSWER_FRIEND_REQUEST ) 
        {
            status = await handleAnswerFriendRequest2( req );
        }
        else if( action == UNFRIEND_REQUEST)
        {
            status = await handleUnfriendRequest( req );
        }
        else 
        {
            console.log( "Unkown friends action type" );   
            status = false; 
        }
        return status;
    }
    fun().then( status => {res.send(status);} )
}

async function handleSendFriendRequest( req )
{
    let [fromUser, toUser] = await getUsersFromRequest( req );

    console.log("Handling sendFriendRequest from users : " + fromUser.username + ", " + toUser.username)

    if(!verifyUserFriendData(fromUser) || !verifyUserFriendData(toUser)) {
        console.log("Could not properly fetch fromUser or toUser from database")
    }

    // now check if fromUser already has toUser as friends or has pending request - verified only one side
      if( cmpIdsInList( fromUser.friendsData.friendsList, toUser ) || 
          cmpIdsInList( fromUser.friendsData.friendsList, toUser ) ) {
       /* console.log("Cannot send request to this user, you already sent a request or he is your friend");*/
        return false;
    }

    // now update fromUser and toUser data
    try {
        await User.updateOne( 
            { _id: fromUser._id },
            { $push: { "friendsData.sentRequests": {
                userId: toUser._id,
                username: toUser.username,
            } } }
        ).exec();

        await User.updateOne( 
            { _id: toUser._id },
            { $push: { "friendsData.receivedRequests": {
                userId: fromUser._id,
                username: fromUser.username 
            } } }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleSendFriendRequest>")
        console.log(error)
        return false;
    }

    // update the client that he got unfriended
    notification.notifyReceivedFriendRequest(fromUser, toUser)

    // send on screen notification to client 
    const notificationData = new Notification({
        type: "friendRequestReceived",
        clearable: false,
        data: {
            userId: fromUser._id,
            username: fromUser.username,
            userImage: assignImage(fromUser)
        }
    })
    notificationController.addNotificationToUser(toUser._id, notificationData, `Received friend request from ${fromUser.username}.` )    
    emitReloadNotifications(toUser._id, "");
    emitReloadNotifications(fromUser._id, "")

    return true;
    
}

async function handleAnswerFriendRequest2( req )
{
    let [fromUser, toUser] = await getUsersFromRequest( req );

    console.log("Handling handleAnswerFriendRequest from users : " + fromUser.username + ", " + toUser.username)

    if(!verifyUserFriendData(fromUser) || !verifyUserFriendData(toUser)) {
        console.log("Could not properly fetch fromUser or toUser from database")
    }

    if( cmpIdsInList( toUser.friendsData.friendsList, fromUser) ) {
        console.log("Cant accept/reject someone who is not in received requests list");
        return false;
    }

    // now update toUser and fromUser
    if( req.body.accepted ) {
        try {
           await User.updateOne( 
                { _id: fromUser._id },
                { $pull: { "friendsData.sentRequests": { userId: toUser._id } }, 
                  $push: { "friendsData.friendsList": {
                    value: toUser.username,
                    memberId: toUser._id,
                    youtubeId: toUser.youtubeId,
                    twitchId: toUser.twitchId,
                    displayName : toUser.username,
                    userImage : assignImage(toUser),
                    label: toUser.username,
                      /*
                    id: toUser._id,
                    username: toUser.username,*/
                }}}
            ).exec();
            
            await User.updateOne( 
                { _id: toUser._id },
                { $pull: { "friendsData.receivedRequests": { userId: fromUser._id } },  
                  $push: { "friendsData.friendsList": {
                    value: fromUser.username,
                    memberId: fromUser._id,
                    youtubeId: fromUser.youtubeId,
                    twitchId: fromUser.twitchId,
                    displayName : fromUser.username,
                    userImage : assignImage(fromUser),
                    label: fromUser.username,
                    /*id: fromUser._id,
                    username: fromUser.username,*/
                }} }
            ).exec();
        }
        catch (error) {
            console.log("error occured in : <handleAnswerFriendRequest>")
            console.log(error)
            return false;
        }

        // update the client that he got unfriended
        notification.notifyFriendRequestAccepted(fromUser, toUser)

        // send on screen notification that client got accepted
        const notificationData = new Notification({
            type: "friendRequestAccepted",
            clearable: true,
            data: {
                userId: toUser._id,
                username: toUser.username,
                userImage: assignImage(toUser)
            }
        })
        notificationController.addNotificationToUser(fromUser._id, notificationData, `${toUser.username} accepted your friend request.` )

    }
    else {
        try {
            await User.updateOne( 
                { _id: fromUser._id },
                { $pull: { "friendsData.sentRequests": { userId: toUser._id } } }
            ).exec();
    
            await User.updateOne( 
                { _id: toUser._id },
                { $pull: { "friendsData.receivedRequests": { userId: fromUser._id } } }
            ).exec();
        }
        catch (error) {
            console.log("error occured in : <handleAnswerFriendRequest>")
            console.log(error)
            return false;
        }

        // update the client that he got unfriended
        notification.notifyFriendRequestDeclined(fromUser, toUser)

    }

    emitReloadNotifications(toUser._id, "");
    emitReloadNotifications(fromUser._id, "")

    return true;       
}

async function handleUnfriendRequest( req )
{
    let [fromUser, toUser] = await getUsersFromRequest( req );

    console.log("Handling handleUnfriendRequest from users : " + fromUser.username + ", " + toUser.username)
    //console.log(fromUser)
    //console.log(toUser)

    if(!verifyUserFriendData(fromUser) || !verifyUserFriendData(toUser)) {
        console.log("Could not properly fetch fromUser or toUser from database")
    }

    // verify that fromUser has toUser as a friend - verified only one side
    if( !(fromUser.friendsData.friendsList.find(el=>toString(el.memberId)==toString(toUser._id)) != undefined) ) {
        console.log("cant remove someone who is not a friend");
        return false;
    }

    // update fromUser and toUser
    try {
        await User.updateOne( 
            { _id: fromUser._id },
            { $pull: { "friendsData.friendsList": { memberId: toUser._id } } }
        ).exec();

        await User.updateOne( 
            { _id: toUser._id },
            { $pull: { "friendsData.friendsList": { memberId: fromUser._id } } }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleUnfriendRequest>")
        console.log(error)
        return false;
    }

    // update the client that he got unfriended
    notification.notifyUnfriendFriend(fromUser, toUser)

    emitReloadNotifications(toUser._id, "");
    emitReloadNotifications(fromUser._id, "")

    return true;
}

async function getUsersFromRequest( req ) 
{
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