const passport = require("passport");
const {StreamData, StreamerData} = require("../models/streamModels");
const {User} = require("../models/user");
const e = require("express");
const { UpComingEventData } = require("../models/user");

/**
 * @brief creates a new stream
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createStream = function(req, res){

    console.log("StreamData: " , JSON.stringify(req.body));
    console.log("User is: ",req.user)
    // We can't allow stream creation for a non logged in user
    if(!req.user){
        res.send('user/not_logged_in')
        console.log("no user");
    }
    const data = req.body;
    
    // Create the new stream data
    let streamData = new StreamData({
        date : data.date,
        name : data.name,
        status : "Scheduled",
        privateStream : data.privateStream ,
        joinOnly : data.inviteOnly,
        tags : data.tags.map(tag=>tag.value),
        date: data.date,
        description:data.description,
        registeredViewers : null,
        numOfViewers: 0
    
    });
   // set the creator object
    streamData.creator = new StreamerData({
        memberId : req.user._id,
        displayName : req.user.username,
        // TODO: User image
    });

    // We need to change the format of groups from the received format to the one we store
    // We map every group to a group of StreamerData
    const streamGroups = data.streamGroups.map(streamGroup=>streamGroup.group.map(
        member=>new StreamerData({
            // Note: member id and userImage will need to change frontend side when friends are implemented
            // memberId: member.memberId,
            displayName: member.value,
            // userImage: member.userImage
        })));
    streamData.streamGroups = streamGroups;

    console.log("Stream model : ", streamData);
    // Save the new streamData
    streamData.save();

    // Update the user's current events
    User.updateOne(
        {"_id": req.user._id},
        {$push : {"upcomingEvents":  
         {name : data.name,
        date: data.date,
        eventId: streamData._id }
        }}).then(obj=>{console.log("Object modified", obj)});
    console.log("Saved StreamData: " ,streamData);
    res.send(streamData._id);
    
    //TODO: Will redirect to the newly created stream page
    // res.redirect();
}

/**
 * @brief finds stream data by id
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getStreamById = function(req, res){
    
    console.log('stream id is: ', req.body);

    if(!req.body){
        res.send('stream/invalid_id');
        console.log('There is no stream with this id');
    }
    const id = req.body.streamId;
    console.log(id);
    StreamData.findById(id,
        async function(err, doc){
            if (err){
                console.log("Couldn't find this id");
            }
            // id exists
            if (doc) res.send(doc);
            else res.send('stream/invalid_id');
        }
    );

}