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

    getTwitchUserDataByName: async function(streamId){
        const result = await axios({
            method: 'POST',
            data:{streamId},
            url:'http://localhost:4000/twitch/find_channel'
        });
        console.log(result.data)
        return result.data;
    },

}



export default streamActions;