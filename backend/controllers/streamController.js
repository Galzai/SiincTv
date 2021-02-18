/**
 *This controller is in charge of handling requests relating to streams
 * @module StreamController
 * @category Backend
 */

const {
  StreamData,
  StreamerData,
  streamGroup,
} = require("../models/streamModels");
const { User, Notification } = require("../models/user");
var ObjectID = require("mongodb").ObjectID;
var notificationController = require("../controllers/notificationController");
var followController = require("../controllers/followController");
const {
  emitReloadNotifications,
  emitNewStreamerJoined,
} = require("../sockets/sockets");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 120, checkperiod: 60 });

/**
 * Tries to create a new stream using the streamData and redirects to newly created page upon success
 * Note: This will fail if now user is signed in/ or the user already has a current stream
 * It adds a new stream to the current user, adds the stream to the database, and notifies all the user's followers
 * That he created a new stream.
 *
 * @param {*} req.body the stream Data
 */
exports.createStream = function (req, res) {
  // We can't allow stream creation for a non logged in user
  if (!req.user) {
    res.send("user/not_logged_in");
  }
  const data = req.body;

  // Create the new stream data
  let streamData = new StreamData({
    date: new Date() /*data.date*/,
    name: data.name,
    status: data.status,
    privateStream: data.privateStream,
    joinOnly: data.inviteOnly,
    tags: data.tags ? data.tags.map((tag) => tag.value) : [],
    description: data.description,
    registeredViewers: null,
    numOfViewers: 0,
  });
  // set the creator object
  streamData.creator = new StreamerData({
    memberId: req.user._id,
    displayName: data.creator.displayName,
    userImage: data.creator.userImage,
    youtubeId: data.creator.youtubeId,
  });

  // We need to change the format of groups from the received format to the one we store
  // We map every group to a group of StreamerData
  const streamGroups = data.streamGroups.map((streamGroup) =>
    streamGroup.group.map(
      (member) =>
        new StreamerData({
          // Note: member id and userImage will need to change frontend side when friends are implemented
          // memberId: member.memberId,
          displayName: member.displayName,
          userImage: member.userImage,
          youtubeId: member.youtubeId,
        })
    )
  );
  streamData.streamGroups = streamGroups;
  // Save the new streamData
  streamData.save();
  // Update the user's current events
  User.updateOne(
    { _id: req.user._id },
    {
      $push: {
        upcomingEvents: {
          name: data.name,
          date: data.date,
          eventId: streamData._id,
        },
      },
    }
  ).then((obj) => {
  });
  // If it's live we set it to the current stream
  if (data.status === "Live") {
    User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          currentStream: {
            name: data.name,
            date: data.date,
            eventId: streamData._id,
          },
        },
      }
    ).then((obj) => {;
    });
  }

  // send notifications to all followers
  const notificationData = new Notification({
    type: "followStartedStream",
    clearable: true,
    data: {
      userId: req.user._id,
      username: req.user.username,
      userImage: req.user.userImage,
      streamId: streamData._id,
    },
  });
  followController.addNotificationToFollowersOf(
    req.user._id,
    notificationData,
    req.user.username + " started a new stream"
  );

  res.send(streamData._id);
};

/**
 * @brief finds stream data by id if it exists
 *
 * @param {*} req.body.streamId the id of the stream
 */
exports.getStreamById = function (req, res) {
  if (!req.body) {
    res.send("stream/invalid_id");
  }
  const id = req.body.streamId;
  StreamData.findById(id, async function (err, doc) {
    if (err) {
    }
    // id exists
    if (doc) res.send(doc);
    else res.send("stream/invalid_id");
  });
};

/**
 * Searches all streams split to pages by a search string
 * Searches tags/description/name
 *
 * @param {*} req.body.searchString string to search
 * @param {*} req.body.page what page to request
 * @param {*} req.body.status stream status
 */
exports.searchStreams = function (req, res) {
  const page = req.body.page;
  const searchString = req.body.searchString;
  const status = req.body.status;
  const PAGE_SIZE = 5; // Similar to 'limit'
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  StreamData.find(
    { $and: [{ $text: { $search: searchString } }, { status: status }] },
    { score: { $meta: "textScore" } }
  )
    .skip(skip)
    .limit(PAGE_SIZE)
    .exec(async function (err, result) {
      if (err) {
        res.send("stream/no_results");
      }
      // id exists
      if (result) res.send(result);
      else res.send("stream/no_results");
    });
};

/**
 * Finds all streams with a given status
 *
 * @param {*} req.body.page what page to request
 * @param {*} req.body.status stream status
 */
