import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';


/**
 * This Componenet is in charge of the resonse notification received to join stream request
 * 
 * @prop {notificationData} notification the data of the notification
 * @prop {String} response accepted or rejected
 * @component
 * @category Frontend
 * @subcategory Notifications
 */
function JoinStreamRequestResponse(props){

    const data = props.notification.data;
    const response = props.response;
    const messageString = response ? 'accepted' : 'declined';

    return(


        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            {data.userImage &&<img className={style.userProfileCircle}
                src={data.userImage} 
            /> 
            }
            </ListItemAvatar>
            <Grid>
            <Grid item>
            <label>{`${data.displayName} has ${messageString} your request to join the stream.`}</label>
            </Grid>
            </Grid>

        </ListItem>

    );
}
export default JoinStreamRequestResponse;