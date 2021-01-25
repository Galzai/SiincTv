/*
 * We use this modules for calls to our backend API for actiosn relating to streams
 */
import axios from "axios";

const streamActions = {
  /**
   * Tries to create a new stream using the streamData and redirects to newly created page upon success
   * Note: Thhis will fail if now user is signed in/ or the user already has a current stream
   * @param {*} streamData the data of the stream we wish to create
   */
  createNewStream: async function (streamData) {
    const result = await axios({
      method: "POST",
      data: streamData,
      withCredentials: true,
      url: "http://localhost:4000/user/createstream",
    });
    // Redirect to create page
    window.location.href = "http://localhost:3000/stream_pages/" + result.data;
  },

  /**
   * Returns the data of the stream with given id
   * @param {*} streamId id of the stream
   */
  getStreamById: async function (streamId) {
    const result = await axios({
      method: "POST",
      data: { streamId },
      withCredentials: true,
      url: "http://localhost:4000/user/find_stream_data",
    });
    return result.data;
  },

  /**
   * Returns all the data regarding twitch streams of users in the streamGroups
   * @param {*} streamGroups streamGroups to check data for
   */
  getAllStreamGroupsStreams: async function (streamGroups) {
    const result = await axios({
      method: "POST",
      data: { streamGroups },
      url: "http://localhost:4000/twitch/get_streams",
    });
    return result.data;
  },

  /**
   * Returns the live video id of the requested channel id,
   * @param {*} channelId the id of the channel we are trying to get live video from
   */
  getYoutubeVideoId: async function (channelId) {
    const result = await axios({
      method: "POST",
      data: { channelId },
      url: "http://localhost:4000/youtube/getLiveVideoId",
    });
    console.log(result.data);
    return result.data;
  },

  /**
   * Searches all streams split to pages by a search string
   * Searches tags/description/name
   *
   * @param {*} searchString string to search
   * @param {*} page what page to request
   * @param {*} status stream status
   */
  searchStreams: async function (searchString, page, status) {
    const result = await axios({
      method: "POST",
      data: { searchString, page, status },
      url: "http://localhost:4000/search/streams",
    });
    return result.data;
  },

  /**
   * Finds all streams with a given status
   * @param {*} page what page to request
   * @param {*} status stream status
   */
  getStreamsByStatus: async function (page, status) {
    const result = await axios({
      method: "POST",
      data: { page, status },
      url: "http://localhost:4000/feed/streams",
    });
    return result.data;
  },
  /**
   * Closes the current user's stream
   */
  closeStream: async function () {
    const result = await axios({
      method: "POST",
      url: "http://localhost:4000/streams/closeStream",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * Sends a request from currently logged in user to join a stream
   * Note: Requests are cached and are limited to one request per user every 2 minutes
   *
   * @param {*} data formatted data of the current user (which is verified in the backend)
   * @param {*} creatorId Id of the creator to send request to
   * @return string describing error if failed, otherwise a request is sent
   */
  requestToJoinStream: async function (data, creatorId) {
    const result = await axios({
      method: "POST",
      data: { data, creatorId },
      url: "http://localhost:4000/streams/requestToJoinStream",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * Rejects a request to join stream from a user
   * @param {*} data data of the request we want to reject
   */
  rejectRequestToJoin: async function (data) {
    const result = await axios({
      method: "POST",
      data: data,
      url: "http://localhost:4000/streams/rejectRequestToJoin",
      withCredentials: true,
    });
    return result.data;
  },

  /**
   * Accepts a request to join stream from a user
   * @param {*} data data of the request we want to reject
   */
  acceptRequestToJoin: async function (data) {
    const result = await axios({
      method: "POST",
      data: data,
      url: "http://localhost:4000/streams/acceptRequestToJoin",
      withCredentials: true,
    });
    return result.data;
  },
};

export default streamActions;
