import { useState,useEffect } from "react";
import style from "./searchPage.module.css";
import StreamSearchResults from "../components/search/streamSearchResults";
import UserSearchResults from "../components/search/userSearchResults"; 
import CombinedSearch from "../components/search/combinedSearch";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import PersonIcon from "@material-ui/icons/Person";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";

/**
 * This class is in charge of handling the search page
 * 
 * @prop {String} match.params.searchString the string that of the search phrase that redirected to this page
 * @component
 * @category Frontend
 * @subcategory Pages
 */
function SearchPage(props) {
  const searchString = props.match.params.searchString;
  const [resultType, setResultType] = useState("combined");
  const [joinableOnly, setjoinAbleOnly] = useState(false);
  const [liveOnly, setLiveOnly] = useState(false);

  useEffect(()=>{

  }, [props.match.params.searchString])
  
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

  const ListItem = withStyles({
    root: {
      "&$selected": {
        backgroundColor: "red",
        color: "white",
      },
      "&$selected:hover": {
        backgroundColor: "purple",
        color: "white",
      },
      "&:hover": {
        backgroundColor: "#30165B",
        color: "white",
      },
    },
    selected: {},
  })(MuiListItem);

  function setCurrentFilters() {
    if (resultType === "liveStream") {
      return (
        <div>
          <ListItem style={{ opacity: "0.7" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={joinableOnly}
                  onClick={(event) => {
                    setjoinAbleOnly(event.target.checked);
                  }}
                  name="checkedA"
                  style={{ color: "#FFFFFF", opacity: "0.7" }}
                />
              }
              label="Joinable streams only"
            />
          </ListItem>
        </div>
      );
    }
    if (resultType === "users") {
      return (
        <div>
          <ListItem style={{ opacity: "0.7" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={liveOnly}
                  onClick={(event) => {
                    setLiveOnly(event.target.checked);
                  }}
                  name="checkedA"
                  style={{ color: "#FFFFFF", opacity: "0.7" }}
                />
              }
              label="Live users only"
            />
          </ListItem>
        </div>
      );
    }
  }

  function shortenText(text){
    let maxLen = 35;
    if(text.length > maxLen){
      return text.slice(0, maxLen)+"...";
    }
    return text.length;
  }

  return (
    <div className={style.searchPage}>
        {resultType === "combined" && (
        <CombinedSearch
          searchString={searchString}
        />
      )}
      {resultType === "liveStream" && (
        <StreamSearchResults
          searchString={searchString}
          status={"Live"}
          joinableOnly={joinableOnly}
        />
      )}
      {resultType === "users" && (
        <UserSearchResults searchString={searchString} liveOnly={liveOnly} />
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
                      Search results for
                    </label>
                    <label className={style.searchingForTitle}>
                      {shortenText(searchString)}
                    </label>
                  </div>
                </ListSubheader>
              }
            >
              <hr className={style.filterBreak}></hr>
              <h2 className={style.optionTitle}>Searching for</h2>
              <ListItem
                button
                onClick={() => {
                  setResultType("liveStream");
                }}
              >
                <ListItemIcon>
                  <VideoLabelIcon
                    style={{ color: "#FFFFFF", opacity: "0.7" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Live Streams"
                  style={{ opacity: "0.7" }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setResultType("users");
                }}
              >
                <ListItemIcon>
                  <PersonIcon style={{ color: "#FFFFFF", opacity: "0.7" }} />
                </ListItemIcon>
                <ListItemText primary="Users" style={{ opacity: "0.7" }} />
              </ListItem>
              <hr className={style.filterBreak}></hr>
              <h2 className={style.optionTitle}>Filters</h2>
              {setCurrentFilters()}
            </List>
          </div>
        </Hidden>
      </ThemeProvider>
    </div>
  );
}

export default SearchPage;
