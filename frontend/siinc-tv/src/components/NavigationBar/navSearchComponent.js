import style from './navbar.module.css';
import {useState} from "react"
import useWindowDimensions from "../../useWindowDimensions.js"
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

/**
 * @brief search component for navigation bar
 * 
 * @component
 * @category Frontend
 * @subcategory NavBar
 */
function NavSearchComponent(props) {
    const [search, setSearch] = useState('');

    // ---------------- broken dynamically changing search field ---------------
    const windoDims = useWindowDimensions();
    const [width, setWidth] = useState(400); 
    if(windoDims.width < 900) {
        const newWidth = (windoDims.width > 600) ? (windoDims.width - 500) : 100 ;
        if( newWidth !== width ) {
            setWidth(newWidth);
        }
    }
    // --------------------------------------------------------------------------

    function handleClick(){
        props.history.push(`/search/${search}`);
        window.location.reload();

    }

    function handleKeypress(e) {
        //it triggers by pressing the enter key
            if (e.keyCode === 13) {
                e.preventDefault(); 
                props.history.push(`/search/${search}`);
                window.location.reload();
          }
        };

    return(
        <div className={style.navSearchContainer} >{/*style={fieldStyle.constainer} >*/}
            <input className={style.navSearchInput} type="text" required value={search}
                    placeholder={"Search stream names or users"} onKeyDown={handleKeypress} onChange={e => setSearch(e.target.value)}/>
            <div className={style.navClearButtonContainer}>
                <ClearIcon className={style.navClearButton} fontSize="small" onClick={()=>{setSearch("")}}></ClearIcon>
            </div>  
            <div className={style.navSearchSeperator}></div>
            <div className={style.navSearchButtonContainer}>
                <SearchIcon className={style.navSearchButton} fontSize="small" onClick={handleClick}></SearchIcon>
            </div>
        </div>
        
    );
}

export default withRouter(NavSearchComponent)