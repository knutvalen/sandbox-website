import React from 'react';
import AppTheme from '../../models/appTheme';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import SignInCard from '../../views/signInCard';
import { HOME } from '../../models/routes';

const styles = {
    root: {
        margin: AppTheme.spacing.unit * 2,
    },
};

class SignInScreen extends React.Component {
    handleSignedIn() {
        const { history } = this.props;
        history.push(HOME);
    }

    render() {
        return (
            <Grid style={styles.root}>
                <Grid container spacing={AppTheme.spacing.unit * 2} justify={"center"} alignItems={"center"}>
                    <Grid item md={3} sm={6} xs={12}>
                        <SignInCard onSignedIn={() => this.handleSignedIn()}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(SignInScreen);