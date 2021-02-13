import React, { useState, useEffect } from "react";
import style from "./search.module.css";
import StreamSearchResults from "./streamSearchResults";
import UserSearchResults from "./userSearchResults";

/**
 * This component shows a preview of stream and user searches
 * 
 * @prop {String} match.params.searchString the string that of the search phrase that redirected to this page
 * @component
 * @category Frontend
 */
function CombinedSearch(props){
    const [searchString, setSearchString] = useState(props.searchString);

    useEffect(()=>{
    }, [searchString])

    return(
        <div>
            <h2>Users</h2>
            <UserSearchResults searchString={searchString} liveOnly={false} combinedDisplay={true} />
            <hr className={style.filterBreak} ></hr>
            <h2>Streams</h2>
            <StreamSearchResults
            searchString={searchString}
            status={"Live"}
            joinableOnly={false}
            combinedDisplay={true}
            />
        </div>
    )
}

export default CombinedSearch;
