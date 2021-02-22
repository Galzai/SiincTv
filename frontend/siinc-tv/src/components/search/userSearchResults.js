import React, { useState, useContext } from "react";
import UserContext from "./../../userContext";
import InfiniteScroll from "react-infinite-scroll-component";
import UserActions from "../../user/userActions";
import UserPreview from "../previews/userPreview";
import style from "./search.module.css";
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * This module is in charge of searching for users
 * 
 * @prop {string} searchString string describing what to search
 * @prop {Boolean} liveOnly true if the user has an active stream
 * @component
 * @category Frontend
 * @subcategory Search
 */
function UserSearchResults(props) {
  const userContext = useContext(UserContext);
  const [searchString, setSearchString] = useState(props.searchString);
  const [results, setResults] = useState({
    streamers: [],
    page: 1,
    hasMoreResults: true,
  });
  const [liveOnly, setLiveOnly] = useState(props.liveOnly);
  const [combinedDisplay] = useState(props.combinedDisplay);  
  const resStyle = combinedDisplay ? style.scrollableDivUsers : style.scrollableDivFullPage;

  /**
   * Fetches the next result page
   */
  function fetchMoreData() {
    UserActions.searchUsers(searchString, results.page).then((resultPage) => {
      if (
        !resultPage ||
        resultPage.length === 0 ||
        resultPage === "stream/no_results"
      ) {
        setResults({ hasMoreResults: false });
        return;
      }
      setResults({
        streamers: [...results.streamers, ...resultPage],
        page: results.page + 1,
        hasMoreResults: resultPage.length >= 20,
      });
    });
  }
  React.useEffect(() => {
    fetchMoreData();
  }, [searchString]);

  /**
   * Displays the search results
   */
  function displayResults() {
    // If the search string changed we reset everything
    if (searchString !== props.searchString) {
      setSearchString(props.searchString);
    }
    // If the search string changed we reset everything
    if (liveOnly !== props.liveOnly) {
      setLiveOnly(props.liveOnly);
    }

    // We return different views depending on what we are searching for
    if (!results.streamers || results.streamers.length === 0) {
      return <h1 className={style.noResults}>0 Results found.</h1>;
    } else {

      var resultComponenets = [];
      results.streamers.forEach((result, index) => {
      if (!liveOnly || result.currentStream)
          resultComponenets.push(<UserPreview key={index} user={result} />);
        
      });
      if(resultComponenets.length !== 0) return resultComponenets;
      return <h1 className={style.noResults}>0 Results found.</h1>;
    }
  }

  return (
    <div id="scrollableDiv" className={resStyle}>
    <InfiniteScroll
      dataLength={results.streamers ? results.streamers.length : 0} 
      next={() => {fetchMoreData()}}
      hasMore={results.hasMoreResults}
      scrollableTarget="scrollableDiv"
      loader={<CircularProgress></CircularProgress>}
      endMessage={
        <p style={{ textAlign: 'left' }}>
          <b>No more results</b>
        </p>
      }
    >
      {displayResults()}
    </InfiniteScroll>
    </div>
  );
}
export default UserSearchResults;
