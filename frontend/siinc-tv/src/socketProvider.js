/*
 * Socket provider for an always active socket
 */
import React from 'react'
import SocketContext from './socketContext';
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://18.198.115.204";

class SocketProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = { socket: null , streamRoomId: null};
        
        let sock = socketIOClient(SOCKET_SERVER_URL, {
            path:"/io",
            withCredentials: true,
            transports: ['websocket']
        });
        this.state.socket = sock;   

    
        // Bindings go here
    }

    componentDidMount() {
    }


    componentWillUnmount() {
        if(this.state.socket != null) {
            this.state.socket.disconnect();
        }
    }

    render() {
        return (
            <SocketContext.Provider
                value={{
                    socket: this.state.socket,
                    streamRoomId: this.state.streamRoomId,
                    setStreamRoomId: id =>this.setState({streamRoomId: id})
                }}
            >
                {this.props.children}
            </SocketContext.Provider>);
    }
}

export default SocketProvider;