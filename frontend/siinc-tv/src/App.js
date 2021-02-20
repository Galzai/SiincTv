/**
 * Our entry point to the app
 * 
 * @module App
 * @category Frontend
 */
import React, { useState } from "react";
import UserProvider from "./userProvider";
import SocketProvider from "./socketProvider";
import UserSocketConnector from "./userSocketConnector";
import useWindowDimensions from "./useWindowDimensions.js";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/home.js";
import StreamPage from "./Pages/streamPage.js";
import CreateStreamPage from "./Pages/createSteam.js";
import NavigationBar from "./components/NavigationBar/navigationBar";
import SideBar from "./components/SideBar/sideBar.js";
import { toast, ToastContainer } from "react-toastify";
import Profile from "./components/userProfile/profile.js";
import "./app.css";
import SearchPage from "./Pages/searchPage";

const history = createBrowserHistory();
function App() {
  const windowDim = useWindowDimensions();
  const [width, setWidth] = useState(window.width);
  const [height, setHeight] = useState(window.height);
  toast.configure();
  if (width !== windowDim.width) {
    setWidth(windowDim.width);
  }
  if (height !== window.height) {
    setHeight(windowDim.height);
  }

  const wrapperStyle = {
    container: {
      width: windowDim.width * 0.997,
      height: windowDim.height,
      backgroundColor: "#0B001E",
      overflow: "auto",
    },
  };

  return (
    <div className={"noScroll"}>
      <ToastContainer
        position="bottom-right"
        paddingTop="50px"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <div style={wrapperStyle.container}>
        <UserProvider>
          <SocketProvider>
            <UserSocketConnector />;
            <Router history={history}>
              <SideBar></SideBar>
              <NavigationBar></NavigationBar>
              <div style={{ paddingLeft: "256px", paddingTop: "64px" }}>
                <Switch>
                  <Route exact path="/">
                    <HomePage></HomePage>
                  </Route>
                  <Route
                    path="/search/:searchString"
                    component={SearchPage}
                  ></Route>
                  <Route path="/create_stream">
                    <CreateStreamPage></CreateStreamPage>
                  </Route>
                  <Route
                    path="/stream_pages/:id"
                    component={StreamPage}
                  ></Route>
                  <Route path="/my_channel">
                    <Profile></Profile>
                  </Route>
                  <Route path="/users/:userid/following" render={(props) => (
                      <Profile initTab={"FOLLOWING"} />
                  )} ></Route>
                  <Route path="/users/:userid/friends" render={(props) => (
                      <Profile initTab={"FRIENDS"} />
                  )} ></Route>
                  <Route path="/users/:userid" component={Profile}></Route>
                </Switch>
                <SideBar></SideBar>
                <NavigationBar></NavigationBar>
              </div>
            </Router>
          </SocketProvider>
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
