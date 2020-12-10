const mongoose = require("mongoose");


/**
 * @brief Streamer data for streamers in stream
 */
const streamerData = new mongoose.Schema({
    memberId: mongoose.Schema.Types.ObjectId,
    displayName : String,
    userImage : String,
});
const StreamerData =  mongoose.model("StreamerData", streamerData );

/**
 * @brief information regarding registered viewers
 */
const registeredViewerData = new mongoose.Schema({
    memberId: mongoose.Schema.Types.ObjectId,
    displayName : String,
});
const RegisteredViewerData =  mongoose.model("RegisteredViewerData", registeredViewerData );

/**
 * @brief describes a group of streamers that can hold up to maxNumOfMembers
 */
const streamGroup = new mongoose.Schema({
    maxNumOfMembers: Number,
    members:[{type: mongoose.Schema.Types.Mixed, ref: 'StreamerData'}]
});
const StreamGroup =  mongoose.model("StreamGroup", streamGroup );

/**
 * @brief describes a siinc stream
 */
const streamData = new mongoose.Schema({
    creator : {type: mongoose.Schema.Types.Mixed, ref: 'StreamerData'},
    name : String,
    status : String,
    privateStream : Boolean ,
    joinOnly : Boolean,
    tags : [{type: String}],
    date: Date,
    description:String,
    streamGroups: [{type: mongoose.Schema.Types.Mixed, ref: 'StreamGroup'}] ,
    registeredViewers : [{type: mongoose.Schema.Types.ObjectId}],
    numOfViewers: Number
  });
  // This is necessery for quick text search
  streamData.index({name: 'text', tags: 'text', description: 'text'}, 
  {name: 'Search index', weights: {name: 10, tags: 8, description: 5}});

  const StreamData =  mongoose.model("StreamData", streamData );

  module.exports = {
    StreamData:StreamData,
    streamGroup:StreamGroup,
    StreamerData:StreamerData,
    RegisteredViewerData:RegisteredViewerData
}