exports.getStreamsByStatus = function (req, res) {
  const page = req.body.page;
  const status = req.body.status;
  const PAGE_SIZE = 5; // Similar to 'limit'
  const skip = (page - 1) * PAGE_SIZE; // For page 1, the skip is: (1 - 1) * 20 => 0 * 20 = 0
  StreamData.find({ $and: [{ status: status }] })
    .skip(skip)
    .limit(PAGE_SIZE)
    .sort("-numOfViewers")
    .exec(async function (err, result) {
      if (err) {;
        res.send("stream/no_results");
      }
      // id exists
      if (result) res.send(result);
      else res.send("stream/no_results");
    });
};

/**
 * Closes the user's stream if one exists (and if user exists)
 */
exports.closeStream = function (req, res) {
  const user = req.user;
  const streamId = user.currentStream ? user.currentStream.eventId : null;
  if (streamId == null) {
    res.send("/stream/no_current_stream");
  }
  StreamData.deleteOne({ _id: new ObjectID(streamId) }, function (err) {
  });

  User.updateOne({ _id: req.user._id }, { $unset: { currentStream: "" } }).then(
    (obj) => {
    }
  );
};

/**
 * Sends a request from currently logged in user to join a stream
 * Note: Requests are cached and are limited to one request per user every 2 minutes
 *
 * @param {*} req.body.data formatted data of the current user (which is verified in the backend)
 * @param {*} req.body.creatorId Id of the creator to send request to
 * @return string describing error if failed, otherwise a request is sent
 */
exports.requestToJoinStream = function (req, res) {
  const user = req.user;
  const creatorId = req.body.creatorId;
  data = req.body.data;
  if (myCache.has(String(user._id))) {
    emitReloadNotifications(
      user._id,
      `Please wait two minutes between requests.`
    );
    res.send("wait between requests");
    return;
  }
  if (!user || !creatorId) {
    res.send("error");
    return;
  }

  streamerData = new StreamerData({
    memberId: user._id,
    displayName: data.displayName,
    userImage: data.userImage,
    youtubeId: data.youtubeId,
    twitchId: data.twitchId,
  });

  const notificationData = new Notification({
    type: "joinStreamRequest",
    clearable: false,
    data: streamerData,
  });

  myCache.set(String(user._id));
  notificationController.addNotificationToUser(
    creatorId,
    notificationData,
    `${user.username} wants to stream with you.`
  );
};

/**
 * Rejects a request to join stream from a user
 * @param {*} req.body.data data of the request we want to reject
 */
exports.rejectRequestToJoin = function (req, res) {
  const user = req.user;
  const data = req.body.data;
  const fromId = data.memberId;
  const notificationId = req.body._id;

  if (!user || !fromId || !notificationId) {
    res.send("error");
    return;
  }
  // Remove the notification from the user
  notificationController.deleteNotificationFromUser(user._id, notificationId);

  streamerData = new StreamerData({
    memberId: data.memberId,
    displayName: data.displayName,
    userImage: data.userImage,
    youtubeId: data.youtubeId,
    twitchId: data.twitchId,
  });

  notificationData = new Notification({
    type: "rejectJoinStreamRequest",
    clearable: true,
    data: streamerData,
  });
  // Notify the requester the his request has been rejected
  notificationController.addNotificationToUser(
    fromId,
    notificationData,
    `${user.username} declined your request to join the stream.`
  );
};

/**
 * @brief Adds a streamer to the stream with stream id and emits a refresh to all the viewers
 * @param {*} streamId id of the streamer
 * @param {*} streamerData data of the streamer
 */
function addStreamer(streamId, streamerData) {
  if (!streamId || !streamerData) {
    return;
  }
  const newGroup = [streamerData];
  StreamData.updateOne(
    { _id: new ObjectID(streamId) },
    { $push: { streamGroups: newGroup } }
  ).then((obj) => {
    emitNewStreamerJoined(streamId);
  });
}

/**
 * Rejects a request to join stream from a user
 * @param {*} req.body.data data of the request we want to reject
 */
exports.acceptRequestToJoin = function (req, res) {
  const user = req.user;
  const data = req.body.data;
  const streamId = user.currentStream.eventId;
  const fromId = data.memberId;
  const notificationId = req.body._id;

  if (!user || !fromId || !notificationId) {
    res.send("error");
    return;
  }
  // Remove the notification from the user
  notificationController.deleteNotificationFromUser(user._id, notificationId);

  streamerData = new StreamerData({
    memberId: data.memberId,
    displayName: data.displayName,
    userImage: data.userImage,
    youtubeId: data.youtubeId,
    twitchId: data.twitchId,
  });

  notificationData = new Notification({
    type: "acceptJoinStreamRequest",
    clearable: true,
    data: streamerData,
  });
  // Notify the requester the his request has been rejected

  notificationController.addNotificationToUser(
    fromId,
    notificationData,
    `${user.username} accepted your request to join the stream.`
  );
  // Add the streamer to the stream
  addStreamer(streamId, streamerData);
};
