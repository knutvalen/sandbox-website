import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTheme from "../models/appTheme";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { SIGN_UP, PASSWORD_LOST } from "../models/routes";
import { Link } from 'react-router-dom';
import { auth } from "../controllers/firebase";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
};

const CLEAN_STATE = {
    email: '',
    password: '',
    error: null,
    loading: false,
};

class SignInCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        };
    }

    onSubmit(event) {
        const { onSignedIn } = this.props;
        const { email, password } = this.state;

        this.setState({
            loading: true,
        });

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({
                    ...CLEAN_STATE,
                });

                onSignedIn();
            })
            .catch(error => {
                this.setState({
                    error: error,
                    password: '',
                    loading: false,
                });
            });

        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        const { email, password, error, loading } = this.state;
        const isInvalid = password === ''
            || email === ''
            || loading;
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
                            Sign in
                        </Typography>
                    </Grid>
                    <Grid item
                          className={classes.subTitleGrid}
                          md={12} xs={12}>
                        <Typography variant={"subheading"}
                                    align={"center"}>
                            with e-mail and password
                        </Typography>
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
                                   type={"password"}/>
                    </Grid>
                    <Grid container
                          direction={"column"}
                          alignItems={"flex-start"}
                          justify={"flex-end"}>
                        <Grid item
                              className={classes.buttonGrid}>
                            <Button component={Link}
                                    to={PASSWORD_LOST}
                                    color={"secondary"}>
                                Lost password?
                            </Button>
                        </Grid>
                        <Grid container
                              alignItems="baseline"
                              justify="space-between"
                              className={classes.buttonGrid}>
                            <Grid item>
                                <Button component={Link}
                                        to={SIGN_UP}
                                        color={"secondary"}>
                                    Create account
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button color={"secondary"}
                                        disabled={isInvalid}
                                        onClick={event => this.onSubmit(event)}
                                        variant={"contained"}>
                                    Sign in
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

SignInCard.propTypes = {
    classes: PropTypes.object.isRequired,
    onSignedIn: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignInCard);