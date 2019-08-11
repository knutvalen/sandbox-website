import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { routes, getRouteComponent } from '../models/routes';
import AppTheme from '../models/appTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Navigation from './navigation';
import WithAuthentication from './withAuthentication';
import Grid from '@material-ui/core/Grid';
import ScrollToTop from './scrollToTop';

const styles = {
    root: {
        backgroundColor: AppTheme.palette.background.default,
        height: "100%",
        minHeight: "100vh",
    },
};

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={AppTheme}>
                <Router forceRefresh={true}>
                    <ScrollToTop>
                        <Grid style={styles.root}>
                            {routes.map(route =>
                                <Grid>
                                    <Route exact={route.exact} path={route.path} component={() => <Navigation label={route.label}/>}/>
                                    <Route exact={route.exact} path={route.path} component={() => getRouteComponent(route.path)}/>
                                </Grid>
                            )}
                        </Grid>
                    </ScrollToTop>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default WithAuthentication(App);