import userActions from "../user/userActions"
import {useState, useEffect} from 'react'

function HomePage(props) {
    const [usernames, setUsernames] = useState([]);

    const getUsernames = async()=>{
        const usernames = await  userActions.getUsernameList();
        console.log("starting page");
        if(usernames === null){
            console.log("Couldnt get users");
        }
        else {
            setUsernames(usernames);
        }
    }
    getUsernames();

    const buttons = new Array(usernames.length);
    for(let i = 0 ; i < usernames.length ; i++) {        
        //console.log(usernames[i]);
        buttons[i] = <button key={i}>{usernames[i]}</button>
    }


    return(
        <div>
            {buttons}
        </div>
        
    )
}

export default HomePage;