/*
 * We use this functional to access our backend
 */
import axios from 'axios';

const SEND_FRIEND_REQUEST = 0;
const ANSWER_FRIEND_REQUEST = 1;
const UNFRIEND_REQUEST = 2;
const FOLLOW_REQUEST = 0;
const UNFOLLOW_REQUEST = 1;

const userActions ={

    createNewUser: async function(regUsername, regEmail, regPassword){
        const result = await axios({
            method:'POST',
            data:{
                username: regUsername,
                email: regEmail,
                password: regPassword,
            },
            withCredentials:true,
            url:'/api/signup'
        })
        return result.data;
    },

    signinWithUsernameAndPassword: async function(regUsername, regPassword){
        const result = await axios({
            method:'POST',
            data:{
                username: regUsername,
                password: regPassword,
            },
            withCredentials:true,
            url:'/api/signin'
        })
        return result.data;
    },

    signOut: async function(){
        const result = await axios({
            method:'POST',
            data:{},
            withCredentials:true,
            url:'/api/signout'
        });
        return result.data;
    },
    
    getUser: async function(){
        const result = await axios({
            method:'GET',
            data:{},
            withCredentials:true,
            url:'/api/user'
        });
        return result.data;
    },
    
    getUserData: async function( userName ){
        const result = await axios({
            method:'POST',
            data:{
                username: userName,
            },
            withCredentials:true,
            url:'/api/userdata'
        });
        return result.data;
    },

    checkUsernameExists: async function(regUsername){
        const result = await axios({
            method:'POST',
            data:{
                username: regUsername,
            },
            withCredentials:true,
            url:'/api/check_username'
        })
        return result.data;
    },

    searchUsers: async function(searchString, page){
        const result = await axios({
            method: 'POST',
            data:{searchString, page},
            url:'/api/search/users'
        });
        return result.data;
    },

    authenicateTwitch: async function(searchString, page){
        const result = await axios({
            method: 'GET',
            data:{url:window.location.href },
            url:'/api/auth/twitch/'
        });
        return result.data;
    },

    setRedirectURL: async function(searchString, page){
        const result = await axios({
            method: 'POST',
            url:'/api/auth/setRedirectUrl'
        });
    },

    // External authenticaiton redirects
    authenicateTwitch:  function(){
      window.location.assign('/api/auth/twitch/');
    },

    authenicateGoogle:  function(){
        window.location.assign('/api/auth/google/');
    },

    authenicateFacebook:  function(){
        window.location.assign('/api/auth/facebook/');
    },

    // ------------------------- FRIENDS -----------------------------

    // String:fromUser - friend request sender
    // String:toUser   - friend request receiver
    sendFriendRequest: async function(fromUser, toUser) {
        const result = await axios({
            method: 'POST',
            data:{
                action: SEND_FRIEND_REQUEST,
                fromUser: fromUser,
                toUser: toUser
            },
            withCredentials:true,
            url:'/api/user/friends'
        })
        return result.data;
    },

    // String:fromUser - the sender of the request which is now being responded to
    // String:toUser   - the one who responds to the requests
    answerFriendRequest: async function(fromUser, toUser, accepted) {
        const result = await axios({
            method: 'POST',
            data:{
                action: ANSWER_FRIEND_REQUEST,
                fromUser: fromUser,
                toUser: toUser,
                accepted: accepted   //boolean true for accepted, false for rejeceted.
            },
            withCredentials:true,
            url:'/api/user/friends'
        })
        return result.data;
     },

     // String:fromUser - the one who unfriends
     // String:toUser   - the one being unfriended
     unfriendFriendRequest: async function(fromUser, toUser) {
        const result = await axios({
            method: 'POST',
            data:{
                action: UNFRIEND_REQUEST,
                fromUser: fromUser,
                toUser: toUser
            },
            withCredentials:true,
            url:'/api/user/friends'
        })
        return result.data;
     },

     // -------------------------------------------------------------
    
     // ------------------------- FOLLOW -----------------------------

    // String:fromUser - the follower
    // String:toUser   - who the follower follows
    sendFollowRequest: async function(fromUser, toUser) {
        console.log("sending follow request from " + fromUser + " to user " + toUser)
        const result = await axios({
            method: 'POST',
            data:{
                action: FOLLOW_REQUEST,
                fromUser: fromUser,
                toUser: toUser
            },
            withCredentials:true,
            url:'/api/user/follow'
        })
        return result.data;
    },

     // String:fromUser - the follower
     // String:toUser   - who the follower follows
     sendUnfollowRequest: async function(fromUser, toUser) {
        const result = await axios({
            method: 'POST',
            data:{
                action: UNFOLLOW_REQUEST,
                fromUser: fromUser,
                toUser: toUser
            },
            withCredentials:true,
            url:'/api/user/follow'
        })
        return result.data;
     },    
     // -------------------------------------------------------------

     getUsernameList: async function() {
        const result = await axios({
            method:'GET',
            data:{},
            withCredentials:true,
            url:'/api/user/getusernamelist'
        });
        return result.data;
     },
     deleteNotification: async function(id){
        const result = await axios({
            method: 'POST',
            data:{notificationId: id},
            url:'/api/notifications/deleteNotification',
            withCredentials:true,
        });
        return result.data;
    },
     pokeYourself: async function(){
        const result = await axios({
            method: 'POST',
            url:'/api/test/selfPoke',
            withCredentials:true,
        });
        return result.data;
    },
    clearNotifications: async function(){
        const result = await axios({
            method: 'POST',
            url:'/api/notifications/clearNotifications',
            withCredentials:true,
        });
        return result.data;
    }

};

export default userActions;
