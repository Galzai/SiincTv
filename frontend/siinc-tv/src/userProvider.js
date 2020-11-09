/*
 * User context to be used for sharing current user data between components
 */
import React from 'react'
import firebaseApp from "./firebase";
import UserContext from "./userContext";

// We use this provider to pass the current to use to the entire project
class UserProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {user: firebaseApp.auth().currentUser};
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    user: this.state.user,
                    setUser: curUser => this.setState({user: curUser})}}
            >
                {this.props.children}
            </UserContext.Provider>);
    }
}

export default UserProvider;