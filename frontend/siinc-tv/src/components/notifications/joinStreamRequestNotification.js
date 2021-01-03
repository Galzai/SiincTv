import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';

/**
 * @brief This holds all our streamers
 * @param {*} props 
 */
function JoinStreamRequestNotification(props){

    const data = props.notification.data;
    const notificationId = props.notification._id;

    return(


        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            {data.userImage &&<img className={style.userProfileCircle}
                src={data.userImage} 
            > 
            
            </img>}
            </ListItemAvatar>
            <Grid>
            <Grid item>
            <label>{`${data.displayName} would like to stream with you`}</label>
            </Grid>
            <Grid item>
                <Box display="flex">
                <Box  p={1}>
                    <Button size="small" variant="outlined" color="primary">Accept</Button>
                </Box>
                <Box p={1}>
                    <Button   size="small" variant="outlined" color="primary">Reject</Button>
                </Box >
            </Box>
            </Grid>
            </Grid>

        </ListItem>

    );
}
export default JoinStreamRequestNotification;