import { useContext, useState } from "react";
import style from "./searchPage.module.css";
import StreamSearchResults from "../components/search/streamSearchResults";
import UserSearchResults from "../components/search/userSearchResults";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import PersonIcon from "@material-ui/icons/Person";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function SearchPage(props) {
  const searchString = props.match.params.searchString;
  const [resultType, setResultType] = useState("liveStream");
  const [joinableOnly, setjoinAbleOnly] = useState(false);
  const [liveOnly, setLiveOnly] = useState(false);


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


    function setCurrentFilters()
    {
        if(resultType==="liveStream")
        return(
            <div>
                              <ListItem>
            <FormControlLabel
                control={<Checkbox checked={joinableOnly} onClick={(event=>{setjoinAbleOnly(event.target.checked)})} name="checkedA" />}
                label="Joinable streams only"
            />
            </ListItem>
            </div>
        )
    }

  return (
    <div className={style.searchPage}>
      {resultType === "liveStream" && (
        <StreamSearchResults searchString={searchString} status={"Live"}
        joinableOnly={joinableOnly} />
      )}
      {resultType === "users" && (
        <UserSearchResults searchString={searchString} />
      )}
      <ThemeProvider theme={theme}>
        <Hidden implementation="css" initialWidth="sm" smDown>
          <div className={style.filterContainer}>
            <List
              component="nav"
              aria-label="main mailbox folders"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  color="inherit"
                >
                  <div>
                    <label className={style.searchFilterTitle}>
                      Search result for...
                    </label>
                    <label className={style.searchingForTitle}>
                      {searchString}
                    </label>
                  </div>
                </ListSubheader>
              }
            >
              <ListItem></ListItem>
              <hr></hr>
              <ListItem>
                <label className={style.optionTitle}>Searching for...</label>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setResultType("liveStream");
                }}
              >
                <ListItemIcon>
                  <VideoLabelIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Live Streams" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setResultType("users");
                }}
              >
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              <hr></hr>
              <ListItem>
                <label className={style.optionTitle}>Filters</label>
              </ListItem>
              {setCurrentFilters()}
            </List>
          </div>
        </Hidden>
      </ThemeProvider>
    </div>
  );
}

export default SearchPage;
