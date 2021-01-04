

import {useContext, useState} from "react"
import style from './searchPage.module.css'
import StreamSearchResults from "../components/search/streamSearchResults";
import UserSearchResults from "../components/search/userSearchResults";

function SearchPage(props) {
    const searchString = props.match.params.searchString;
    const [resultType, setResultType] = useState("liveStream");

    return(

        <div className = {style.searchPage}>
            <h3>Search mode: </h3>
            <div className={style.resultTypeButtons}>
                <button className={style.resultTypeButton} onClick={()=>{setResultType("liveStream")}}>Live Streams</button>
                <button className={style.resultTypeButton} onClick={()=>{setResultType("users")}}>Users</button>
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