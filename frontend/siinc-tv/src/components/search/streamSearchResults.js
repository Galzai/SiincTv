import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import StreamActions from "../../stream/streamActions";
import LiveStreamPreview from "../previews/liveStreamPreview";

function StreamSearchResults(props) {
  const [searchString, setSearchString] = useState(props.searchString);
  const status = props.status;
  const [results, setResults] = useState({
    streamers: [],
    page: 1,
    hasMoreResults: true,
  });
  const [joinableOnly, setJoinableOnly] = useState(props.joinableOnly);

  function fetchMoreData() {
    console.log("Fetch");
    StreamActions.searchStreams(searchString, results.page, status).then(
      (resultPage) => {
        console.log(resultPage);
        if (
          !resultPage ||
          resultPage.length === 0 ||
          resultPage === "stream/no_results"
        ) {
          setResults({ hasMoreResults: false });
          return;
        }
        console.log(results);
        console.log("here");
        setResults({
          streamers: [...results.streamers, ...resultPage],
          page: results.page + 1,
          hasMoreResults: resultPage.length >= 20,
        });
      }
    );
  }
  React.useEffect(() => {
    console.log("useEffect");
    setResults({ streamers: [], page: 1, hasMoreResults: true });
  }, [joinableOnly, searchString]);

  function displayResults() {
    // If the search string changed we reset everything
    if (searchString != props.searchString) {
      setSearchString(props.searchString);
    }
    if (joinableOnly != props.joinableOnly) {
      setJoinableOnly(props.joinableOnly);
    }

    // We return different views depending on what we are searching for
    if (!results.streamers || results.streamers.length === 0) {
      return <h1>0 Results found.</h1>;
    }

    if (status === "Live") {
      return results.streamers.map((result, index) => {
        if (!joinableOnly || joinableOnly !== result.joinOnly) {
          console.log(joinableOnly);
          console.log(result);
          return <LiveStreamPreview key={index} streamData={result} />;
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
export default StreamSearchResults;
