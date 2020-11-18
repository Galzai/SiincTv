const passport = require("passport");
const {User, StreamData, StreamerData} = require("../models/streamModels");
const e = require("express");
const { UpComingEventData } = require("../models/user");

/**
 * @brief creates a new stream
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createStream = function(req, res){
    // We can't allow stream creation for a non logged in user
    if(!req.user){
        req.send('user/not_logged_in')
        return(done, done);
    }
    const data = req.body;
    console.log("StreamData: " ,data);
    // Create the new stream data
    let streamData = new StreamData({
        creator : creator,
        date : data.date,
        name : data.name,
        status : "Scheduled",
        privateStream : data.privateStream ,
        joinOnly : data.joinOnly,
        tags : data.tags,
        date: data.date,
        registeredViewers : null,
        numOfViewers: 0
    
    });
   // set the creator object
    streamData.creator = new StreamerData({
        memberId : data.user._id,
        displayName : data.user.displayName,
        // TODO: User image
    });

    // Write the groups
    for(group in data.streamGroup){
        streamData.streamGroups.push(group);
    }


    // Save the new streamData
    streamData.save();

    // Update the user's current events
    User.UpdateOne(
        {"_id": data.user._id},
        {$push : {"upcomingEvents":  
         {name : data.name,
        date: data.date,
        eventId: date._id }
        }});
    console.log("Saved StreamData: " ,streamData);
    res.send("stream/created");
    
    //TODO: Will redirect to the newly created stream page
    // res.redirect();

}