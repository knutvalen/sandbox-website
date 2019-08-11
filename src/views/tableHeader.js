import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

class TableHeader extends React.Component {
    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, columns, onRequestSort } = this.props;
        const columnKeys = Object.keys(columns);
        const columnValues = Object.values(columns);

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount}
                                  checked={numSelected === rowCount}
                                  onChange={(event, checked) => onSelectAllClick(event, checked)}/>
                    </TableCell>
                    {columnValues.map((column, index) => (
                        <TableCell key={columnKeys[index]}
                                   numeric={column.numeric}
                                   padding={column.disablePadding ? 'none': 'default'}
                                   sortDirection={orderBy === columnKeys[index] ? order : false}>
                            <Tooltip title="Sort"
                                     placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                     enterDelay={300}>
                                <TableSortLabel active={orderBy === columnKeys[index]}
                                                direction={order}
                                                onClick={(event) => onRequestSort(event, columnKeys[index])}>
                                    {column.label}
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }
}

TableHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columns: PropTypes.object.isRequired,
};

export default TableHeader;