/*
 * We use this module for access to twitch API that requires an auth token
 */

const axios = require('axios');
const { request } = require('express');
const passportConfigs = require('./../passportConfigs/passportConfigs.js');

let accessToken = "NO TOKEN";
// We need to get a twitch auth token in order to get full streamer data
// Tokens need to be refreshed every set interval - we validate the token on each call and if it's invalid we refresh it
const refreshTwitchAuth = async function(){
    const result = await axios({
        method: 'POST',
        url:`https://id.twitch.tv/oauth2/token?client_id=${passportConfigs.TWITCH_CONFIG.clientID}&client_secret=${passportConfigs.TWITCH_CONFIG.clientSecret}&grant_type=client_credentials`
    }).catch((e)=>{console.log(e.result.data)} );
    // We check if any user with such name was found
    accessToken = result.data;
    console.log(result.data)
    return result;
};
// This is where we validate our token before making a call
const validateTwitchAuth = async function(){
    const result = await axios({
        method: 'get',
        url:"https://id.twitch.tv/oauth2/validate",
        headers: {
            "Authorization": "OAuth " + accessToken.access_token
        }
    }).catch((e)=>{console.log(e.response.data)});
    console.log(result ? "Validated" : " Not validated");
    return result;
}

// This must be called before any call to the twitch API that requires authentication!
const getTwitchAuth = async function(){

    // We validate that we are authenticated
    let result = await validateTwitchAuth();
    // If we are not we try and get a token
    result = result ? "Validated" : await refreshTwitchAuth();
    // We check if we managed to get validated, if not we return an error status
    if(result != "Validated")
    {
        result = await validateTwitchAuth();
        return result ? "Validated" : "Note Validated";
    }
    return result;
}


// We first try to get twitch authentication
exports.getAllStreamGroupsStreams = function(req, res)
{
    // Make sure we have an auth key
    getTwitchAuth().then((result)=>{
        // We only try and access if we have a validated token
        if(result != "Validated")
        {
            res.send('/stream/access_denied');
            return;
        }

        const getUserAsync =async ()=> {
            // We expect to get the streamGroup and create a request for all the data from it
            
            const streamGroups = req.body.streamGroups;
            let requestString = "";
            streamGroups.forEach((group)=>{
                group.forEach((streamer)=>{
                    requestString += `user_login=${streamer.displayName}&`
                });
            });
            if(requestString == "")
            { 
                res.send('/stream/no_users');
                return;
            }
            const result = await axios({
                method: 'GET',
                headers: {
                    "Client-ID": passportConfigs.TWITCH_CONFIG.clientID,
                    "Authorization": "Bearer " + accessToken.access_token
                  },
                url:`https://api.twitch.tv/helix/streams?${requestString}`
            }).catch((e)=>{console.log(e.response)}).then((result)=>{
                if(result && result.data && result.data.data){
                    res.send(result.data.data);
                    return;
                }
                res.send('/stream/no_user');
            } 
            );
        }
        getUserAsync();
    });





}