import React, { useEffect, useState } from "react";
import style from "./chat.module.css";
import userUtils from "../user/userUtils"
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/IconButton";
import PeopleIcon from '@material-ui/icons/People';
import MenuItem from "@material-ui/core/MenuItem";
const dataIndex = 1;

function LoggedViewers(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loggedViewers] = useState(props.loggedViewers);
    useEffect(() => {
    },[]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    function mapViewers(){
        return((loggedViewers).map((viewer, index)=>{
            console.log(viewer[dataIndex].userData);
            return(
                <MenuItem>
                    <div className={style.viewerDiv}>
                        <img alt="" className={style.streamerCircle}
                            src={userUtils.assignImage(viewer[dataIndex].userData)}/>
                        <div className={style.viewer}
                        onClick={()=>(props.history.push(`/users/${viewer[dataIndex].userData.username}`))}> 
                            {viewer[dataIndex].userData.username}
                        </div>
                        {!viewer[dataIndex].banned && <Button size="small" variant="outlined" color="primary">Ban</Button>}
                    </div>
                    </MenuItem>
            )          
        })) ;
    }

    return (
        <div>
            <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}>
                <PeopleIcon className={style.notificationButton} />
            </IconButton>
            <Menu
            classes={{
            paper: style.menuPaper,
            list: style.menuList,
            }}
            id="simple-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
        <div className={style.notificationTitleDiv}>
          <label className={style.menuTitle}>Viewers</label>
          </div>
            {mapViewers()}
            </Menu>
        </div>
    )
}

export default LoggedViewers