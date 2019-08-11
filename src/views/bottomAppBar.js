import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

function BottomAppBar(props) {
    const { title, subTitle, onExpand, onFullscreen, expandIcon, fullscreenIcon } = props;

    return (
        <AppBar position="sticky" color="inherit">
            <ToolBar>
                <Grid container>
                    <List>
                        <ListItem>
                            <ListItemText primary={title} secondary={subTitle}/>
                        </ListItem>
                    </List>
                </Grid>
                <IconButton onClick={onFullscreen}>
                    {fullscreenIcon}
                </IconButton>
                <IconButton onClick={onExpand}>
                    {expandIcon}
                </IconButton>
            </ToolBar>
        </AppBar>
    );
}

BottomAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.object.isRequired,
    subTitle: PropTypes.object.isRequired,
    onExpand: PropTypes.func.isRequired,
    expandIcon: PropTypes.object.isRequired,
    onFullscreen: PropTypes.func.isRequired,
    fullscreenIcon: PropTypes.object.isRequired,
};

export default BottomAppBar;