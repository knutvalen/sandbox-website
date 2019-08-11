import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import theme from "../models/appTheme";
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const toolBarStyles = ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: {
        backgroundColor: theme.palette.secondary.light
    },
    spacer: {
        flexGrow: 1,
    },
    header: {
        flexShrink: 1
    },
});

function getToolBarIcon(label) {
    switch (label) {
        case 'Assign role':
            return <AccountCircleIcon/>;
        default:
            return null;
    }
}

function TableToolBar(props) {
    const { classes, numSelected, label, toolBarActionLabel, onToolBarAction } = props;

    return (
        <Toolbar className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
        })}>
            <Grid className={classes.header}>
                {numSelected > 0 ? (
                    <Typography variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        {label}
                    </Typography>
                )}
            </Grid>
            <Grid className={classes.spacer}/>
            <Grid>
                {(numSelected > 0 && onToolBarAction) ?
                    <Tooltip title={toolBarActionLabel}>
                        <IconButton onClick={() => onToolBarAction()}>
                            {getToolBarIcon(toolBarActionLabel)}
                        </IconButton>
                    </Tooltip> : null
                }
            </Grid>
        </Toolbar>
    );
}

TableToolBar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    toolBarActionLabel: PropTypes.string.isRequired,
    onToolBarAction: PropTypes.func.isRequired,
};

export default withStyles(toolBarStyles)(TableToolBar);