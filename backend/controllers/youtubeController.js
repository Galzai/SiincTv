const axios = require('axios');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const { GOOGLE_CONFIG} = require("../passportConfigs/passportConfigs.js");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 60 * 60, checkperiod: 120 } );

/**
 * Get the current users youtube channel from his access tokens
 * @param {*} accessToken 
 * @param {*} refreshToken 
 */
exports.getYoutubeChannelFromGoogle = async function(accessToken, refreshToken){
    //****************Getting user's youtube channels **************** */
    var oauth2Client = new OAuth2(GOOGLE_CONFIG.clientID, GOOGLE_CONFIG.clientSecret, "/auth/google/callback");
    oauth2Client.credentials = {
        access_token: accessToken,
        refresh_token: refreshToken
    };
    try{
        var service =  google.youtube('v3');
        var response = await service.channels.list({
            auth: oauth2Client,
            part: 'snippet,contentDetails,statistics',
            mine: true
        });
    }
    catch(err)
    {
        console.log('The API returned an error: ' + err);
    return;
    }

    var channels = response.data.items;
    if (channels.length == 0) {
        console.log('No channel found.');
    }
    return channels;
}

/**
 * Returns the live video id of the requested channel id, tried to call it from cach if possible
 * @param {*} req 
 * @param {*} res 
 */
exports.getLiveVideoId = async function(req,res){
    const channelId = req.body.channelId;
    if(channelId == undefined)
    {
        send("/stream/no_channel_id")
    }
    let videoId = myCache.get(channelId);
    if(videoId === undefined)
    {
        const result = await axios({
            method: 'GET',
            url:`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${GOOGLE_CONFIG.apiKey}`
        }).catch((e)=>{
            
            console.log("error on getting video id")
        }).then((result)=>{
            if(result && result.data && result.data.items && (result.data.items.length > 0)){
                videoId = result.data.items[0].id.videoId;
                const success = myCache.set(channelId, videoId)
                res.send(videoId);
                return;
            }
            res.send('/stream/no_stream');
        } 
        );
    }
    else
    {
        res.send(videoId);
    }


}
