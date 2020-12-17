const {User} = require("../models/user");

const SEND_FRIEND_REQUEST = 0;
const ANSWER_FRIEND_REQUEST = 1;
const UNFRIEND_REQUEST = 2;

/**
 * @brief handles friends related requests by delegating to appropriate methods/
 *        This function sends true if request was successfully processed, otherwise false.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.handleFriendsRequest = function(req, res){
    
    const action = req.action;
    console.log("Received friends request of type : " +  action);

    let status = false;

    if( action == SEND_FRIEND_REQUEST ) 
    {
        status = handleSendFriendRequest( req );
    }
    else if( action == ANSWER_FRIEND_REQUEST ) 
    {
        status = handleAnswerFriendRequest( req );
    }
    else if( action == UNFRIEND_REQUEST)
    {
        status = handleUnfriendRequest( req );
    }
    else 
    {
        console.log( "Unkown friends action type" );   
        status = false; 
    }

    res.send(status);

}

async function handleSendFriendRequest( req )
{
    let [fromUser, toUser] = getUsersFromRequest( req );

    // now check if fromUser already has toUser as friends or has pending request - verified only one side
    if( fromUser.friendsData.friendsList.includes( {userId:toUser._id, username:toUser.username} ) || 
           fromUser.friendsData.sentRequests.includes( {userId:toUser._id, username:toUser.username} ) ) {
        console.log("Cannot send request to this user, you already sent a request or he is your friend");
        return false;
    }

    // now update fromUser and toUser data
    try {
        await User.updateOne( 
            { name: fromUser },
            { $push: { "friendsData.$.sentRequests": toUser } }
        ).exec();

        await User.updateOne( 
            { name: toUser },
            { $push: { "friendsData.$.receivedRequests": fromUser } }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleSendFriendRequest>")
        return false;
    }
    
    return true;


/*
    User.findOne({username: req.body.toUser},
        function(err, doc){
            if (err) {
                console.log("error occured in : <handleSendFriendRequest>");
            }
            // user exists
            if (doc)  {
                toUser = doc    
            }
            else  {
                console.log("Couldnt fine user : <handleSendFriendRequest>")
            }
    });
*/
    
}

async function handleAnswerFriendRequest( req )
{
    let [fromUser, toUser] = getUsersFromRequest( req );
    
    // verify that toUser has a friend request from fromUser - verified only one side
    if( !toUser.friendsData.receivedRequests.includes( {userId:fromUser._id, username:fromUser.username} ) ) {
        console.log("Cant accept/reject someone who is not in received requests list");
        return false;
    }

    

    // now update toUser and fromUser
    if( req.accepted ) {
        try {
            await User.updateOne( 
                { name: fromUser },
                { $pull: { "friendsData.$.sentRequests": toUser }, $push: { "friendsData.$.friendsList": toUser}}
            ).exec();
    
            await User.updateOne( 
                { name: toUser },
                { $pull: { "friendsData.$.receivedRequests": fromUser }, $push: { "friendsData.$.friendsList": fromUser} }
            ).exec();
        }
        catch (error) {
            console.log("error occured in : <handleSendFriendRequest>")
            return false;
        }
    }
    else {
        try {
            await User.updateOne( 
                { name: fromUser },
                { $pull: { "friendsData.$.sentRequests": toUser } }
            ).exec();
    
            await User.updateOne( 
                { name: toUser },
                { $pull: { "friendsData.$.receivedRequests": fromUser } }
            ).exec();
        }
        catch (error) {
            console.log("error occured in : <handleSendFriendRequest>")
            return false;
        }
    }

    return true;       
}

async function handleUnfriendRequest( req )
{
    let [fromUser, toUser] = getUsersFromRequest( req );

    // verify that fromUser has toUser as a friend - verified only one side
    if( !fromUser.friendsData.friendsList.includes( {userId:toUser._id, username:toUser.username} ) ) {
        console.log("cant remove someone who is not a friend");
        return false;
    }

    // update fromUser and toUser
    try {
        await User.updateOne( 
            { name: fromUser },
            { $pull: { "friendsData.$.friendsList": toUser}}
        ).exec();

        await User.updateOne( 
            { name: toUser },
            { $pull: { "friendsData.$.friendsList": fromUser} }
        ).exec();
    }
    catch (error) {
        console.log("error occured in : <handleSendFriendRequest>")
        return false;
    }

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
            console.log("error occured in : <handleSendFriendRequest>")
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