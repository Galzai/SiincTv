import React, {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import UserActions from '../../user/userActions';
import UserPreview from '../previews/userPreview';

function UserSearchResults(props) 
{   
    const [searchString, setSearchString] = useState(props.searchString);
    const [results, setResults] = useState({streamers:[], page: 1, hasMoreResults: true});


    function fetchMoreData(){
        
        console.log("Fetch");
        UserActions.searchUsers(searchString, results.page).then((resultPage)=>{
            console.log(resultPage);
            if((!resultPage)  || (resultPage.length === 0) || (resultPage ==='stream/no_results') ){
                setResults({hasMoreResults : false});
                return;
            }
            console.log(results)
                console.log("here")
                setResults({streamers:[...results.streamers, ...resultPage], page : results.page + 1, 
                    hasMoreResults : resultPage.length >= 20});
            
        });
    }
    React.useEffect(() => {
        console.log("useEffect")
        setResults({streamers:[], page: 1, hasMoreResults: true});
      }, [searchString]);

    function displayResults(){

        // If the search string changed we reset everything
        if(searchString != props.searchString)
        {
            setSearchString(props.searchString);
        }

        // We return different views depending on what we are searching for
        if((!results.streamers) || results.streamers.length === 0){
            return(<h1>0 Results found.</h1>);
        }

        else{
            return((results.streamers).map((result, index)=>
            {
                return(
                    <UserPreview key={index}
                    user={result}/>
                );

            }))               
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
export default UserSearchResults
