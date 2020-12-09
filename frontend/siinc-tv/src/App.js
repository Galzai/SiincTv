import React, {useState} from 'react'
import UserProvider from "./userProvider";
import useWindowDimensions from "./useWindowDimensions.js";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./Pages/home.js";
import StreamPage from "./Pages/streamPage.js";
import CreateStreamPage from "./Pages/createSteam.js";
import NavigationBar from "./components/NavigationBar/navigationBar";
import SideBar from "./components/SideBar/sideBar.js";
import {streamDataMock} from "./mocks/mockStreamData"
import Profile from "./components/userProfile/profile.js"
import "./app.css"
import SearchPage from './Pages/searchPage';

function App(){
    const window = useWindowDimensions();
    const [width, setWidth] = useState(window.width); 
    const [height, setHeight] = useState(window.height); 

    if( width != window.width ) {
        setWidth(window.width);
        console.log("width = " + window.width);
    }
    if( height != window.height ) {
        setHeight(window.height);
        console.log("height = " + window.height);
    }

    const wrapperStyle = {
        container : {
            width: window.width*0.997,
            height: window.height,
            backgroundColor: "#10002B",
            overflow: "auto",
        }
    }

    return(
        <div style={wrapperStyle.container}>
        <UserProvider>
            <Router>
            <SideBar></SideBar>
                <NavigationBar></NavigationBar>
                
                <div style={{paddingLeft:"350px", paddingTop:"129px"}}>
                <Switch >
                    <Route exact path="/">
                        <HomePage></HomePage>
                    </Route>
                    <Route exact path="/search">
                        <SearchPage></SearchPage>
                    </Route>
                    <Route path="/create_stream">
                        <CreateStreamPage></CreateStreamPage>         
                    </Route>
                    <Route path="/stream_pages/:id" component={StreamPage}>
                    </Route>
                    <Route path="/my_channel">
                        <Profile></Profile>
                    </Route>
                </Switch>
                </div>
            </Router>
        </UserProvider>
        </div>
    )
}

export default App;
