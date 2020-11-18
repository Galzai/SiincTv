import React, {useEffect, useState} from 'react'
import SigningModal from "./components/userSigning/signingModal";
import NewStream from "./components/streamCreation/newStream";
import UserProvider from "./userProvider";
import UserContext from "./userContext";

function App(){

    return(
        <UserProvider>
            <UserContext.Consumer>
                {context=>(<NewStream user={context.user}/>)}
                {/* {context =>(
                    <SigningModal
                        user={context.user}
                        setUser={context.setUser}
                        refreshUserData={context.refreshUserData}
                    />
                )} */}
            </UserContext.Consumer>

        </UserProvider>
    )
}

export default App;