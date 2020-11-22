import style from './navbar.module.css';
import UserNavComponent from "./userNavComponent.js";

function NavigationBar() {

    return(
        <div>
            <div className={style.navigationBar}>
                <div className={style.navItem}><img src="https://www.shareicon.net/data/32x32/2016/01/09/700633_stars_512x512.png"></img></div>
                <div className={style.navItem}>siinc</div>
                <div className={style.navItem}><img src="https://www.shareicon.net/data/32x32/2016/01/09/700633_stars_512x512.png"></img></div>
                <div className={style.navItem}><textarea defaultValue="search"></textarea></div>
                <div className={style.navItem}>profile : </div>
                <div className={style.navItem}><img src="https://www.shareicon.net/data/32x32/2016/01/09/700633_stars_512x512.png"></img></div>
               <UserNavComponent></UserNavComponent>
                
            </div>
        </div>
    );
}

export default NavigationBar;