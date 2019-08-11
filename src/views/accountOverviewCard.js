import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTheme from "../models/appTheme";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
    paper: {
        padding: AppTheme.spacing.unit * 2,
    },
    header: {
        paddingLeft: AppTheme.spacing.unit * 2,
        paddingBottom: AppTheme.spacing.unit,
    },
};

function AccountOverviewCard(props) {
    const { classes, user } = props;

    return (
        <Grid item direction={"column"}>
            <Typography variant="subheading" className={classes.header}>
                Overview
            </Typography>
            <Paper className={classes.paper}>
                <List disablePadding>
                    <ListItem>
                        <Avatar><AccountCircleIcon/></Avatar>
                        <ListItemText primary={user.fullName} secondary={user.email}/>
                    </ListItem>
                </List>
            </Paper>
        </Grid>
    );
}

AccountOverviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

};

export default withStyles(styles)(AccountOverviewCard);