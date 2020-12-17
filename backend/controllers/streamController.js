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
        status : data.status,
        privateStream : data.privateStream ,
        joinOnly : data.inviteOnly,
        tags : data.tags ? data.tags.map(tag=>tag.value) : [],
        date: data.date,
        description:data.description,
        registeredViewers : null,
        numOfViewers: 0
    
    });
   // set the creator object
    streamData.creator = new StreamerData({
        memberId : req.user._id,
        displayName : req.user.username,
        userImage : req.user.twitchData.profile_image_url
    });

    // We need to change the format of groups from the received format to the one we store
    // We map every group to a group of StreamerData
    const streamGroups = data.streamGroups.map(streamGroup=>streamGroup.group.map(
        member=>new StreamerData({
            // Note: member id and userImage will need to change frontend side when friends are implemented
            // memberId: member.memberId,
            displayName: member.username,
            userImage: member.image
        })));
    streamData.streamGroups = streamGroups;
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
    // If it's live we set it to the current stream
    if(data.status === "Live")
    {
        User.updateOne(
            {"_id": req.user._id},
            {$set: {"currentStream": 
             {name : data.name,
            date: data.date,
            eventId: streamData._id }
            }}).then(obj=>{console.log("Object modified", obj)}); 
    }
    console.log(req.user._id);
    // req.logIn(req.user._id, (err) => {
    //     if (err) throw err;;
    //   });
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

/**
 * @brief searches for streams, split to pages
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.searchStreams = function(req, res){
    const page = req.body.page;
    const searchString = req.body.searchString
    const status = req.body.status;
    const PAGE_SIZE = 20;                   // Similar to 'limit'
    const skip = (page - 1) * PAGE_SIZE;    // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
    StreamData.find({$and: [
        { $text : { $search : searchString}},
        {status: status}]},
        { score : { $meta: "textScore" }},

    ).limit(PAGE_SIZE).skip(skip).exec(
    async function(err, result){
        if (err){;
            console.log(err)
            console.log("stream/no_results");
        }
        // id exists
        if (result) res.send(result);
        else res.send('stream/no_results');
    }
   
    )  
}