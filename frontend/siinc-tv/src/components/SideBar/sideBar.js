import style from './sidebar.module.css';
import { Link } from "react-router-dom";

function NavSiincHome(props) {
    return(
        <Link to="/">         
            <div className={style.siincIcon}></div>
        </Link>    
    )
}

function SideBar(props) {

    return(
        <div className={style.sidebar}>
            <NavSiincHome></NavSiincHome>
        </div>
    );
}

export default SideBar;