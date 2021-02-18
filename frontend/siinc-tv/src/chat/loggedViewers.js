import React, { useEffect, useState, useContext } from "react";
import style from "./chat.module.css";
import userUtils from "../user/userUtils"
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/IconButton";
import PeopleIcon from '@material-ui/icons/People';
import MenuItem from "@material-ui/core/MenuItem";
const dataIndex = 1;

/**
 * This displays all the logged in users currently in the stream
 * 
 * @prop {Function} banUnban function for banning or unbanning a user from chat
 * @prop {Object} loggedViewers all the users that are currently logged to the stream
 * @prop {Boolean} isOwner true if the user is the owner of the stream
 * @category Frontend
 * @component
 */
function LoggedViewers(props) {
    const banUnbanFunc = props.banUnban;
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedViewers, setLoggedViewers] = useState(props.loggedViewers);
    const [isOwner] = useState(props.isOwner);
    useEffect(() => {
        setLoggedViewers(props.loggedViewers);
    },[props.loggedViewers]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    function banUnban(id){
        console.log(id);
        banUnbanFunc(id);
    };
    function mapViewers(){
        return((loggedViewers).map((viewer, index)=>{
            return(
                <MenuItem>
                    <div className={style.viewerDiv}>
                        <img alt="" className={style.streamerCircle}
                            src={userUtils.assignImage(viewer[dataIndex].userData)}/>
                        <div className={style.viewer}
                        onClick={()=>(props.history.push(`/users/${viewer[dataIndex].userData.username}`))}> 
                            {viewer[dataIndex].userData.username}
                        </div>
                        {isOwner && !viewer[dataIndex].banned && <Button onClick={()=>banUnban(viewer[0])} size="small" variant="outlined" color="primary">Ban</Button>}
                        {isOwner && viewer[dataIndex].banned && <Button onClick={()=>banUnban(viewer[0])} size="small" variant="outlined" color="primary">Unban</Button>}
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