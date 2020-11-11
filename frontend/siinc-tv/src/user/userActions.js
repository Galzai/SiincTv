/*
 * We use this functional to access our backend
 */
import axios from 'axios';

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

    authenicateTwitch:  function(){
        window.location.assign('http://localhost:4000/auth/twitch');
    }
       
};

export default userActions;