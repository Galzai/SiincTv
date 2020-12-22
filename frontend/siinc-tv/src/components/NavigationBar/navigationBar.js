import style from './navbar.module.css';
import UserNavComponent from "./userNavComponent.js";
import NavSearchComponent from "./navSearchComponent.js"
import { withRouter } from 'react-router-dom';



function NavigationBar() {

    return(
        <div>
            <div className={style.navigationBar}>
                
                <NavSearchComponent></NavSearchComponent>
                <UserNavComponent></UserNavComponent>
                
            </div>
        </div>
    );
}

export default withRouter(NavigationBar);