import React from 'react';
import { withRouter } from 'react-router-dom';
import AppTheme from "../../models/appTheme";
import Grid from '@material-ui/core/Grid';
import SignUpCard from '../../views/signUpCard';
import { HOME } from '../../models/routes';

const styles = {
    root: {
        margin: AppTheme.spacing.unit * 2,
    },
};

class SignUpScreen extends React.Component {
    handleSignedUp() {
        const { history } = this.props;
        history.push(HOME);
    }

    render() {
        return (
            <Grid style={styles.root}>
                <Grid container spacing={AppTheme.spacing.unit * 2} justify={"center"} alignItems={"center"}>
                    <Grid item md={3} sm={6} xs={12}>
                        <SignUpCard onSignedUp={() => this.handleSignedUp()}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(SignUpScreen);