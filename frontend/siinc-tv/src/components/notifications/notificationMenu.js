import React, {useState} from "react";
import NotificationHandler from './notificationHandler'
import UserContext from "../userContext";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * @brief This displays details regarding the stream
 * @param {*} props 
 */
function NotificationMenu(props){
    const {reloadNotifications} = NotificationHandler(id);
    const userContext = useContext(UserContext);


    function buildNotificationByType(notification)
    {
        switch(notification.type)
        {
            case "poke":
                return "YOU JUST GOT POKED SON"
        }
    }

    function mapNotifications(){
        if(userContext.user && userContext.user.notifications){
            return(userContext.user.notifications.map(notification=>
                <MenuItem>
                    {buildNotificationByType(notification)}
                </MenuItem>)
            );
            }
        }

    return(
    <div>
        <Menu>
            {mapNotifications()}
        </Menu>
      </div>
    );
}

export default NotificationMenu;