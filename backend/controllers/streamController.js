const passport = require("passport");
const {StreamData, StreamerData, streamGroup} = require("../models/streamModels");
const {User,Notification} = require("../models/user");
const e = require("express");
const { UpComingEventData } = require("../models/user");
var ObjectID = require('mongodb').ObjectID;
var notificationController = require('../controllers/notificationController')
const {emitNewStreamerJoined} = require("../sockets/sockets")

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
        date : new Date() /*data.date*/,
        name : data.name,
        status : data.status,
        privateStream : data.privateStream ,
        joinOnly : data.inviteOnly,
        tags : data.tags ? data.tags.map(tag=>tag.value) : [],
        description:data.description,
        registeredViewers : null,
        numOfViewers: 0
    
    });
   // set the creator object
    streamData.creator = new StreamerData({
        memberId : req.user._id,
        displayName : data.creator.displayName,
        userImage : data.creator.userImage,
        youtubeId: data.creator.youtubeId
    });

    // We need to change the format of groups from the received format to the one we store
    // We map every group to a group of StreamerData
    const streamGroups = data.streamGroups.map(streamGroup=>streamGroup.group.map(
        member=>new StreamerData({
            // Note: member id and userImage will need to change frontend side when friends are implemented
            // memberId: member.memberId,
            displayName: member.displayName,
            userImage: member.userImage,
            youtubeId: member.youtubeId
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
    res.send(streamData._id);
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
        { score : { $meta: "textScore" }}

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

/**
 * @brief searches for streams, split to pages
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getStreamsByStatus = function(req, res){
    const page = req.body.page;
    const status = req.body.status;
    const PAGE_SIZE = 10;                   // Similar to 'limit'
    const skip = (page - 1) * PAGE_SIZE;    // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
    StreamData.find({$and: [
        {status: status}]},

    ).limit(PAGE_SIZE).skip(skip).sort('-numOfViewers').exec(
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

exports.closeStream = function(req, res){
    const user = req.user;
    const streamId = user.currentStream ? user.currentStream.eventId : null;
    console.log(user.currentStream);
    if(streamId == null)
    {
        res.send("/stream/no_current_stream")
    }
    console.log(streamId);
    StreamData.deleteOne({_id: new ObjectID(streamId)}, function(err){
        console.log("could not remove current stream");
    });

    User.updateOne(
        {"_id": req.user._id},
        {$unset: {"currentStream": ""}}).then(obj=>{console.log("Object modified", obj)}
        );   
}

/**
 * Request to join a currently live stream
 * @param {*} req 
 * @param {*} res 
 */
exports.requestToJoinStream = function(req, res){
    const user = req.user;
    const creatorId = req.body.creatorId;
    data = req.body.data;
    if(!user || !creatorId)
    {
        res.send("error");
        return;
    }
    console.log("creator id ",creatorId);

    streamerData = new StreamerData({
        memberId: user._id,
        displayName: data.displayName,
        userImage: data.userImage,
        youtubeId: data.youtubeId
    });

    console.log("data" , streamerData);

    notificationData = new Notification({
        type: "joinStreamRequest",
        clearable: false,
        data: streamerData
    })
    notificationController.addNotificationToUser(creatorId, notificationData, `${user.username} wants to stream with you.` )
}

/**
 * Rejects a stream join request
 * @param {*} req 
 * @param {*} res 
 */
exports.rejectRequestToJoin = function(req, res){
    const user = req.user;
    const data = req.body.data;
    console.log(req.body);
    const fromId = data.memberId;
    const notificationId = req.body._id;


    if(!user || !fromId || ! notificationId)
    {
        res.send("error");
        return;
    }
    // Remove the notification from the user
    console.log("id is", user._id);
    console.log("notification id is ", notificationId);
    notificationController.deleteNotificationFromUser(user._id, notificationId);

    streamerData = new StreamerData({
        
        memberId: data.memberId,
        displayName: data.displayName,
        userImage: data.userImage,
        youtubeId: data.youtubeId
    });

    notificationData = new Notification({
        type: "rejectJoinStreamRequest",
        clearable: true,
        data: streamerData
    })
    // Notify the requester the his request has been rejected
    notificationController.addNotificationToUser(fromId, notificationData, `${user.username} declined your request to join the stream.` )
}


/**
 * @brief Adds a streamer to the stream with stream id and emits a refresh to all the viewers
 * @param {*} streamId 
 * @param {*} streamerData 
 */
function addStreamer(streamId, streamerData){
    if(!streamId || !streamerData)
    {
        return;
    }
    const newGroup =  [streamerData];
    StreamData.updateOne(
        {_id: new ObjectID(streamId)},
        { $push: { "streamGroups": newGroup} }
        ).then(obj=>
           {
            console.log(obj);
            emitNewStreamerJoined(streamId);
           } 
        ); 
    
}
/**
 * Rejects a stream join request
 * @param {*} req 
 * @param {*} res 
 */
exports.acceptRequestToJoin = function(req, res){
    const user = req.user;
    const data = req.body.data;
    const streamId = user.currentStream.eventId;
    const fromId = data.memberId;
    const notificationId = req.body._id;

    if(!user || !fromId || ! notificationId)
    {
        res.send("error");
        return;
    }
    // Remove the notification from the user
    console.log("id is", user._id);
    console.log("notification id is ", notificationId);
    console.log("stream id is ", streamId);
    notificationController.deleteNotificationFromUser(user._id, notificationId);

    streamerData = new StreamerData({
        
        memberId: data.memberId,
        displayName: data.displayName,
        userImage: data.userImage,
        youtubeId: data.youtubeId
    });

    notificationData = new Notification({
        type: "acceptJoinStreamRequest",
        clearable: true,
        data: streamerData
    })
    // Notify the requester the his request has been rejected
    
    notificationController.addNotificationToUser(fromId, notificationData, `${user.username} accepted your request to join the stream.` )
    console.log("here");
    // Add the streamer to the stream
    addStreamer(streamId, streamerData);
}
