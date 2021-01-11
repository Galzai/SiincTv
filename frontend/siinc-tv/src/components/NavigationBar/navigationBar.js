import style from './navbar.module.css';
import UserNavComponent from "./userNavComponent.js";
import NavSearchComponent from "./navSearchComponent.js"
import { withRouter, Link } from 'react-router-dom';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import UserContext from "../../userContext";
import {useContext} from 'react';

function NavSiincHome(props) {
    return(
        <Link to="/">         
            <div className={style.siincIcon}></div>
        </Link>    
    )
}

function NavCreateStreamButton(props) {
    return(
         <Link to="/create_stream">         
             <VideoCallIcon className={style.navCreateStreamButton} fontSize='large'/>
        </Link> 
    );  
}

function NavigationBar() {
    const userContext = useContext(UserContext);
    return(
        <div>
            <div className={style.navigationBar}>
                <NavSiincHome></NavSiincHome>
                {userContext.user && <NavCreateStreamButton></NavCreateStreamButton>}
                <UserNavComponent></UserNavComponent>
                <NavSearchComponent></NavSearchComponent>
                
            </div>
        </div>
    );
}

export default withRouter(NavigationBar);