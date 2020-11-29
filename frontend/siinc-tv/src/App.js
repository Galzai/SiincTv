import React, {useEffect, useState} from 'react'
import SigningModal from "./components/userSigning/signingModal";
import NewStream from "./components/streamCreation/newStream";
import UserProvider from "./userProvider";
import UserContext from "./userContext";
//----------test--------------
import NavigationBar from "./components/NavigationBar/navigationBar";
//---------------------------

function App(){

    return(
        <div style={{height:"2000px"}}>
            <img src="https://img.icons8.com/material/4ac144/256/user-male.png" style={{width:"100%", height:"100%"}}></img>
        <UserProvider>
            <UserContext.Consumer>
                {context=>(
                <div>
 
                <NewStream user={context.user}/>

                </div>)}
            </UserContext.Consumer>

            <NavigationBar></NavigationBar>
        </UserProvider>
        </div>
    )
}

export default App;
