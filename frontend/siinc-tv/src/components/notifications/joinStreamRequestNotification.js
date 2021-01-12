import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';
import UserContext from "../../userContext";
import streamActions from '../../stream/streamActions.js'

/**
 * @brief This holds all our streamers
 * @param {*} props 
 */
function JoinStreamRequestNotification(props){

    const data = props.notification.data;
    const notification = props.notification;

    /**
     * Rejects the request
     */
    function rejectStreamJoinRequest()
    {
        streamActions.rejectRequestToJoin(notification)
    }

    /**
     * Accepts the request
     */
    function acceptStreamJoinRequest()
    {
        streamActions.acceptRequestToJoin(notification)
    }

    return(


        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            {data.userImage &&<img className={style.userProfileCircle}
                src={data.userImage} 
            />}
            </ListItemAvatar>
            <Grid>
            <Grid item>
            <label>{`${data.displayName} would like to stream with you.`}</label>
            </Grid>
            <Grid item>
                <Box display="flex">
                <Box  p={1}>
                    <Button onClick={acceptStreamJoinRequest} size="small" variant="outlined" color="primary">Accept</Button>
                </Box>
                <Box p={1}>
                    <Button onClick={rejectStreamJoinRequest} size="small" variant="outlined" color="primary">Reject</Button>
                </Box >
            </Box>
            </Grid>
            </Grid>

        </ListItem>

    );
}
export default JoinStreamRequestNotification;