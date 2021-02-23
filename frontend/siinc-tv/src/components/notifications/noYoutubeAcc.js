import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
/**
 * This Componenet is in the notification for when a google user has no youtube account
 * 
 * @component
 * @category Frontend
 * @subcategory Notifications
 */
function NoYoutubeAccount(){

    return(


        <ListItem alignItems="flex-start">
            <Grid>
            <Grid item>
            <label>{`No youtube channel was detected for this google account`}</label>
            </Grid>
            <Grid item>
            <label>{`Please create a YouTube account then logout and login to siinc.tv to link it`}</label>
            </Grid>
            <Grid item>
            <Link
            href="https://www.youtube.com/create_channel" >{`Click here to create a youtube channel`}</Link>
            </Grid>
            </Grid>

        </ListItem>

    );
}
export default NoYoutubeAccount;