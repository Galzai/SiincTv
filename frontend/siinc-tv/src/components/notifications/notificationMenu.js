import React, {useContext} from "react";
import style from './notifications.module.css';
import NotificationHandler from './notificationHandler'
import UserContext from "../../userContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
const { default: userActions } = require("../../user/userActions");


/**
 * @brief This displays details regarding the stream
 * @param {*} props 
 */
function NotificationMenu(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {reloadNotifications} = NotificationHandler();
    const userContext = useContext(UserContext);
    const numNotifications = (userContext.user && userContext.user.notifications) ? userContext.user.notifications.length : 0;


    function buildNotificationByType(notification)
    {
        switch(notification.type)
        {
            case "poke":
                return "YOU JUST GOT POKED SON"
        }
    }

    function clearNotification(id)
    {
        userActions.deleteNotification(id).then();
    }

    function mapNotifications(){
        if(userContext.user && userContext.user.notifications){
            return(userContext.user.notifications.map(notification=>
                <MenuItem>
                    {buildNotificationByType(notification)}
                    {notification.clearable && 
                    <IconButton aria-haspopup="true" onClick={()=>clearNotification(notification._id)}>
                        <CloseIcon/>
                    </IconButton>}
                </MenuItem>)
            );
            }
        }

        
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return(
    <div className={style.notificationDiv}>

        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Badge badgeContent={numNotifications} color="primary">
        <NotificationsIcon
        className={style.notificationButton}
        />
        </Badge>
      </IconButton>

        <Menu
                classes={{
                    paper: style.menuPaper, 
                    list: style.menuList
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
            <label>Notifications</label>
            {(numNotifications == 0) &&
                            <MenuItem>
                                        <div>You have no notifications.</div>
                            </MenuItem>

            }
            {mapNotifications()}
        </Menu>
      </div>
    );
}

export default NotificationMenu;