import style from './navbar.module.css';
import UserNavComponent from "./userNavComponent.js";
import NavSearchComponent from "./navSearchComponent.js"
import { withRouter, Link } from 'react-router-dom';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import UserContext from "../../userContext";
import {useContext} from 'react';

/**
 * This component represents the navigation bar
 * 
 * @component
 * @category Frontend
 * @subcategory Menu
 */
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

/**
 * @brief Homepage button for navigation bar
 * 
 * @component
 * @category Frontend
 * @subcategory NavBar
 */
function NavSiincHome(props) {
    return(
        <Link to="/">         
            <div className={style.siincIcon}></div>
        </Link>    
    )
}

/**
 * @brief create stream button for navigation bar
 * 
 * @component
 * @category Frontend
 * @subcategory NavBar
 */
function NavCreateStreamButton(props) {
    return(
         <Link to="/create_stream">         
             <VideoCallIcon className={style.navCreateStreamButton} fontSize='large'/>
        </Link> 
    );  
}


export default withRouter(NavigationBar);