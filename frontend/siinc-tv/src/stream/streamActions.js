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
        })
        return result.data;
    },

    getStreamById: async function(streamId){
        const result = await axios({
            method: 'POST',
            data:{streamId},
            withCredentials:true,
            url:'http://localhost:4000/user/find_stream_data'
        })
        return result.data;
    }
}



export default streamActions;