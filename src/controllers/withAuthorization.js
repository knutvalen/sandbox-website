import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from '../models/authUserContext';
import { firebase, db } from './firebase';
import { SIGN_IN } from '../models/routes';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import AppTheme from "../models/appTheme";

const styles = {
    linearProgressGrid: {
        height: AppTheme.spacing.unit / 2,
    },
};

function withAuthorization(authCondition) {
    return function(Component) {
        class WithAuthorization extends React.Component {
            componentDidMount() {
                firebase.auth.onAuthStateChanged(authUser => {
                    if (authUser) {
                        db.onceGetUserWithId(authUser.uid)
                            .then(snapshot => {
                                const user = snapshot.val();

                                if (!authCondition(user)) {
                                    this.props.history.push(SIGN_IN);
                                }
                            })
                            .catch(error => {
                                this.props.history.push(SIGN_IN);
                            });
                    } else {
                        this.props.history.push(SIGN_IN);
                    }
                });
            }

            render() {
                const linearProgress = (
                    <Grid item
                          style={styles.linearProgressGrid}>
                        <Fade in={true}
                              unmountOnExit>
                            <LinearProgress color={"primary"}/>
                        </Fade>
                    </Grid>
                );

                return (
                    <AuthUserContext.Consumer>
                        {user => authCondition(user) ? <Component/> : linearProgress}
                    </AuthUserContext.Consumer>
                );
            }
        }

        return withRouter(WithAuthorization);
    }
}

export default withAuthorization;