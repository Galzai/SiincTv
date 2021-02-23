/**
 * This module provides ability to send / receive / respond to friend requests
 * between users
 * @module Friends
 * @category Frontend
 * @subcategory Social
 */

import userActions from "./userActions";

const handleAddFriends=(myUser, otherUserData)=>{
    const fun = async() => {
        console.log("Adding friend")
        if( String(otherUserData.userId) === String(myUser._id) ) {
            console.log("Cant add yourself")
            return;
        }
        let status = await userActions.sendFriendRequest( myUser._id, otherUserData.userId );
        if( !status ) {
            console.log("An error occured while adding friend")
            return false;
        }
        
        // update user context
        //await userContext.refreshUserData();

        // update friends data of this profile
        return true;
    }
    fun().then(ret => {
        console.log("Finished running add friend funciton")
    })
}

const handleUnfriend = (myUser, otherUserData) => {
    const fun = async() => {
        console.log("Unfriending friend")
        if( String(otherUserData.userId) === String(myUser._id) ) {
            console.log("Cant unfriend yourself")
            return;
        }
        let status = await userActions.unfriendFriendRequest( myUser._id, otherUserData.userId );
        if( !status ) {
            console.log("An error occured while unfriending")
            return false;
        }

        // update user context
        //await userContext.refreshUserData();

        return true;
    }
    fun().then(ret => {
        console.log("Finished running unfriend funciton")
    })       
}

const handleAcceptFriend = (myUser, otherUserData) => {
    const fun = async() => {
        console.log("Accepting friend")
        if( String(otherUserData.userId) === String(myUser._id) ) {
            console.log("Cant accpet yourself")
            return;
        }
        let status = await userActions.answerFriendRequest( otherUserData.userId, myUser._id, true );
        if( !status ) {
            console.log("An error occured while accepting friend")
            return false;
        }

        // update user context
        //await userContext.refreshUserData();

        return true;
    }
    fun().then(ret => {
        console.log("Finished running accept friend funciton")
    })       
}

const handleRejectFriend = (myUser, otherUserData) => {
    const fun = async() => {
        console.log("Rejecting friend")
        if( String(otherUserData.userId) === String(myUser._id) ) {
            console.log("Cant reject yourself")
            return;
        }
        let status = await userActions.answerFriendRequest( otherUserData.userId, myUser._id, false );
        if( !status ) {
            console.log("An error occured while rejecting friend")
            return false;
        }

        // update user context
        //await userContext.refreshUserData();

        return true;
    }
    fun().then(ret => {
        console.log("Finished running accept friend funciton")
    })       
}

/**
 * @brief execute friend action based on current friend relationship of myUser and otherUser
 * @param {userData} myUser - user object of first user
 * @param {userData} otherUserData  - user object of second user
 * @category Frontend
 * @subcategory Social
 */
export const handleFriendAction=(myUser, otherUserData)=>{
    if( myUser === null || otherUserData === null ) {
        console.log("usercontext or provided user is null <handleFriendAction>");
        return;
    }
    if( String(myUser._id) === String(otherUserData.userId) ) {
        console.log("It's you man" + myUser.username + ", " + otherUserData.username);
        return;
    }
    if( myUser.friendsData.friendsList &&
        myUser.friendsData.friendsList.find(x=>String(x.memberId)===String(otherUserData.userId)) !== undefined ) {
        handleUnfriend(myUser, otherUserData);                                         
        return;
    }
    if( myUser.friendsData.sentRequests &&
        myUser.friendsData.sentRequests.find(x=>String(x.userId)===String(otherUserData.userId)) !== undefined ) {
        console.log("unimplemented - maybe cancell request");
        return;
    }
    if( myUser.friendsData.receivedRequests &&
        myUser.friendsData.receivedRequests.find(x=>String(x.userId)===String(otherUserData.userId)) !== undefined ) {
        handleAcceptFriend(myUser, otherUserData);
        return;
    }
    handleAddFriends(myUser, otherUserData)
}

/**
 * @brief reject friend request
 * @param {userData} myUser - rejected user 
 * @param {userData} otherUserData  - rejecting user
 * @category Frontend
 * @subcategory Social
 */
export const handleFriendActionRejectTemp=(myUser, otherUserData)=>{
    handleRejectFriend(myUser, otherUserData);
    return;
}

/**
 * @brief get current friendship status between two users
 * @param {userData} myUser - first user object
 * @param {userData} otherUserData  - second user object
 * @category Frontend
 * @subcategory Social
 */
export const getFriendState = (myUser, otherUserData) => {
    if( myUser === null || otherUserData === null ) 
        return "NONE";

    if( String(myUser._id) === String(otherUserData.userId) ) 
        return "NONE";
    
    if( myUser.friendsData.friendsList &&
        myUser.friendsData.friendsList.find(x=>String(x.memberId)===String(otherUserData.userId)) !== undefined ) 
        return "UNFRIEND";

    if( myUser.friendsData.sentRequests &&
        myUser.friendsData.sentRequests.find(x=>String(x.userId)===String(otherUserData.userId)) !== undefined ) 
        return "PENDING";    
    
    if( myUser.friendsData.receivedRequests &&
        myUser.friendsData.receivedRequests.find(x=>String(x.userId)===String(otherUserData.userId)) !== undefined ) 
        return "ACCEPT";
        
     return "NONE"
}