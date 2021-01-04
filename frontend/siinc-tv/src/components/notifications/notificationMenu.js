import React, {useContext} from "react";
import style from './notifications.module.css';
import NotificationHandler from './notificationHandler'
import UserContext from "../../userContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import 'react-toastify/dist/ReactToastify.css';
import JoinStreamRequestNotification from './joinStreamRequestNotification'
import JoinStreamRequestResponse from './JoinStreamRequestResponse'
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
                return "YOU JUST GOT POKED SON";

            case "joinStreamRequest":
                return <JoinStreamRequestNotification
                    notification={notification}/>;

            case "rejectJoinStreamRequest":
                return <JoinStreamRequestResponse
                notification={notification}
                response={false}
                />;

            case "acceptJoinStreamRequest":
                return <JoinStreamRequestResponse
                notification={notification}
                response={true}
                />;
        }
    }

    function clearNotification(id)
    {
        userActions.deleteNotification(id).then();
    }

    function clearAllNotifications()
    {
        userActions.clearNotifications().then();
    }

    function mapNotifications(){
        if(userContext.user && userContext.user.notifications){
            return(userContext.user.notifications.reverse().map(notification=>
                <MenuItem divider>
                    {buildNotificationByType(notification)}
                    {notification.clearable && 
                    <IconButton aria-haspopup="true" onClick={()=>clearNotification(notification._id)}>
                        <CloseIcon
                         className={style.closeButton}
                        />
                    </IconButton>}
                </MenuItem>        
                )
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
                        paper:  style.menuPaper,
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
                <div>
                    <label className={style.menuTitle}>Notifications</label>
                    {(numNotifications != 0) && <Button className={style.clearNotificationsButton} onClick={clearAllNotifications}>Clear Notifications</Button>}
                </div>

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