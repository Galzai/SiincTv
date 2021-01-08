

import {useContext, useState} from "react"
import style from './searchPage.module.css'
import StreamSearchResults from "../components/search/streamSearchResults";
import UserSearchResults from "../components/search/userSearchResults";
import Hidden from '@material-ui/core/Hidden';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function SearchPage(props) {
    const searchString = props.match.params.searchString;
    const [resultType, setResultType] = useState("liveStream");

    const theme = createMuiTheme({
        breakpoints: {
          values: {
            xs: 475,
            sm: 1000,
            md: 1076,
            lg: 1440,
            xl: 1920,
          },
        },
      });

    return(

        <div className = {style.searchPage}>
           {resultType === "liveStream" &&  <StreamSearchResults
            searchString={searchString}
            status={"Live"}
            />}
            {resultType === "users" &&  <UserSearchResults
            searchString={searchString}
            />}
            <ThemeProvider theme={theme}>
                <Hidden implementation='css' initialWidth='sm' smDown>
                    <div className={style.filterContainer}>
                        <div className={style.resultTypeButtons}>
                            <button className={style.resultTypeButton} onClick={()=>{setResultType("liveStream");}}>Live Streams</button>
                            <button className={style.resultTypeButton} onClick={()=>{setResultType("users")}}>Users</button>
                        </div>
                    </div>
                </Hidden>
            </ThemeProvider>
        </div>       
    )
}

export default SearchPage;