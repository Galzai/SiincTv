import React, {useEffect, useState} from 'react'
import SigningModal from "./components/userSigning/signingModal";
import UserProvider from "./userProvider";
import UserContext from "./userContext";
import firebaseApp from "./firebase";

function App(){

    return(
        <UserProvider>
            <UserContext.Consumer>
                {context =>(
                    <SigningModal getUser={context.user}
                    setUser={context.setUser}
                    />
                )}
            </UserContext.Consumer>

        </UserProvider>
    )
}

export default App;