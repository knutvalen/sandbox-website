import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import theme from "../models/appTheme";
import Grid from '@material-ui/core/Grid';

const styles = {
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
};

function SearchAppBar(props) {
    const { classes, onSearchAction } = props;

    return (
        <AppBar position="sticky" color="inherit">
            <ToolBar>
                <Grid container>
                    <TextField id="search"
                               label="Search"
                               type="search"
                               className={classes.textField}
                               margin="none"
                               fullWidth
                               autoFocus={true}/></Grid>
                <IconButton onClick={() => onSearchAction()}>
                    <ClearIcon/>
                </IconButton>
            </ToolBar>
        </AppBar>
    );
}

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    onSearchAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchAppBar);