/**
 * We use this module for access to twitch API that requires an auth token
 * @module TwitchController
 * @category Backend
 * @subcategory Controllers
 */

const axios = require('axios');
const { request } = require('express');
const passportConfigs = require('./../passportConfigs/passportConfigs.js');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 60 * 60, checkperiod: 120 } );
const twitchAuthenticatedKey = "TWITCH_AUTH42069"

let accessToken = "NO TOKEN";
/**
 * We need to get a twitch auth token in order to get full streamer data
 * Tokens need to be refreshed every set interval - we validate the token on each call and if it's invalid we refresh it
 * Token resets every 60 days, we clear it from the cache every 30
 */
const refreshTwitchAuth = async function(){
    const result = await axios({
        method: 'POST',
        url:`https://id.twitch.tv/oauth2/token?client_id=${passportConfigs.TWITCH_CONFIG.clientID}&client_secret=${passportConfigs.TWITCH_CONFIG.clientSecret}&grant_type=client_credentials`
    }).catch((e)=>{} );
    // We check if any user with such name was found
    const success = myCache.set(twitchAuthenticatedKey, result.data, 30 * 24 * 60 * 60);
    accessToken = result.data;

    return result;
};
/**
 * This is where we validate our token before making a call
 */
const validateTwitchAuth = async function(){
    const result = await axios({
        method: 'get',
        url:"https://id.twitch.tv/oauth2/validate",
        headers: {
            "Authorization": "OAuth " + accessToken.access_token
        }
    }).catch((e)=>{});
    return result;
}

// This must be called before any call to the twitch API that requires authentication!
const getTwitchAuth = async function(){

    const token = myCache.get(twitchAuthenticatedKey);
    if(token === undefined)
    {
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
    else
    {
       return "Validated"; 
    }

}


/**
 * Returns all the data regarding the current twitch streams of the users with twitch streams in the groups
 * @param {*} req.body.streamGroups the groups of streamers in the stream;
 */
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
            if(!streamGroups)
            { 
                res.send('/stream/no_users');
                return;
            }
            streamGroups.forEach((group)=>{
                group.forEach((streamer)=>{
                    //TODO Change to twitchData check
                    if(!streamer.youtubeId){
                        requestString += `user_login=${streamer.displayName}&`
                    }

                });
            });
            if(requestString == "")
            { 
                res.send('/stream/no_users');
                return;
            }
            let streams = myCache.get(requestString);
            if(streams === undefined)
            {
                const result = await axios({
                    method: 'GET',
                    headers: {
                        "Client-ID": passportConfigs.TWITCH_CONFIG.clientID,
                        "Authorization": "Bearer " + accessToken.access_token
                      },
                    url:`https://api.twitch.tv/helix/streams?${requestString}`
                }).catch((e)=>{
                    // console.log(e.response)
                }).then((result)=>{
                    if(result && result.data && result.data.data){
                        streams = result.data.data;
                        const success = myCache.set(requestString, streams);
                        res.send(streams);
                        return;
                    }

                    res.send('/stream/no_user');
                } 
                );
            }
            else
            {
                res.send(streams);
            }

        }
        getUserAsync();
    });





}