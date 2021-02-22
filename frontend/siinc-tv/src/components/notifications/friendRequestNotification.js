import React, {useContext} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';
import UserContext from "../../userContext";
import {getFriendState, handleFriendAction, handleFriendActionRejectTemp} from "../../user/friends";
import userActions from "../../user/userActions"

/**
 * @brief Notification representing received friend request
 * @component
 * @param {notificationData} props.notification - notification data
 * @category Frontend
 * @subcategory Notifications
 */
export function FriendRequestReceived(props){

    const data = props.notification.data;
    const notification = props.notification;
    const userContext = useContext(UserContext)

    function removeFriendNotification()
    {
        userActions.deleteNotification(notification._id).then();
    }

    function rejectFriendRequest()
    {
        handleFriendActionRejectTemp(userContext.user, data);
        removeFriendNotification();
    }

    /**
     * Accepts the request
     */
    function acceptFriendRequest()
    {
        handleFriendAction(userContext.user, data);
        userContext.refreshUserData();
    }

    function acceptButton() {
        if( getFriendState(userContext.user, data) === "ACCEPT" ) 
            return (<Button onClick={acceptFriendRequest} size="small" variant="outlined" color="primary">Accept</Button>)
        else {
            removeFriendNotification(); // bad solution 
            return (<Button size="small" variant="outlined" color="primary">Accepted</Button>)
        }
    }

    function rejectButton() {
        if( getFriendState(userContext.user, data) === "ACCEPT" ) 
            return (<Button onClick={rejectFriendRequest} size="small" variant="outlined" color="primary">Reject</Button>)
    else     
        return (<Button size="small" variant="outlined" color="primary">----</Button>)       
    }

    return(

        <ListItem alignItems="flex-start">
            <ListItemAvatar>
            {data.userImage &&<img className={style.userProfileCircle}
                src={data.userImage} />            
            }
            </ListItemAvatar>
            <Grid>
            <Grid item>
            <label>{`${data.username} has sent you a friend request.`}</label>
            </Grid>
            <Grid item>
                <Box display="flex">
                <Box  p={1}>
                    {acceptButton()}
                </Box>
                <Box p={1}>
                    {rejectButton()}
                </Box >
            </Box>
            </Grid>
            </Grid>

        </ListItem>

    );
}

/**
 * @brief Notification representing accepted friend request
 * @component
 * @param {notificationData} props.notification - notification data
 * @category Frontend
 * @subcategory Notifications
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
