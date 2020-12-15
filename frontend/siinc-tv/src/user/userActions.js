/*
 * We use this functional to access our backend
 */
import axios from 'axios';

const SEND_FRIEND_REQUEST = 0;
const ANSWER_FRIEND_REQUEST = 1;

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
            url:'http://localhost:4000/signup'
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
            url:'http://localhost:4000/signin'
        })
        return result.data;
    },

    signOut: async function(){
        const result = await axios({
            method:'POST',
            data:{},
            withCredentials:true,
            url:'http://localhost:4000/signout'
        });
        return result.data;
    },
    
    getUser: async function(){
        const result = await axios({
            method:'GET',
            data:{},
            withCredentials:true,
            url:'http://localhost:4000/user'
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
            url:'http://localhost:4000/check_username'
        })
        return result.data;
    },

    searchUsers: async function(searchString, page){
        const result = await axios({
            method: 'POST',
            data:{searchString, page},
            url:'http://localhost:4000/search/users'
        });
        return result.data;
    },

    authenicateTwitch: async function(searchString, page){
        const result = await axios({
            method: 'GET',
            data:{url:window.location.href },
            url:'http://localhost:4000/auth/twitch/'
        });
        return result.data;
    },

    setRedirectURL: async function(searchString, page){
        const result = await axios({
            method: 'POST',
            url:'http://localhost:4000/auth/setRedirectUrl'
        });
    },

    // External authenticaiton redirects
    authenicateTwitch:  function(){
      window.location.assign('http://localhost:4000/auth/twitch/');
    },

    authenicateGoogle:  function(){
        window.location.assign('http://localhost:4000/auth/google/');
    },

    authenicateFacebook:  function(){
        window.location.assign('http://localhost:4000/auth/facebook/');
    },

    // ------------------------- FRIENDS -----------------------------

    sendFriendRequest: async function(fromUser, toUser) {
        const result = await axios({
            method: 'POST',
            data:{
                action: SEND_FRIEND_REQUEST,
                fromUser: fromUser,
                toUser: toUser
            },
            withCredentials=true,
            url:'http://localhost:4000/user/friends'
        })
        return result.data;
    },

    answerFriendRequest: async function(user1, user2, accepted) {
        const result = await axios({
            method: 'POST',
            data:{
                action: ANSWER_FRIEND_REQUEST,
                user1: user1,
                user2: user2,
                accepted: accepted   //boolean true for accepted, false for rejeceted.
            },
            withCredentials=true,
            url:'http://localhost:4000/user/friends'
        })
        return result.data;
     }

     // -------------------------------------------------------------
       
};

export default userActions;
