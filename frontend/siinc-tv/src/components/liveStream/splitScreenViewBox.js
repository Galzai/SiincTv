import React, {useState} from "react";
import LiveStream from "./liveStream";
import style from './liveStream.module.css'
import Container from '@material-ui/core/Container'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }

function SplitScreenViewBox(props){

    // The initial current streamer is the host
    const [streamGroups, setStreamGroups] = useState(props.streamGroups);

    const theme = createMuiTheme({
        breakpoints: {
          values: {
            xs: 470,
            sm: 1000,
            md: 1240,
            lg: 1440,
            xl: 1920,
          },
        },
      });

    function generateSplitStream(){
        const streamers = flatten(streamGroups);
        console.log(streamers);
        return(streamers.map(streamer=>{
            return(
                <ThemeProvider theme={theme}>
                        <Container maxWidth="xs"> 
                            <div className={style.splitScreen}>
                                <LiveStream
                                    key={streamer.displayName}
                                    streamer={streamer}
                                    muted={true}
                                ></LiveStream>
                            </div>
                        </Container>
                </ThemeProvider>
            )}
        ));
    }

    return(
        <div className={style.splitStreamDiv}>
        {generateSplitStream()}
        </div>

    );
}

export default SplitScreenViewBox;