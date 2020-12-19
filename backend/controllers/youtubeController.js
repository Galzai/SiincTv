var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const { GOOGLE_CONFIG} = require("../passportConfigs/passportConfigs.js");


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
    } else {
        console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                    'it has %s views.',
                    channels[0].id,
                    channels[0].snippet.title,
                    channels[0].statistics.viewCount);
    }
    return channels;
}
