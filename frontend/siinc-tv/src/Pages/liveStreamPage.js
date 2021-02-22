import SingleStreamViewBox from "../components/liveStream/singleStreamingViewBox";
import SplitStreamViewBox from "../components/liveStream/splitScreenViewBox";
import StreamDetails from "../components/liveStream/streamDetails";
import StreamActions from "../stream/streamActions";
import userUtils from "../user/userUtils";
import Chat from "../chat/chat";
import { useContext, useState } from "react";
import UserContext from "../userContext";
import style from "../components/liveStream/liveStream.module.css";
import Hidden from "@material-ui/core/Hidden";
import { Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * This class implements the page of a currently live stream
 * 
 * @prop {streamData} streamData the data describing the stream
 * @component
 * @category Frontend
 * @subcategory Pages
 */
function Stream(props) {
  const id = props.id;
  const userContext = useContext(UserContext);
  const [streamData, setStreamData] = useState(props.streamData);
  const [isSplit, setIsSplit] = useState(false);

  /**
   * Sends a request to the stream creator to join the stream
   */
  function requestToJoinStream() {
    const user = userContext.user;
    const data = {
      displayName: user.username,
      userImage: userUtils.assignImage(user),
      youtubeId: user.googleData ? user.googleData.youtubeId : null,
    };

    StreamActions.requestToJoinStream(data, streamData.creator.memberId).then();
  }

  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1420,
        xl: 1920,
      },
    },
  });

  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }

  /**
   * True if user can request to join, false otherwise
   */
  function canRequestToJoin() {
    const user = userContext.user;
    if (!user) return false;
    if (streamData.joinOnly) return false;
    if (streamData.creator.memberId === user._id) return false;
    const streamGroups = streamData.streamGroups;
    if (streamGroups) {
      let filteredStreamers = flatten(streamData.streamGroups).filter(function (
        streamer
      ) {
        return streamer.memberId === user._id;
      });
      if (filteredStreamers && filteredStreamers.length > 0) return false;
    }
    if (!(user.googleData && user.googleData.youtubeId) && !user.twitchId)
      return false;
    return true;
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Hidden implementation="css" initialWidth="md" mdDown>
          <Chat
            className={style.chatBox}
            username={userContext.user ? userContext.user.username : ""}
            roomId={id}
            isOwner={(userContext.user) && (userContext.user._id === streamData.creator.memberId)}
          />
        </Hidden>
        <Container maxWidth="xl">
          <div className={style.streamPage}>
            <div className={style.StreamBox}>
              {!isSplit && (
                <SingleStreamViewBox
                  currentStreamer={streamData.creator}
                  streamGroups={streamData.streamGroups}
                ></SingleStreamViewBox>
              )}
              {isSplit && (
                <SplitStreamViewBox
                  currentStreamer={streamData.creator}
                  streamGroups={streamData.streamGroups}
                ></SplitStreamViewBox>
              )}
            </div>
            {canRequestToJoin() && (
              <button
                className={style.joinButton}
                onClick={requestToJoinStream}
              >
                Request to join
              </button>
            )}
            {isSplit && (
              <Tooltip title="Main screen" placement="top">
                <button
                  className={style.setMainButton}
                  onClick={() => {
                    setIsSplit(!isSplit);
                  }}
                >
                  {" "}
                </button>
              </Tooltip>
            )}
            {!isSplit && (
              <Tooltip title="Split screen" placement="top">
                <button
                  className={style.setSplitButton}
                  onClick={() => {
                    setIsSplit(!isSplit);
                  }}
                >
                  {" "}
                </button>
              </Tooltip>
            )}
            <StreamDetails
              id={id}
              streamTitle={streamData.name}
              streamGroups={streamData.streamGroups}
              description={streamData.description}
              setStreamData={setStreamData}
            ></StreamDetails>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Stream;
