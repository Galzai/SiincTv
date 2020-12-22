import style from './sidebar.module.css';
import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import UserContext from "../../userContext";
const { default: streamActions } = require("../../stream/streamActions");

function NavSiincHome(props) {
    return(
        <Link to="/">         
            <div className={style.siincIcon}></div>
        </Link>    
    )
}

function SideBar(props) {
    const userContext = useContext(UserContext);
    const currentStream = userContext.user ? userContext.user.currentStream : null;

    function closeStream()
    {
        streamActions.closeStream().then();
        window.location.reload();
    }

    return(
        <div className={style.sidebar}>
            <NavSiincHome></NavSiincHome>
            <div className={style.sidebarContent}>
                {currentStream && <div className={style.currentStreamDiv}>
                    <h3 className={style.sidebarTitle}>My current stream</h3>
                    <div className={style.currentStream}>
                        {currentStream.name ? currentStream.name : "Untitled stream"}
                    </div>
                    <button className={style.closeCurrentStreamBtn} onClick={closeStream}></button>
            </div>}

        </div>
        </div>
    );
}

export default SideBar;