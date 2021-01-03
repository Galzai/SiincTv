/*
 * User context to be used for sharing current user data between components
 */
import React from 'react'
import UserContext from "./userContext";
import userActions from './user/userActions'

/*
 * @firebaseUser either the current firebase authenticated user, or null if no user or only twitch auth.
 * @twitchId either null if no twitch id or the user's twitch id.
 * @userData if either a firebase authenticated user is logged in or a valid twitch id is found,
 * this holds the user data from our firestore db
 */
class UserProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {  user: null,
                        userData: null};
        // Bindings go here
        this.refreshUserData = this.refreshUserData.bind(this);
    }

    // This function is called for refreshing user data
    async refreshUserData(){
        if( this.state.user == null ) {

            return;
        }
        
        let userdata = await userActions.getUser();
        this.setState({user: userdata});
    }

    render() {
        return (
            <UserContext.Provider
                value={{
                    user: this.state.user,
                    setUser: curUser => { this.setState({user: curUser}); },
                    userData: this.state.userData,
                    setUserData: curUserData => this.setState({userData: curUserData}),
                    refreshUserData: this.refreshUserData
                    }
                }
            >
                {this.props.children}
            </UserContext.Provider>);
    }
}

export default UserProvider;