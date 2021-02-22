import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import StreamActions from "../../stream/streamActions";
import LiveStreamPreview from "../previews/liveStreamPreview";
import CircularProgress from '@material-ui/core/CircularProgress';
import style from "./search.module.css";

/**
 * This modules is in charge of displaying the results of searching for streams
 * 
 * @prop {string} searchString string describing what to search
 * @prop {Boolean} joinableOnly true if the stream is not invite only
 * @component
 * @category Frontend
 * @subcategory Search
 */
function StreamSearchResults(props) {
  const [searchString, setSearchString] = useState(props.searchString);
  const status = props.status;
  const [results, setResults] = useState({
    streamers: [],
    page: 1,
    hasMoreResults: true,
  });
  const [joinableOnly, setJoinableOnly] = useState(props.joinableOnly);
  const [combinedDisplay] = useState(props.combinedDisplay);  
  const resStyle = combinedDisplay ? style.scrollableDivStreams : style.scrollableDivFullPage;
  /**
   * Fetches more data (next page)
   */
  function fetchMoreData() {
    StreamActions.searchStreams(searchString, results.page, status).then(
      (resultPage) => {
        if (
          !resultPage ||
          resultPage.length === 0 ||
          resultPage === "stream/no_results"
        ) {
          setResults({streamers:results.streamers, page: results.page, hasMoreResults: false });
          return;
        }
        setResults({
          streamers: [...results.streamers, ...resultPage],
          page: results.page + 1,
          hasMoreResults: resultPage.length >= 5,
        });
      }
    );
  }

  React.useEffect(() => {
    fetchMoreData();
  }, [joinableOnly, searchString]);

  /**
   * Displays the results of the search
   */
  function displayResults() {
    // If the search string changed we reset everything
    if (searchString !== props.searchString) {
      setSearchString(props.searchString);
    }
    if (joinableOnly !== props.joinableOnly) {
      setJoinableOnly(props.joinableOnly);
    }

    // We return different views depending on what we are searching for
    if (!results.streamers || results.streamers.length === 0) {
      return <h1 className={style.noResults}>0 Results found.</h1>;
    }

    if (status === "Live") {
      var resultComponenets = [];
      results.streamers.forEach((result, index) => {
        if (!joinableOnly || joinableOnly !== result.joinOnly) {
          resultComponenets.push(<LiveStreamPreview key={index} streamData={result} />);
        }
      });
      return resultComponenets;
    }
  }

  return (
<div id="scrollableDivStream" className={resStyle}>
    <InfiniteScroll
      dataLength={results.streamers ? results.streamers.length : 0} 
      next={() => {fetchMoreData()}}
      hasMore={results.hasMoreResults}
      loader={<CircularProgress></CircularProgress>}
      scrollableTarget="scrollableDivStream"
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
export default StreamSearchResults;
