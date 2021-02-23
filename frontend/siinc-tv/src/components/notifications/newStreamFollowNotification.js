import React from "react";
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';
import { withRouter } from "react-router-dom";



/**
 * notification sent to all followers when starting a stream
 * @component
 * @prop {notificationData} notification notification data
 * @category Frontend
 * @subcategory Notifications
 */
function NewStreamFollowNotification(props){

    const data = props.notification.data;

    function handleRedirect() {
        props.clearNotification(props.notification._id)
        props.history.push(`/stream_pages/${data.streamId}`);
    }

    return(

        <ListItem alignItems="flex-start" onClick={()=>{ handleRedirect() }}>
            <ListItemAvatar>
            {data.userImage &&
                <img className={style.userProfileCircle} src={data.userImage}/>
            }   
            </ListItemAvatar>
            <Grid>
            <Grid item>
            <label>{`${data.username} started a new stream.`}</label>
            </Grid>
            </Grid>
        </ListItem>

    );
}

export default withRouter(NewStreamFollowNotification)