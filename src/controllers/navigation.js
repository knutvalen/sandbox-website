import React from 'react';
import PropTypes from 'prop-types';
import SearchAppBar from '../views/searchAppBar';
import MainAppBar from '../views/mainAppBar';
import AuthUserContext from '../models/authUserContext';
import Drawer from '@material-ui/core/Drawer';
import { Link } from "react-router-dom";
import * as routes from "../models/routes";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {auth} from "./firebase";
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import { getRouteIcon } from '../models/routes';

const styles = {
    list: {
        width: 250,
    },
    bottomList: {
        bottom: 0,
        position: "fixed",
        width: 250,
    },
};

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            searching: false,
            openDrawer: false,
        })
    }

    handleSearchAction() {
        this.setState({
            searching: !this.state.searching,
        });
    }

    handleAddPersonAction() {
        // TODO: implement
    }

    handleDrawer(openDrawer) {
        this.setState({
            openDrawer: openDrawer,
        });
    }

    render() {
        const { searching, openDrawer } = this.state;
        const { classes, label } = this.props;

        let onSearchAction;
        let onAddPersonAction;

        if (label === 'Home') {
            onSearchAction = () => this.handleSearchAction();
            onAddPersonAction = () => this.handleAddPersonAction();
        }

        const appBar = searching
            ? <SearchAppBar onSearchAction={() => this.handleSearchAction()}/>
            : <MainAppBar label={label}
                          onSearchAction={onSearchAction}
                          onAddPersonAction={onAddPersonAction}
                          onDrawer={(openDrawer) => this.handleDrawer(openDrawer)}/>;

        const menuItems = (
            <AuthUserContext.Consumer>
                { user => {
                    const userRole = user ? user.role : null;
                    let menuItems;

                    switch(userRole) {
                        case 'user':
                            menuItems = routes.NAVIGATION_MENU_AUTH_USER;
                            break;
                        case 'admin':
                            menuItems = routes.NAVIGATION_MENU_AUTH_ADMIN;
                            break;
                        default:
                            menuItems = routes.NAVIGATION_MENU_NO_AUTH;
                            break;
                    }

                    return menuItems.map(menuItem => {
                        const menuItemIcon = getRouteIcon(menuItem.path);

                        const listItemIcon = menuItemIcon
                            ? <ListItemIcon>{menuItemIcon}</ListItemIcon>
                            : null;

                        return (
                            <ListItem button
                                      onClick={() => this.handleDrawer(false)}
                                      component={Link}
                                      to={menuItem.path}>
                                {listItemIcon}
                                <ListItemText inset
                                              primary={menuItem.label}/>
                            </ListItem>
                        );
                    })
                }}
            </AuthUserContext.Consumer>
        );

        return (
            <Grid>
                {appBar}
                <Drawer open={openDrawer} onClose={() => this.handleDrawer(false)}>
                    <List disablePadding className={classes.list}>
                        {menuItems}
                    </List>
                    <AuthUserContext.Consumer>
                        {authUser => authUser
                                ? (
                                    <List disablePadding className={classes.bottomList}>
                                        <ListItem button onClick={() => auth.doSignOut()}>
                                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                            <ListItemText inset primary="Sign out"/>
                                        </ListItem>
                                    </List>)
                                : null
                        }
                    </AuthUserContext.Consumer>
                </Drawer>
            </Grid>
        );
    }
}

Navigation.propTypes = {
    label: PropTypes.string.isRequired,
};

export default withStyles(styles)(Navigation);