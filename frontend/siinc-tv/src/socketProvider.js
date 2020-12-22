/*
 * Socket provider for an always active socket
 */
import React from 'react'
import SocketContext from './socketContext';
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

class SocketProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = { socket: null };
        console.log("invoked socket provider constructor")
        
        let sock = socketIOClient(SOCKET_SERVER_URL, {
            withCredentials: true,
            transports: ['websocket']
        });
        console.log("Created socket : ")
        console.log(sock);
        this.state.socket = sock;    // setting state directly in constructor is fine 
        //this.setState( {socket: sock} )
        //console.log("Set state of socket provider : ")
        //console.log(this.state.socket)
        

        // Bindings go here
    }

    componentDidMount() {
        /*
        console.log("Creating socket ..... ")
        let sock = socketIOClient(SOCKET_SERVER_URL, {
            withCredentials: true,
            transports: ['websocket']
        });
        console.log("Created socket : ")
        console.log(sock);
        this.setState( {socket: sock}, () => {console.log("finished setting socker state"); console.log(this.state.socket)} )
        */
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
                }}
            >
                {this.props.children}
            </SocketContext.Provider>);
    }
}

export default SocketProvider;