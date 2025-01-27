const mongoose = require("mongoose");


/**
 * Streamer data for streamers in stream
 * @class
 * @category Backend
 * @subcategory Stream Models
 * @param  {mongoose.Schema.Types.ObjectId} memberId
 * @param  {String} youtubeId
 * @param  {String} twitchId
 * @param  {String} displayName
 * @param  {String} userImage
 */
const streamerData = new mongoose.Schema({
    memberId: mongoose.Schema.Types.ObjectId,
    youtubeId: String,
    twitchId: String,
    displayName : String,
    userImage : String,
});
const StreamerData =  mongoose.model("StreamerData", streamerData );

/**
 *information regarding registered viewers
 * @class
 * @category Backend
 * @subcategory Stream Models
 * @param  {mongoose.Schema.Types.ObjectId} memberId
 * @param  {String} displayName
 */
const registeredViewerData = new mongoose.Schema({
    memberId: mongoose.Schema.Types.ObjectId,
    displayName : String,
});
const RegisteredViewerData =  mongoose.model("RegisteredViewerData", registeredViewerData );

/**
 * describes a group of streamers that can hold up to maxNumOfMembers
 * @class
 * @category Backend
 * @subcategory Stream Models
 * @param  {Number} maxNumOfMembers
 * @param  {streamerData} members
 */
const streamGroup = new mongoose.Schema({
    maxNumOfMembers: Number,
    members:[{type: mongoose.Schema.Types.Mixed, ref: 'StreamerData'}]
});
const StreamGroup =  mongoose.model("StreamGroup", streamGroup );

/**
 * describes a siinc stream
 * @class
 * @category Backend
 * @subcategory Stream Models
 * @param  {streamerData} creator
 * @param  {String} name
 * @param  {String} status
 * @param  {Boolean} privateStream
 * @param  {Boolean} joinOnly
 * @param  {String[]} tags
 * @param  {Date} date
 * @param  {String} description
 * @param  {streamGroup[]} streamGroups
 * @param  {type:mongoose.Schema.Types.ObjectId[]} registeredViewers
 * @param  {Number} numOfViewers
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
  {name: 'Search index', weights: {name: 3, tags: 2, description: 1}});

  const StreamData =  mongoose.model("StreamData", streamData );

  module.exports = {
    StreamData:StreamData,
    streamGroup:StreamGroup,
    StreamerData:StreamerData,
    RegisteredViewerData:RegisteredViewerData
}