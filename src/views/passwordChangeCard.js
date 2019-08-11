import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTheme from "../models/appTheme";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { auth } from "../controllers/firebase";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
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
    header: {
        paddingLeft: AppTheme.spacing.unit * 2,
        paddingBottom: AppTheme.spacing.unit,
    },
};

const CLEAN_STATE = {
    password: '',
    repeatPassword: '',
    error: null,
    passwordVisible: false,
};

class PasswordChangeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        };
    }

    onSubmit(event) {
        const { onPasswordChange } = this.props;
        const { password } = this.state;

        this.setState({
            loading: true,
        });

        auth.doPasswordUpdate(password)
            .then(() => {
                this.setState({
                    ...CLEAN_STATE,
                });

                onPasswordChange();
            })
            .catch(error => {
                this.setState({
                    error: error,
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
        const { password, repeatPassword, error, passwordVisible, loading } = this.state;
        const isInvalid = password !== repeatPassword
            || password === ''
            || loading;
        const errorMessage = error ? error.message : null;
        const passwordType = passwordVisible ? 'text' : 'password';
        const visibilityIcon = passwordVisible ? <VisibilityIcon className={classes.leftIcon}/> : <VisibilityOffIcon className={classes.leftIcon}/>;
        const visibilityText = passwordVisible ? 'Hide password' : 'Show password';

        return (
            <Grid>
                <Typography variant="subheading" className={classes.header}>
                    Security
                </Typography>
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
                                Change your password
                            </Typography>
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
                                       type={passwordType}
                                       error={error}
                                       helperText={errorMessage}/>
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
                                  justify={"flex-end"}
                                  className={classes.buttonGrid}>
                                <Grid item>
                                    <Button disabled={isInvalid}
                                            onClick={event => this.onSubmit(event)}
                                            variant={"contained"}
                                            color={"secondary"}>
                                        Change
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

PasswordChangeCard.propTypes = {
    classes: PropTypes.object.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(PasswordChangeCard);