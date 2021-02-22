import React, {useContext, useState} from "react";
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import UserContext from "../../userContext";

/**
 * This Componenet is in the notification for when a google user has no youtube account
 * 
 * @component
 * @category Frontend
 * @subcategory Notifications
 */
function WelcomeNotification(){
    const userContext = useContext(UserContext);
    const [url, setUrl] = useState("/users/" + userContext.user._id + "/edit");
    return(
        <ListItem alignItems="flex-start">
            <Grid>
            <Grid item>
            <label>{`Welcome to SiincTv!`}</label>
            </Grid>
            <Grid item>
            <label>{`To help us reccomend streams you may like please add some interests to your profile`}</label>
            </Grid>
            <Grid item>
            <Link
            href={url}>{`Click here to edit your profile`}</Link>
            </Grid>
            </Grid>

        </ListItem>

    );
}
export default WelcomeNotification;