import React from "react";
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';
import { withRouter } from "react-router-dom";



/**
 * @brief Notification representing new follower
 * @prop {notificationData} notification notification data
 * @category Frontend
 * @subcategory Notifications
 */
function NewFollowerNotification(props){

    const data = props.notification.data;

    function handleRedirect() {
        props.clearNotification(props.notification._id)
        props.history.push(`/users/${data.userId}`);
    }

    return(

        <ListItem alignItems="flex-start" onClick={()=>{ handleRedirect() }}>
            <ListItemAvatar>
            {console.log(data.userImage)}
            {data.userImage &&
                <img className={style.userProfileCircle} src={data.userImage} />
            }   
            </ListItemAvatar>
            <Grid>
            <Grid item>
            <label>{`${data.username} is now following you!`}</label>
            </Grid>
            </Grid>
        </ListItem>

    );
}

export default withRouter(NewFollowerNotification)