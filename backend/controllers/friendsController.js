// temporary
// ======================

const {User} = require("../models/user");
var notification = require('../Notification/notification')


const SEND_FRIEND_REQUEST = 0;
const ANSWER_FRIEND_REQUEST = 1;
const UNFRIEND_REQUEST = 2;

function cmpIdsInList(list, user) {
    if (list.filter(function(e) { return e.memberId === user._id; }).length > 0) {
        return true;
    }
    return false;
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
    //console.log(fromUser)
    //console.log(toUser)

    // now check if fromUser already has toUser as friends or has pending request - verified only one side
    /*if( fromUser.friendsData.friendsList.find(el=>toString(el.memberId)===toString(toUser._id)) != undefined || 
           fromUser.friendsData.sentRequests.find(el=>toString(el.memberId)===toString(toUser._id)) != undefined ) */
      if( cmpIdsInList( fromUser.friendsData.friendsList, toUser ) || 
          cmpIdsInList( fromUser.friendsData.friendsList, toUser ) ) {
        console.log("Cannot send request to this user, you already sent a request or he is your friend");
        console.log(fromUser.friendsData.friendsList.find(el=>toString(el.memberId)===toString(toUser._id)))
        console.log(fromUser.friendsData.sentRequests.find(el=>toString(el.memberId)===toString(toUser._id)))
        console.log(fromUser.friendsData.friendsList)
        console.log(fromUser.friendsData.sentRequests)
        console.log(toUser._id)
        console.log("Printing users : ")
        console.log(fromUser)
        console.log(toUser)
        console.log("Print friends list")
        return false;
    }

    // now update fromUser and toUser data
    try {
        await User.updateOne( 
            { username: fromUser.username },
            { $push: { "friendsData.sentRequests": {
                id: toUser._id,
                username: toUser.username,
            } } }
        ).exec();

        await User.updateOne( 
            { username: toUser.username },
            { $push: { "friendsData.receivedRequests": {
                id: fromUser._id,
                username: fromUser.username 
            } } }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleSendFriendRequest>")
        console.log(error)
        return false;
    }

    notification.notifyReceivedFriendRequest(fromUser, toUser)

    return true;
    
}

async function handleAnswerFriendRequest2( req )
{
    let [fromUser, toUser] = await getUsersFromRequest( req );

    console.log("Handling handleAnswerFriendRequest from users : " + fromUser.username + ", " + toUser.username)
    //console.log(fromUser)
    //console.log(toUser)

    // verify that toUser has a friend request from fromUser - verified only one side
    //if( !(toUser.friendsData.receivedRequests.find(el=>toString(el.id)==toString(fromUser._id)) != undefined) ) {
    if( cmpIdsInList( toUser.friendsData.friendsList, fromUser) ) {
        console.log("Cant accept/reject someone who is not in received requests list");
        return false;
    }

    // now update toUser and fromUser
    if( req.body.accepted ) {
        try {
           await User.updateOne( 
                { username: fromUser.username },
                { $pull: { "friendsData.sentRequests": { id: toUser._id } }, 
                  $push: { "friendsData.friendsList": {
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
                { username: toUser.username },
                { $pull: { "friendsData.receivedRequests": { id: fromUser._id } },  
                  $push: { "friendsData.friendsList": {
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

        notification.notifyFriendRequestAccepted(fromUser, toUser)

    }
    else {
        try {
            await User.updateOne( 
                { username: fromUser },
                { $pull: { "friendsData.sentRequests": { id: toUser._id } } }
            ).exec();
    
            await User.updateOne( 
                { username: toUser },
                { $pull: { "friendsData.receivedRequests": { id: fromUser._id } } }
            ).exec();
        }
        catch (error) {
            console.log("error occured in : <handleAnswerFriendRequest>")
            return false;
        }

        
        notification.notifyFriendRequestDeclined(fromUser, toUser)

    }

    return true;       
}

async function handleUnfriendRequest( req )
{
    let [fromUser, toUser] = await getUsersFromRequest( req );

    console.log("Handling handleUnfriendRequest from users : " + fromUser.username + ", " + toUser.username)
    console.log(fromUser)
    console.log(toUser)

    // verify that fromUser has toUser as a friend - verified only one side
    if( !(fromUser.friendsData.friendsList.find(el=>toString(el.memberId)==toString(toUser._id)) != undefined) ) {
        console.log("cant remove someone who is not a friend");
        return false;
    }

    // update fromUser and toUser
    try {
        await User.updateOne( 
            { username: fromUser.username },
            { $pull: { "friendsData.friendsList": { memberId: toUser._id } } }
        ).exec();

        await User.updateOne( 
            { username: toUser.username },
            { $pull: { "friendsData.friendsList": { memberId: fromUser._id } } }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleUnfriendRequest>")
        console.log(error)
        return false;
    }

    notification.notifyUnfriendFriend(fromUser, toUser)

    return true;
}

async function getUsersFromRequest( req ) 
{
        // get sender user
        let fromUser = null;
        let toUser = null;
        try {
            fromUser = await User.findOne({username: req.body.fromUser}).exec();
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
            toUser = await User.findOne({username: req.body.toUser}).exec();
        }
        catch (error) {
            console.log("error occured in : <handleSendFriendRequest>")
            return [fromUser, toUser];
        }

        return [fromUser, toUser];
    
}