import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableToolBar from './tableToolBar';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import TableContent from './tableContent';

const styles = ({
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const CLEAN_STATE = {
    order: 'asc',
    orderBy: 'prop1',
    selected: [],
    columns: {
        prop1: {numeric: false, disablePadding: true, label: 'Property 1'},
        prop2: {numeric: true, disablePadding: false, label: 'Property 2'},
        prop3: {numeric: true, disablePadding: false, label: 'Property 3'},
        prop4: {numeric: true, disablePadding: false, label: 'Property 4'},
        prop5: {numeric: true, disablePadding: false, label: 'Property 5'},
    },
    data: {
        foo: {prop1: 'foo', prop2: 300, prop3: 3.14, prop4: 40, prop5: 57},
        bar: {prop1: 'bar', prop2: 308, prop3: 3.55, prop4: 45, prop5: 80},
        baz: {prop1: 'baz', prop2: 292, prop3: 3.99, prop4: 51, prop5: 67},
        qoo: {prop1: 'qoo', prop2: 287, prop3: 3.12, prop4: 55, prop5: 90},
        qar: {prop1: 'qar', prop2: 331, prop3: 4.01, prop4: 33, prop5: 69},
        qaz: {prop1: 'qaz', prop2: 401, prop3: 3.22, prop4: 43, prop5: 20},
        qass: {prop1: 'qass', prop2: 133, prop3: 7, prop4: 49, prop5: 1},
    },
    page: 0,
    rowsPerPage: 5,
};

class TableCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...CLEAN_STATE,
        };
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
            const selected = Object.keys(this.state.data);
            this.setState({
                selected: selected,
            });
        } else {
            this.setState({
                selected: [],
            });
        }
    }

    handleTableRowClick(event, id) {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
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

    render() {
        const { classes } = this.props;
        const { data, columns, order, orderBy, selected, rowsPerPage, page } = this.state;
        const numericColumns = Object.values(Object.values(data)[0]).map(value => (typeof value) === 'number');

        return (
            <Grid container direction={"column"}>
                <TableToolBar numSelected={selected.length}
                              label={"Data"}/>
                <Grid className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHeader numSelected={selected.length}
                                     order={order}
                                     orderBy={orderBy}
                                     onSelectAllClick={(event, checked) => this.handleSelectAllClick(event, checked)}
                                     onRequestSort={(event, id) => this.handleRequestSort(event, id)}
                                     rowCount={Object.keys(data).length}
                                     columns={columns}/>
                        <TableContent onTableRowClick={(event, id) => this.handleTableRowClick(event, id)}
                                      order={order}
                                      orderBy={orderBy}
                                      selected={selected}
                                      data={data}
                                      page={page}
                                      rowsPerPage={rowsPerPage}
                                      numericColumns={numericColumns}/>
                    </Table>
                </Grid>
                <TablePagination count={Object.keys(data).length}
                                 onChangePage={(event, page) => this.handleChangePage(event, page)}
                                 onChangeRowsPerPage={(event) => this.handleChangeRowsPerPage(event)}
                                 page={page}
                                 rowsPerPage={rowsPerPage}
                                 component="div" />
            </Grid>
        );
    }
}

TableCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableCard);