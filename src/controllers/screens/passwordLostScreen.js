import React from 'react';
import AppTheme from '../../models/appTheme';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import LostPasswordCard from '../../views/passwordLostCard';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        margin: AppTheme.spacing.unit * 2,
    },
};

const CLEAN_STATE = {
    openSnackbar: false,
};

class PasswordLostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        };
    }

    handlePasswordReset() {
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
            <Grid style={styles.root}>
                <Grid container spacing={AppTheme.spacing.unit * 2} justify={"center"} alignItems={"center"}>
                    <Grid item md={3} sm={6} xs={12}>
                        <LostPasswordCard onPasswordReset={() => this.handlePasswordReset()}/>
                    </Grid>
                </Grid>
                <Snackbar open={openSnackbar}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          autoHideDuration={10000}
                          onClose={(event, reason) => this.handleCloseSnackbar(event, reason)}
                          message={"E-mail sent"}
                          action={
                              <Button color={"secondary"}
                                      onClick={(event, reason) => this.handleCloseSnackbar(event, reason)}>
                                  Dismiss
                              </Button>}>
                </Snackbar>
            </Grid>
        );
    }
}

export default withRouter(PasswordLostScreen);