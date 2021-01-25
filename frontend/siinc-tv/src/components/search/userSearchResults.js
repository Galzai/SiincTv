import React, { useState, useContext } from "react";
import UserContext from "./../../userContext";
import InfiniteScroll from "react-infinite-scroller";
import UserActions from "../../user/userActions";
import UserPreview from "../previews/userPreview";

/**
 * This module is in charge of searching for users
 * 
 * @prop {string} searchString string describing what to search
 * @prop {Boolean} liveOnly true if the user has an active stream
 * @component
 * @category Frontend
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
    setResults({ streamers: [], page: 1, hasMoreResults: true });
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
      return <h1>0 Results found.</h1>;
    } else {
      return results.streamers.map((result, index) => {
        if (!userContext.user || result._id !== userContext.user._id) {
          if (!liveOnly || result.currentStream)
            return <UserPreview key={index} user={result} />;
        }
      });
    }
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchMoreData}
      style={{ display: "flex", flexDirection: "column-reverse" }}
      hasMore={results.hasMoreResults}
      loader={<h4>Loading...</h4>}
    >
      {displayResults()}
    </InfiniteScroll>
  );
}
export default UserSearchResults;
