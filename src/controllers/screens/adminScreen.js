import React from 'react';
import AppTheme from '../../models/appTheme';
import Grid from '@material-ui/core/Grid';
import withAuthorization from '../withAuthorization';
import { db } from '../firebase';
import AdminUsersCard from '../../views/adminUsersCard';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import SelectedMenu from '../../views/selectedMenu';
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
    root: {
        margin: AppTheme.spacing.unit * 2,
    },
    linearProgress: {
        borderTopLeftRadius: AppTheme.spacing.unit / 2,
        borderTopRightRadius: AppTheme.spacing.unit / 2,
    },
    linearProgressGrid: {
        height: AppTheme.spacing.unit / 2,
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    modalContainerGrid: {
        paddingTop: (AppTheme.spacing.unit * 4) - (AppTheme.spacing.unit / 2),
        paddingRight: AppTheme.spacing.unit * 4,
        paddingBottom: AppTheme.spacing.unit * 4,
        paddingLeft: AppTheme.spacing.unit * 4,
    },
    modalTitleGrid: {
        paddingTop: 0,
    },
    modalSubTitleGrid: {
        paddingTop: AppTheme.spacing.unit,
    },
    buttonGrid: {
        paddingTop: AppTheme.spacing.unit * 3,
        marginRight: AppTheme.spacing.unit * 2,
    },
};

const CLEAN_STATE = {
    order: 'asc',
    orderBy: 'email',
    selected: {},
    users: null,
    page: 0,
    rowsPerPage: 5,
    error: null,
    columns: {
        email: {numeric: false, disablePadding: true, label: 'E-mail'},
        fullName: {numeric: false, disablePadding: false, label: 'Name'},
        role: {numeric: false, disablePadding: false, label: 'Role'},
    },
    openModal: false,
    loading: false,
    selectedRole: null,
    openSnackbar: false,
};

class AdminScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        };
    }

    componentDidMount() {
        db.onceGetUsers()
            .then(snapshot => {
                this.setState({
                    ...CLEAN_STATE,
                    users: snapshot.val(),
                });
            })
            .catch();
    }

    handleRequestSort(event, id) {
        const orderBy = id;
        let order = 'desc';

        if (this.state.orderBy === id && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({
            order: order,
            orderBy: orderBy,
        });
    }

    handleSelectAllClick(event, checked) {
        if (checked) {
            this.setState({
                selected: _.clone(this.state.users),
            });
        } else {
            this.setState({
                selected: {},
            });
        }
    }

    handleTableRowClick(event, id) {
        const { selected, users } = this.state;
        let newSelected = _.clone(selected);

        if (newSelected[id]) {
            delete newSelected[id];
        } else {
            for (let property in users) {
                if (users.hasOwnProperty(property) && property === id) {
                    newSelected[property] = users[property];
                    break;
                }
            }
        }

        this.setState({
            selected: newSelected,
        });
    }

    handleChangePage(event, page) {
        this.setState({
            page: page,
        })
    }

    handleChangeRowsPerPage(event) {
        this.setState({
            rowsPerPage: event.target.value,
        });
    };

    handleToolBarAction() {
        this.setState({
            openModal: true,
        });
    }

    handleCloseModal() {
        this.setState({
            openModal: false,
        });
    }

    handleSelectRole(event, role) {
        this.setState({
            selectedRole: role,
        });
    }

    handleChangeRole(event) {
        const { selectedRole, selected } = this.state;

        this.setState({
            loading: true,
        });

        let snackBarSuccessText;
        switch (Object.keys(selected).length) {
            case 1:
                snackBarSuccessText = 'User role changed';
                break;
            default:
                snackBarSuccessText = 'User roles changed';
                break;
        }

        db.doUpdateUserRole(selected, selectedRole)
            .then(() => {
                db.onceGetUsers()
                    .then(snapshot => {
                        this.setState({
                            openModal: false,
                            loading: false,
                            selectedRole: null,
                            selected: {},
                            openSnackbar: true,
                            snackBarSuccessText: snackBarSuccessText,
                            users: snapshot.val(),
                        });
                    })
                    .catch(error => {
                        this.setState({
                            error: error,
                            loading: false,
                            openSnackbar: true,
                        });
                    });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false,
                    openSnackbar: true,
                });
            });
    }

    handleCloseSnackbar(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            openSnackbar: false,
            snackBarSuccessText: null,
        });
    }

    render() {
        const { users, order, orderBy, selected, selectedRole, rowsPerPage, page, error, columns, openModal, loading, openSnackbar, snackBarSuccessText } = this.state;
        const numericColumns = users ? Object.values(Object.values(users)[0]).map(value => (typeof value) === 'number') : null;
        const snackBarMessage = error ? error : snackBarSuccessText;
        const selectedKeys = Object.keys(selected);
        const isInvalid = !selectedRole;

        const linearProgress = (
            <Grid item
                  style={styles.linearProgressGrid}>
                <Fade in={!!users}
                      unmountOnExit>
                    <LinearProgress color={"primary"}/>
                </Fade>
            </Grid>
        );

        const mainContent = (
            <Grid style={styles.root}>
                <AdminUsersCard onChangePage={(event, page) => this.handleChangePage(event, page)}
                                numericColumns={numericColumns}
                                users={users}
                                onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
                                onRequestSort={(event, id) => this.handleRequestSort(event, id)}
                                onSelectAllClick={(event, checked) => this.handleSelectAllClick(event, checked)}
                                orderBy={orderBy}
                                order={order}
                                selected={selectedKeys}
                                onTableRowClick={(event, id) => this.handleTableRowClick(event, id)}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                columns={columns}
                                toolBarActionLabel={'Assign role'}
                                onToolBarAction={() => this.handleToolBarAction()}/>
                <Modal open={openModal}
                       onClose={() => this.handleCloseModal()}>
                    <Grid container>
                        <Paper style={styles.modal}>
                            <Grid item
                                  style={styles.linearProgressGrid}>
                                <Fade in={loading}
                                      unmountOnExit>
                                    <LinearProgress color={"primary"}
                                                    style={styles.linearProgress}/>
                                </Fade>
                            </Grid>
                            <Grid container
                                  style={styles.modalContainerGrid}
                                  justify={"center"}
                                  direction={"column"}>
                                <Typography variant={"headline"}
                                            align={"center"}
                                            style={styles.modalTitleGrid}>
                                    Change role
                                </Typography>
                                <Typography variant={"subheading"}
                                            align={"center"}
                                            style={styles.modalSubTitleGrid}>
                                    of selected users
                                </Typography>
                                <List>
                                    {Object.values(selected).map(user => (
                                        <ListItem>
                                            <ListItemText primary={user.email}/>
                                        </ListItem>
                                    ))}
                                </List>
                                <Grid container justify={"flex-end"} style={styles.buttonGrid} alignItems={"flex-end"}>
                                    <Grid item
                                          md={8} xs={8}>
                                        <SelectedMenu label={"Role"}
                                                      menuOptions={['admin', 'user']}
                                                      disablePadding={true}
                                                      dense={true}
                                                      onSelect={(event, role) => this.handleSelectRole(event, role)}/>
                                    </Grid>
                                    <Grid item md={4} xs={4}>
                                        <Button color={"secondary"} onClick={event => this.handleChangeRole(event)} disabled={isInvalid}>
                                            Change
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Modal>
                <Snackbar open={openSnackbar}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                          autoHideDuration={10000}
                          onClose={(event, reason) => this.handleCloseSnackbar(event, reason)}
                          message={snackBarMessage}
                          action={
                              <Button color={"secondary"}
                                      onClick={(event, reason) => this.handleCloseSnackbar(event, reason)}>
                                  Dismiss
                              </Button>}>
                </Snackbar>
            </Grid>
        );

        return users ? mainContent : linearProgress;
    }
}

export default withAuthorization((user) => user && user.role === 'admin')(AdminScreen);