import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import style from './notifications.module.css';
import UserContext from "../../userContext";
import { withRouter } from "react-router-dom";



/**
 * @param {*} props 
 */
function NewFollowerNotification(props){

    const data = props.notification.data;

    function handleRedirect() {
        props.clearNotification(props.notification._id)
        props.history.push(`/users/${data.username}`);
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