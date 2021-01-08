import React, {useContext} from "react";
import style from './notifications.module.css';
import NotificationHandler from './notificationHandler'
import UserContext from "../../userContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CloseIcon from '@material-ui/icons/Close';
import 'react-toastify/dist/ReactToastify.css';
import JoinStreamRequestNotification from './joinStreamRequestNotification'
import JoinStreamRequestResponse from './JoinStreamRequestResponse'
import {FriendRequestReceived, FriendRequestAccepted} from "./friendRequestNotification"
import NewStreamFollowNotification from './newStreamFollowNotification'
const { default: userActions } = require("../../user/userActions");


function timeSince(date) {

    console.log(date);
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

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
                return "POKIE POKE POKE"

            case "joinStreamRequest":
                return <JoinStreamRequestNotification
                    notification={notification}/>;

            case "rejectJoinStreamRequest":
                return <JoinStreamRequestResponse
                notification={notification}
                response={false}
                />;

            case "friendRequestReceived":
                return <FriendRequestReceived
                notification={notification}
                />

            case "friendRequestAccepted":
                return <FriendRequestAccepted
                notification={notification}
                />

            case "acceptJoinStreamRequest":
                return <JoinStreamRequestResponse
                notification={notification}
                response={true}
                />;

            case "followStartedStream":
                return <NewStreamFollowNotification
                    notification={notification}
                    clearNotification={clearNotification}/>;
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
                    <List>
                  <ListItem >
                            {buildNotificationByType(notification)}
                        {notification.clearable && 
                        <IconButton edge="start" aria-haspopup="true" onClick={()=>clearNotification(notification._id)}>
                            <CloseIcon
                            className={style.closeButton}
                            />
                        </IconButton>}
                        </ListItem>
                     <ListItem >
                    <label className={style.dateStyle}>{`${timeSince(new Date(notification.date))} ago`}</label>
                    </ListItem>
                    </List>
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
                <div className={style.notificationTitleDiv}>
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