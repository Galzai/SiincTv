import SingleStreamViewBox from '../components/liveStream/singleStreamingViewBox'
import SplitStreamViewBox from '../components/liveStream/splitScreenViewBox'
import StreamDetails from '../components/liveStream/streamDetails'
import StreamActions from '../stream/streamActions'
import userUtils from '../user/userUtils'
import Chat from '../chat/chat'
import {useContext, useState} from "react"
import UserContext from "../userContext";
import style from '../components/liveStream/liveStream.module.css'
import Hidden from '@material-ui/core/Hidden'
import Container from '@material-ui/core/Container'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function Stream(props) {
    const userContext= useContext(UserContext);
    const [streamData] = useState(props.streamData);
    const [isSplit, setIsSplit] = useState(false);

    // Sends a join stream request to the stream creator
    function requestToJoinStream()
    {   
        const user = userContext.user;
        const data = {
            displayName: user.username,
            userImage: userUtils.assignImage(user),
            youtubeId: user.googleData ? user.googleData.youtubeId : null   
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
      })

    return(
        <div>
            <ThemeProvider theme={theme}>
                <Hidden implementation='css' initialWidth='md' mdDown>
                    <Chat className={style.chatBox}
                        userId = {userContext.user ? userContext.user.username : ""}
                        roomId={streamData._id}
                    />
                </Hidden>
                <Container maxWidth="xl">
                    <div className={style.streamPage}>
                        <div>
                            {(!isSplit) && <SingleStreamViewBox
                                currentStreamer={streamData.creator}
                                streamGroups={streamData.streamGroups}  
                                >
                            </SingleStreamViewBox>}
                            {(isSplit) && <SplitStreamViewBox
                                currentStreamer={streamData.creator}
                                streamGroups={streamData.streamGroups}  
                                >
                            </SplitStreamViewBox>}
                        <button className={style.joinButton} onClick={()=>{setIsSplit(!isSplit)}} >{isSplit ? "Single main": "Split screen"}</button>
                        <button className={style.viewButton} onClick={requestToJoinStream}>Request to join</button>
                        </div>
                            <StreamDetails
                            id={streamData._id}
                            streamTitle={streamData.name}
                            streamGroups={streamData.streamGroups}  
                            description={streamData.description}
                            >
                            </StreamDetails>
                    </div> 
                </Container>
            </ThemeProvider>
    </div>
                
    )
}

export default Stream;