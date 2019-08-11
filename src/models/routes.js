import React from 'react';
import MainScreen from '../controllers/screens/mainScreen';
import SignInScreen from '../controllers/screens/signInScreen';
import SignUpScreen from '../controllers/screens/signUpScreen';
import AccountScreen from '../controllers/screens/accountScreen';
import LostPasswordScreen from '../controllers/screens/passwordLostScreen';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import AdminScreen from '../controllers/screens/adminScreen';

export const LANDING = '/';
export const HOME = '/home';
export const SIGN_IN = '/sign-in';
export const SIGN_UP = '/sign-up';
export const ACCOUNT = '/account';
export const PASSWORD_LOST = '/password-lost';
export const ADMIN = '/admin';

const routes = [
    {
        path: LANDING,
        exact: true,
        label: "Landing",
    },
    {
        path: HOME,
        label: "Home",
    },
    {
        path: SIGN_IN,
        label: "Sign in",
    },
    {
        path: SIGN_UP,
        label: "Sign up",
    },
    {
        path: ACCOUNT,
        label: "Profile",
    },
    {
        path: PASSWORD_LOST,
        label: "Reset password",
    },
    {
        path: ADMIN,
        label: "Admin",
    },
];

function getRouteComponent(path) {
    switch (path) {
        case LANDING:
            return <SignInScreen/>;
        case HOME:
            return <MainScreen/>;
        case SIGN_IN:
            return <SignInScreen/>;
        case SIGN_UP:
            return <SignUpScreen/>;
        case ACCOUNT:
            return <AccountScreen/>;
        case PASSWORD_LOST:
            return <LostPasswordScreen/>;
        case ADMIN:
            return <AdminScreen/>;
        default:
            return null;
    }
}

function getRouteIcon(path) {
    switch (path) {
        case HOME:
            return <HomeIcon/>;
        case SIGN_IN:
            return <AccountCircleIcon/>;
        case ACCOUNT:
            return <AccountCircleIcon/>;
        case ADMIN:
            return <SettingsIcon/>;
        default:
            return null;
    }
}

const NAVIGATION_MENU_AUTH_USER = [
    routes[4],
    routes[1],
];

const NAVIGATION_MENU_NO_AUTH = [
    routes[2],
];

const NAVIGATION_MENU_AUTH_ADMIN = [
    ...NAVIGATION_MENU_AUTH_USER,
    routes[6],
];

export {
    routes,
    NAVIGATION_MENU_AUTH_USER,
    NAVIGATION_MENU_NO_AUTH,
    NAVIGATION_MENU_AUTH_ADMIN,
    getRouteComponent,
    getRouteIcon,
};