/** 
 * User context to be used for sharing current user data between components
 * 
 * @module UserProvider
 * @category Frontend
 * @subcategory Provider
 */
import React from "react";
import UserContext from "./userContext";
import userActions from "./user/userActions";

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, userData: null };
    // Bindings go here
    this.refreshUserData = this.refreshUserData.bind(this);
  }

  // This function is called for refreshing user data
  async refreshUserData() {
    if (this.state.user == null) {
      return;
    }

    let userdata = await userActions.getUser();
    console.log("userData",userdata)
    this.setState({ user: userdata });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: (curUser) => {
            this.setState({ user: curUser });
          },
          userData: this.state.userData,
          setUserData: (curUserData) =>
            this.setState({ userData: curUserData }),
          refreshUserData: this.refreshUserData,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
