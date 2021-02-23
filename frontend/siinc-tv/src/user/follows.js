/**
 * This module provides the ability to follow other users
 * 
 * @module Follow
 * @category Frontend
 * @subcategory Social
 */

import userActions from "./userActions";

const handleFollow=(myUser, otherUser)=>{
    const fun = async() => {
        console.log("Attempting to follow")
        let status = await userActions.sendFollowRequest( myUser, otherUser );
        if( !status ) {
            console.log("An error occured while following")
            return false;
        }

        return true;
    }
    fun().then(ret => {
        console.log("Finished running follow funciton")
    })
}

const handleUnfollow = (myUser, otherUser) => {
    const fun = async() => {
        console.log("Unfollow")
        let status = await userActions.sendUnfollowRequest( myUser, otherUser );
        if( !status ) {
            console.log("An error occured while unfollowing")
            return false;
        }

        return true;
    }
    fun().then(ret => {
        console.log("Finished running unfollow funciton")
    })       
}

/**
 * @brief execute follow action based current follow relationship between both users
 * @param {*} myUser - action initiator ( follow / unfollow )
 * @param {*} otherUser - other user
 * @category Frontend
 * @subcategory Social
 */
export const handleFollowAction=(myUser, otherUser)=>{
    if( myUser === null || otherUser === null ) {
        console.log("usercontext or provided user is null <handleFollowAction>");
        return;
    }

    if( String(myUser._id) === String(otherUser._id) ) {
        console.log("cant follow/unfollow yourself! " + myUser.username + ", " + otherUser.username);
        return;
    }
    if( myUser.followData.followingList &&
        myUser.followData.followingList.find(x=>String(x.userId)===String(otherUser._id)) !== undefined ) {
        handleUnfollow(myUser, otherUser);                                         
        return;
    }
    handleFollow(myUser, otherUser)
}

/**
 * @brief follow status between myUser and otherUser
 * @param {*} myUser - following / not following user
 * @param {*} otherUser - follower / not followed user
 * @return {Boolean} true if myUser follows otherUser, otherwise false
 * @category Frontend
 * @subcategory Social
 */
export const isFollowing = (myUser, otherUser) => {
    if( myUser === null || otherUser === null ) 
        return false;
    if( String(myUser._id) === String(otherUser._id) ) 
        return false;
    if( myUser.followData.followingList &&
        myUser.followData.followingList.find(x=>String(x.userId)===String(otherUser._id)) !== undefined ) 
        return true;
    return false;
}