import React from 'react';
import withAuthorization from '../withAuthorization';
import AccountCard from '../../views/accountOverviewCard';
import PasswordChangeCard from '../../views/passwordChangeCard';
import AppTheme from '../../models/appTheme';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import AuthUserContext from '../../models/authUserContext';

const styles = {
    root: {
        margin: AppTheme.spacing.unit * 2,
    },
    linearProgressGrid: {
        height: AppTheme.spacing.unit / 2,
    },
};

const CLEAN_STATE = {
    openSnackbar: false,
};

class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        }
    }

    handlePasswordChange() {
        this.setState({
            openSnackbar: true,
        });
    }

    handleCloseSnackbar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            openSnackbar: false,
        });
    }

    render() {
        const { openSnackbar } = this.state;

        return (
            <AuthUserContext.Consumer>
                { user =>
                    <Grid style={styles.root}>
                        <Grid container
                              spacing={AppTheme.spacing.unit * 2}>
                            <Grid item
                                  md={4} xs={12} sm={6}>
                                <AccountCard user={user}/>
                            </Grid>
                            <Grid item
                                  md={4} xs={12} sm={6}>
                                <PasswordChangeCard onPasswordChange={() => this.handlePasswordChange()}/>
                            </Grid>
                        </Grid>
                        <Snackbar open={openSnackbar}
                                  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                  autoHideDuration={10000}
                                  onClose={(event, reason) => this.handleCloseSnackbar(event, reason)}
                                  message={"Password changed"}
                                  action={
                                      <Button color={"secondary"}
                                              onClick={(event, reason) => this.handleCloseSnackbar(event, reason)}>
                                          Dismiss
                                      </Button>}>
                        </Snackbar>
                    </Grid>
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default withAuthorization((authUser) => !!authUser)(AccountScreen);