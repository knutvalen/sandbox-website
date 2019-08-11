import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

const styles = {
    leftIcon: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
};

function MainAppBar(props) {
    const { classes, label, onSearchAction, onAddPersonAction, onDrawer } = props;

    const searchButton = onSearchAction
        ? (
            <IconButton onClick={() => onSearchAction()}>
                <SearchIcon/>
            </IconButton>)
        : null;

    const addPersonButton = onAddPersonAction
        ? (
            <IconButton onClick={() => onAddPersonAction()}>
                <PersonAddIcon/>
            </IconButton>)
        : null;

    return (
        <AppBar position="sticky">
            <ToolBar>
                <IconButton className={classes.leftIcon} onClick={() => onDrawer(true)}>
                    <MenuIcon/>
                </IconButton>
                <Grid container>
                    <Typography variant="title">
                        {label}
                    </Typography>
                </Grid>
                {searchButton}
                {addPersonButton}
            </ToolBar>
        </AppBar>
    );
}

MainAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onSearchAction: PropTypes.func,
    onAddPersonAction: PropTypes.func,
    onDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainAppBar);