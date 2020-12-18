import style from './navbar.module.css';
import {useState} from "react"
import useWindowDimensions from "../../useWindowDimensions.js"
import { withRouter } from 'react-router-dom';

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

    function handleClick(){
        props.history.push(`/search/${search}`);

    }

    function handleKeypress(e) {
        //it triggers by pressing the enter key
            if (e.keyCode === 13) {
                props.history.push(`/search/${search}`);
                e.preventDefault();
            }
        };

    return(
        <div className={style.navSearchContainer} >{/*style={fieldStyle.constainer} >*/}
            <input className={style.navSearchInput} type="text" required value={search}
                    placeholder={"Search stream names or users"} onKeyDown={handleKeypress} onChange={e => setSearch(e.target.value)}/>
            <div className={style.navClearButtonContainer}>
                <button className={style.navClearButton} onClick={()=>{setSearch("")}}></button>
            </div>  
            <div className={style.navSearchSeperator}></div>
            <div className={style.navSearchButtonContainer}>
                <button className={style.navSearchButton} onClick={handleClick}></button>
            </div>
        </div>
        
    );
}

export default withRouter(NavSearchComponent)