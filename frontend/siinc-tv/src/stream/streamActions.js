/*
 * We use this functional to access our backend
 */
import axios from 'axios';

const streamActions={

    createNewStream: async function(streamData){
        const result = await axios({
            method:'POST',
            data:streamData,
            withCredentials:true,
            url:'http://localhost:4000/user/createstream'
        });
        // Redirect to create page
        window.location.href = 'http://localhost:3000/stream_pages/' + result.data;
    },

    getStreamById: async function(streamId){
        const result = await axios({
            method: 'POST',
            data:{streamId},
            withCredentials:true,
            url:'http://localhost:4000/user/find_stream_data'
        });
        return result.data;
    },
    getAllStreamGroupsStreams: async function(streamGroups){
        const result = await axios({
            method: 'POST',
            data:{streamGroups},
            url:'http://localhost:4000/twitch/get_streams'
        });
        return result.data;
    },
    getYoutubeVideoId: async function(channelId){
        const result = await axios({
            method: 'POST',
            data:{channelId},
            url:'http://localhost:4000/youtube/getLiveVideoId'
        });
        console.log(result.data);
        return result.data;
    },

    searchStreams: async function(searchString, page, status){
        const result = await axios({
            method: 'POST',
            data:{searchString, page, status},
            url:'http://localhost:4000/search/streams'
        });
        return result.data;
    },
    getStreamsByStatus: async function(page, status){
        const result = await axios({
            method: 'POST',
            data:{page, status},
            url:'http://localhost:4000/feed/streams'
        });
        return result.data;
    },
    closeStream: async function(){
        const result = await axios({
            method: 'POST',
            url:'http://localhost:4000/streams/closeStream',
            withCredentials:true,
        });
        return result.data;
    },
    requestToJoinStream: async function(data, creatorId){
        const result = await axios({
            method: 'POST',
            data:{data, creatorId},
            url:'http://localhost:4000/streams/requestToJoinStream',
            withCredentials:true,
        });
        return result.data;
    },
    rejectRequestToJoin: async function(data){
        const result = await axios({
            method: 'POST',
            data:data,
            url:'http://localhost:4000/streams/rejectRequestToJoin',
            withCredentials:true,
        });
        return result.data;
    },
    acceptRequestToJoin: async function(data){
        const result = await axios({
            method: 'POST',
            data:data,
            url:'http://localhost:4000/streams/acceptRequestToJoin',
            withCredentials:true,
        });
        return result.data;
    }


}



export default streamActions;