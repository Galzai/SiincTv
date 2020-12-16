

import {useContext, useState} from "react"
import style from './searchPage.module.css'
import StreamSearchResults from "../components/search/streamSearchResults";
import UserSearchResults from "../components/search/userSearchResults";

function SearchPage(props) {
    const searchString = props.match.params.searchString;
    const [resultType, setResultType] = useState("liveStream");

    return(

        <div>
            <div className={style.ResultTypeButtons}>
                <button onClick={()=>{setResultType("liveStream")}}>Live Streams</button>
                <button onClick={()=>{setResultType("users")}}>Users</button>
            </div>
           {resultType === "liveStream" &&  <StreamSearchResults
            searchString={searchString}
            status={"Live"}
            />}
            {resultType === "users" &&  <UserSearchResults
            searchString={searchString}
            />}
        </div>       
    )
}

export default SearchPage;