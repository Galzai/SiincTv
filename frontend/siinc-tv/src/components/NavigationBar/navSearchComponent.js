import style from './navbar.module.css';
import {useState} from "react"
import useWindowDimensions from "../../useWindowDimensions.js"
import streamActions from '../../stream/streamActions';

function NavSearchComponent(props) {
    const [search, setSearch] = useState('');

    // ---------------- broken dynamically changing search field ---------------
    const window = useWindowDimensions();
    const [width, setWidth] = useState(400); 
    if(window.width < 900) {
        const newWidth = (window.width > 600) ? (window.width - 500) : 100 ;
        if( newWidth != width ) {
            setWidth(newWidth);
        }
    }
    const fieldStyle = { constainer: {width: width} };
    // --------------------------------------------------------------------------

    return(
        <div className={style.navSearchContainer} >{/*style={fieldStyle.constainer} >*/}
            <input className={style.navSearchInput} type="text" required value={search}
                    placeholder={"Search"} onChange={e => setSearch(e.target.value)}/>
            <div className={style.navClearButtonContainer}>
                <div className={style.navClearButton}></div>
            </div>  
            <div className={style.navSearchSeperator}></div>
            <div className={style.navSearchButtonContainer}>
                <div className={style.navSearchButton}></div>
            </div>
        </div>
        
    );
}

export default NavSearchComponent