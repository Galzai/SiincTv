import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';
import UserContext from "../../userContext";

/**
 * @brief Notification representing received friend request
 * @param {*} props 
 */
export function FriendRequestReceived(props){

    const data = props.notification.data;
    const notification = props.notification;

    function rejectFriendRequest()
    {
        //streamActions.rejectRequestToJoin(notification)
        console.log("Add later reject friend request")
    }

    /**
     * Accepts the request
     */
    function acceptFriendRequest()
    {
        //streamActions.acceptRequestToJoin(notification)
        console.log("Add later accept friend request")
    }

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
            <label>{`${data.username} has sent you a friend request.`}</label>
            </Grid>
            <Grid item>
                <Box display="flex">
                <Box  p={1}>
                    <Button onClick={acceptFriendRequest} size="small" variant="outlined" color="primary">Accept</Button>
                </Box>
                <Box p={1}>
                    <Button onClick={rejectFriendRequest} size="small" variant="outlined" color="primary">Reject</Button>
                </Box >
            </Box>
            </Grid>
            </Grid>

        </ListItem>

    );
}

/**
 * @param {*} props 
 */
export function FriendRequestAccepted(props){

    const data = props.notification.data;

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
            <label>{`${data.username} has accepted your friend request.`}</label>
            </Grid>
            </Grid>

        </ListItem>

    );
}
