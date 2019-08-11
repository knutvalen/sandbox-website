import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTheme from "../models/appTheme";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { auth, db } from "../controllers/firebase";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { SIGN_IN } from "../models/routes";
import { Link } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

const styles = {
    linearProgressGrid: {
        height: AppTheme.spacing.unit / 2,
    },
    linearProgress: {
        borderTopLeftRadius: AppTheme.spacing.unit / 2,
        borderTopRightRadius: AppTheme.spacing.unit / 2,
    },
    mainContainerGrid: {
        paddingTop: (AppTheme.spacing.unit * 4) - (AppTheme.spacing.unit / 2),
        paddingRight: AppTheme.spacing.unit * 4,
        paddingBottom: AppTheme.spacing.unit * 4,
        paddingLeft: AppTheme.spacing.unit * 4,
    },
    titleGrid: {
        paddingTop: 0,
    },
    subTitleGrid: {
        paddingTop: AppTheme.spacing.unit,
    },
    textFieldGrid: {
        height: AppTheme.spacing.unit * 11,
        paddingTop: AppTheme.spacing.unit * 3,
        marginLeft: AppTheme.spacing.unit * 2,
        marginRight: AppTheme.spacing.unit * 2,
    },
    buttonGrid: {
        paddingTop: AppTheme.spacing.unit * 3,
    },
    leftIcon: {
        marginRight: AppTheme.spacing.unit,
        width: 18,
        height: 18,
    },
};

const CLEAN_STATE = {
    email: '',
    password: '',
    fullName: '',
    repeatPassword: '',
    error: null,
    passwordVisible: false,
    loading: false,
};

class SignUpCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        }
    }

    onSubmit(event) {
        const { onSignedUp } = this.props;
        const { email, password, fullName } = this.state;

        this.setState({
            loading: true,
        });

        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, fullName, email, 'user')
                    .then(() => {
                        this.setState({
                            ...CLEAN_STATE,
                        });

                        onSignedUp();
                    })
                    .catch(error => {
                        this.setState({
                            error: error,
                            password: '',
                            repeatPassword: '',
                            loading: false,
                        });
                    });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    password: '',
                    repeatPassword: '',
                    loading: false,
                });
            });

        event.preventDefault();
    }

    handleVisibility() {
        this.setState({
            passwordVisible: !this.state.passwordVisible,
        });
    }

    render() {
        const { classes } = this.props;
        const { email, password, fullName, repeatPassword, error, passwordVisible, loading } = this.state;
        const isInvalid = password !== repeatPassword
            || password === ''
            || email === ''
            || fullName === ''
            || loading;
        const passwordType = passwordVisible ? 'text' : 'password';
        const visibilityIcon = passwordVisible ? <VisibilityIcon className={classes.leftIcon}/> : <VisibilityOffIcon className={classes.leftIcon}/>;
        const visibilityText = passwordVisible ? 'Hide password' : 'Show password';
        const errorMessage = error ? error.message : null;

        return (
            <Paper>
                <Grid item
                      className={classes.linearProgressGrid}>
                    <Fade in={loading}
                          unmountOnExit>
                        <LinearProgress color={"primary"}
                                        className={classes.linearProgress}/>
                    </Fade>
                </Grid>
                <Grid container
                      className={classes.mainContainerGrid}>
                    <Grid item
                          className={classes.titleGrid}
                          md={12} xs={12}>
                        <Typography variant={"headline"}
                                    align={"center"}>
                            Create your account
                        </Typography>
                    </Grid>
                    <Grid item
                          className={classes.textFieldGrid}
                          md={12} xs={12}>
                        <TextField label={"Full name"}
                                   fullWidth
                                   value={fullName}
                                   onChange={event => this.setState({
                                       fullName: event.target.value,
                                       error: null,
                                   })}
                                   type={"text"}/>
                    </Grid>
                    <Grid item
                          className={classes.textFieldGrid}
                          md={12} xs={12}>
                        <TextField label={"E-mail"}
                                   fullWidth
                                   value={email}
                                   onChange={event => this.setState({
                                       email: event.target.value,
                                       error: null,
                                   })}
                                   type={"email"}
                                   error={error}
                                   helperText={errorMessage}/>
                    </Grid>
                    <Grid item
                          className={classes.textFieldGrid}
                          md={12} xs={12}>
                        <TextField label={"Password"}
                                   fullWidth
                                   value={password}
                                   onChange={event => this.setState({
                                       password: event.target.value,
                                       error: null,
                                   })}
                                   type={passwordType}/>
                    </Grid>
                    <Grid item
                          className={classes.textFieldGrid}
                          md={12} xs={12}>
                        <TextField label={"Confirm password"}
                                   fullWidth
                                   value={repeatPassword}
                                   onChange={event => this.setState({
                                       repeatPassword: event.target.value,
                                       error: null,
                                   })}
                                   type={passwordType}/>
                    </Grid>
                    <Grid item
                          className={classes.buttonGrid}>
                        <Button onClick={() => this.handleVisibility()}
                                color={"secondary"}>
                            {visibilityIcon}
                            {visibilityText}
                        </Button>
                    </Grid>
                    <Grid container
                          direction={"column"}
                          alignItems={"flex-start"}
                          justify={"flex-end"}>
                        <Grid container
                              alignItems="baseline"
                              justify="space-between"
                              className={classes.buttonGrid}>
                            <Grid item>
                                <Button component={Link}
                                        to={SIGN_IN}
                                        color={"secondary"}>
                                    Sign in instead
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button disabled={isInvalid}
                                        onClick={event => this.onSubmit(event)}
                                        variant={"contained"}
                                        color={"secondary"}>
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

SignUpCard.propTypes = {
    classes: PropTypes.object.isRequired,
    onSignedUp: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignUpCard);