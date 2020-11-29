import style from './navbar.module.css';
import UserNavComponent from "./userNavComponent.js";
import NavSearchComponent from "./navSearchComponent.js"
import {useContext} from "react"
import UserContext from "../../userContext";
import { Link } from "react-router-dom";

function NavCreateStreamButton(props) {
    return(
         <Link to="/create_stream">         
             <div className={style.navCreateStreamButton}>
             </div> 
        </Link> 
    );  
}

function NavSiincHome(props) {
    return(
        <Link to="/">         
            <div className={style.siincIcon}></div>
        </Link>    
    )
}

function NavigationBar() {
    const userContext = useContext(UserContext)

    return(
        <div>
            <div className={style.navigationBar}>
                <NavSiincHome></NavSiincHome>
                {userContext.user && <NavCreateStreamButton></NavCreateStreamButton>}
                <NavSearchComponent></NavSearchComponent>
                <UserNavComponent></UserNavComponent>
                
            </div>
        </div>
    );
}

export default NavigationBar;