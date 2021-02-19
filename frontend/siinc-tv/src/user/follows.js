import userActions from "./userActions";

const handleFollow=(myUser, otherUserName)=>{
    const fun = async() => {
        console.log("Attempting to follow")
        let status = await userActions.sendFollowRequest( myUser.username, otherUserName );
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

const handleUnfollow = (myUser, otherUserName) => {
    const fun = async() => {
        console.log("Unfollow")
        let status = await userActions.sendUnfollowRequest( myUser.username, otherUserName );
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

export const handleFollowAction=(myUser, otherUserName)=>{
    if( myUser == null ) {
        console.log("usercontext or provided user is null <handleFollowAction>");
        return;
    }

    if( myUser.username === otherUserName ) {
        console.log("cant follow/unfollow yourself! " + myUser.username + ", " + otherUserName);
        return;
    }
    if( myUser.followData.followingList.find(x=>x.userName==otherUserName) != undefined ) {
        handleUnfollow(myUser, otherUserName);                                         
        return;
    }
    handleFollow(myUser, otherUserName)
}

export const isFollowing = (myUser, otherUserName) => {
    if( myUser == null ) 
        return false;
    if( myUser.username == otherUserName ) 
        return false;
    if( myUser.followData.followingList.find(x=>x.userName==otherUserName) != undefined ) 
        return true;
    return false;
}