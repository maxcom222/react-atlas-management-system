import React,{ } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    table: {
        // minWidth: 650
    },
    tablerow: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
    selectedRow: {
        backgroundColor: theme.palette.action.hover,
    }
}));


const TableVesselOperation = (props) => {
    const classes = useStyles();
    const { rows, columns, onRowClick } = props;
    const [state, setState] = React.useState({
        selectedRow: null
    })

    const handleRowClick = (row) => {
        onRowClick(row);
        setState({
            ...state,
            selectedRow: row.id
        });
    }

    return <React.Fragment>
        <Table className={classes.table} size="small" aria-label="Retention Rate Table">
            <TableHead>
                <TableRow>
                    {
                        columns && columns.map((col, index) => 
                        <TableCell key={index} className="border border-gray-200" width={col.width} align="center">
                            {col.headerName}
                        </TableCell>)
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows && rows.map((row, index) =>
                    <TableRow key={index} hover className={row.id == state.selectedRow ? classes.selectedRow : "" } onClick={event => handleRowClick(row)} >
                        {
                            columns && columns.map((col, col_index) =>{
                                if(col.color) 
                                    return <TableCell key={col_index} align={col.align} className="border border-gray-200" style={{backgroundColor: `${row[`${col.field}`]}`}}>
                                    </TableCell>
                                else
                                    return <TableCell key={col_index} align={col.align} className="border border-gray-200">
                                        {row[`${col.field}`]}
                                    </TableCell>
                            })
                        }                        
                    </TableRow>)
                }
            </TableBody>
        </Table>        
    </React.Fragment>
};

export default TableVesselOperation;