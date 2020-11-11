/*
 * We use this functional to access our backend
 */
import axios from 'axios';

const userActions ={

    createNewUser: async function(regUsername, regEmail, regPassword){
        console.log('request new user')
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
        return result;
    },

    signinWithUsernameAndPassword: async function(regUsername, regPassword){
        console.log('request')
        const result = await axios({
            method:'POST',
            data:{
                username: regUsername,
                password: regPassword,
            },
            withCredentials:true,
            url:'http://localhost:4000/signin'
        })
        return result;
    },
    
    getUser: async function(){
        console.log("calling get user");
        const result = await axios({
            method:'GET',
            data:{
            },
            withCredentials:true,
            url:'http://localhost:4000/user'
        });
        return result.data;
    },

    checkUsernameExists: async function(regUsername){
        console.log('request')
        const result = await axios({
            method:'POST',
            data:{
                username: regUsername,
            },
            withCredentials:true,
            url:'http://localhost:4000/check_username'
        })
        return result.data;
    }
       
};

export default userActions;