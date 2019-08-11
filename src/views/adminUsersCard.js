import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppTheme from "../models/appTheme";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableHeader from './tableHeader';
import TableToolBar from './tableToolBar';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import TableContent from './tableContent';

const styles = {
    paper: {
        padding: AppTheme.spacing.unit * 2,
    },
    header: {
        paddingLeft: AppTheme.spacing.unit * 2,
        paddingBottom: AppTheme.spacing.unit,
    },
    table: {

    },
    tableWrapper: {
        overflowX: 'auto',
    },
};

class AdminUsersCard extends React.Component {
    render() {
        const {
            classes,
            users,
            columns,
            onTableRowClick,
            order,
            orderBy,
            selected,
            rowsPerPage,
            page,
            numericColumns,
            onRequestSort,
            onSelectAllClick,
            onChangePage,
            onChangeRowsPerPage,
            toolBarActionLabel,
            onToolBarAction,
        } = this.props;

        return (
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container direction={"column"}>
                                <TableToolBar label={"Users"}
                                              numSelected={selected.length}
                                              toolBarActionLabel={toolBarActionLabel}
                                              onToolBarAction={() => onToolBarAction()}/>
                                <Grid className={classes.tableWrapper}>
                                    <Table className={classes.table}>
                                        <TableHeader numSelected={selected.length}
                                                     onRequestSort={(event, id) => onRequestSort(event, id)}
                                                     onSelectAllClick={(event, checked) => onSelectAllClick(event, checked)}
                                                     order={order}
                                                     orderBy={orderBy}
                                                     rowCount={Object.keys(users).length}
                                                     columns={columns}/>
                                        <TableContent onTableRowClick={(event, id) => onTableRowClick(event, id)}
                                                      order={order}
                                                      orderBy={orderBy}
                                                      selected={selected}
                                                      data={users}
                                                      page={page}
                                                      rowsPerPage={rowsPerPage}
                                                      numericColumns={numericColumns}/>
                                    </Table>
                                </Grid>
                                <TablePagination count={Object.keys(users).length}
                                                 onChangePage={(event, page) => onChangePage(event, page)}
                                                 page={page}
                                                 rowsPerPage={rowsPerPage}
                                                 onChangeRowsPerPage={(event) => onChangeRowsPerPage(event)}
                                                 component={"div"}/>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

        );
    }
}

AdminUsersCard.propTypes = {
    classes: PropTypes.object,
    users: PropTypes.object.isRequired,
    onTableRowClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    selected: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    numericColumns: PropTypes.array.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired,
    toolBarActionLabel: PropTypes.string.isRequired,
    onToolBarAction: PropTypes.func.isRequired,
};

export default withStyles(styles)(AdminUsersCard);