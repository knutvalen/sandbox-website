import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

function getSortedObject(object, order, orderBy) {
    const predicate = order === 'desc'
        ? (a, b) => (b[1][orderBy] < a[1][orderBy] ? -1 : 1)
        : (a, b) => (a[1][orderBy] < b[1][orderBy] ? -1 : 1);

    Object.from = arr => Object.assign(...arr.map(([k, v]) => ({[k]: v})));
    Object.sort = (obj) => Object.from(Object.entries(obj).sort(predicate));

    return Object.sort(object);
}

function TableContent(props) {
    const { onTableRowClick, order, orderBy, selected, data, page, rowsPerPage, numericColumns } = props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, Object.keys(data).length - page * rowsPerPage);

    const dataSorted = data ? getSortedObject(data, order, orderBy) : {};
    const dataKeys = Object.keys(dataSorted);
    const dataValues = Object.values(dataSorted);

    return (
        <TableBody>
            {dataValues
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                    const isSelected = selected.indexOf(dataKeys[index]) !== -1;

                    return (
                        <TableRow key={dataKeys[index]}
                                  hover
                                  onClick={(event) => onTableRowClick(event, dataKeys[index])}
                                  selected={isSelected}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={isSelected}/>
                            </TableCell>
                            {Object.values(n).map((value, index) => (
                                index === 0
                                    ?
                                    <TableCell numeric={numericColumns[index]} padding={"none"}>
                                        {value}
                                    </TableCell>
                                    :
                                    <TableCell numeric={numericColumns[index]}>
                                        {value}
                                    </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            {emptyRows > 0 && (
                <TableRow style={{height: 49 * emptyRows}}>
                    <TableCell colSpan={6}/>
                </TableRow>
            )}
        </TableBody>
    );
}

TableContent.propTypes = {
    onTableRowClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    selected: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    numericColumns: PropTypes.array.isRequired,
};

export default TableContent;