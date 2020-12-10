import React, {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import StreamActions from '../../stream/streamActions';
import LiveStreamPreview from '../previews/liveStreamPreview';

function StreamSearchResults(props) 
{   
    const [results, setResults] = useState({streamers:[], page: 1, hasMoreResults: true});
    const searchString = props.searchString;
    const status = props.status;


    function fetchMoreData(){
        
        console.log("Fetch");
        StreamActions.searchStreams(searchString, results.page, status).then((resultPage)=>{
            console.log(resultPage);
            if((!resultPage) || (resultPage.len === 0) || (resultPage ==='stream/no_results') ){
                setResults({hasMoreResults : false});
                return;
            }
            console.log(results)
            setResults({streamers:[...results.streamers, resultPage[0]], page : results.page + 1});
        });
    }

    function displayResults(){
        console.log(results.streamers.length);
        // We return different views depending on what we are searching for
        if(results === '/stream/no_results'){
            return(<h1>No Results;</h1>);
        }
        console.log("result",results);
        if(status === "Live"){
            return(results.streamers.map((result, index)=>
                        <LiveStreamPreview key={index}
                        streamData={result}/>))
                        
        }
    }

    return(
            
        <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        hasMore={results.hasMoreResults}
        loader={<h4>Loading...</h4>}
        >
        {displayResults()}
        </InfiniteScroll>
    );
}
export default StreamSearchResults
