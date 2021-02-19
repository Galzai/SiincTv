import userActions from "./userActions";




const handleAddFriends=(myUser, otherUserName)=>{
    const fun = async() => {
        console.log("Adding friend")
        if( otherUserName == myUser.username ) {
            console.log("Cant add yourself")
            return;
        }
        let status = await userActions.sendFriendRequest( myUser.username, otherUserName );
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

const handleUnfriend = (myUser, otherUserName) => {
    const fun = async() => {
        console.log("Unfriending friend")
        if( otherUserName == myUser.username ) {
            console.log("Cant unfriend yourself")
            return;
        }
        let status = await userActions.unfriendFriendRequest( myUser.username, otherUserName );
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

const handleAcceptFriend = (myUser, otherUserName) => {
    const fun = async() => {
        console.log("Accepting friend")
        if( otherUserName == myUser.username ) {
            console.log("Cant accpet yourself")
            return;
        }
        let status = await userActions.answerFriendRequest( otherUserName, myUser.username, true );
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

const handleRejectFriend = (myUser, otherUserName) => {
    const fun = async() => {
        console.log("Rejecting friend")
        if( otherUserName == myUser.username ) {
            console.log("Cant reject yourself")
            return;
        }
        let status = await userActions.answerFriendRequest( otherUserName, myUser.username, false );
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

export const handleFriendAction=(myUser, otherUserName)=>{
    if( myUser == null ) {
        console.log("usercontext or provided user is null <handleFriendAction>");
        return;
    }
    if( myUser.username === otherUserName ) {
        console.log("Its you man" + myUser.username + ", " + otherUserName);
        return;
    }
    if( myUser.friendsData.friendsList.find(x=>x.displayName==otherUserName) != undefined ) {
        handleUnfriend(myUser, otherUserName);                                         
        return;
    }
    if( myUser.friendsData.sentRequests.find(x=>x.username==otherUserName) != undefined ) {
        console.log("unimplemented - maybe cancell request");
        return;
    }
    if( myUser.friendsData.receivedRequests.find(x=>x.username==otherUserName) != undefined ) {
        handleAcceptFriend(myUser, otherUserName);
        return;
    }
    handleAddFriends(myUser, otherUserName)
}

export const handleFriendActionRejectTemp=(myUser, otherUserName)=>{
    handleRejectFriend(myUser, otherUserName);
    return;
}

export const getFriendState = (myUser, otherUserName) => {
    if( myUser == null || otherUserName == null ) 
        return "NONE";

    if( myUser.username == otherUserName ) 
        return "NONE";
    
    if( myUser.friendsData.friendsList.find(x=>x.displayName==otherUserName) != undefined ) 
        return "UNFRIEND";

    if( myUser.friendsData.sentRequests.find(x=>x.username==otherUserName) != undefined ) 
        return "PENDING";    
    
    if( myUser.friendsData.receivedRequests.find(x=>x.username==otherUserName) != undefined ) 
        return "ACCEPT";
        
     
}