import React,{ } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    tablerow: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}));


const TableWRH = (props) => {
    const classes = useStyles();
    const { rows, columns } = props;

    return <React.Fragment>
        <Table className={classes.table} size="small" aria-label="Retention Rate Table">
            <TableHead>
                <TableRow>
                    {
                        columns && columns.map((col, index) => 
                        <TableCell key={index} className="border border-gray-200 p-4" align="center" style={{minWidth: `${col.width}px`}}>
                            {col.headerName}
                        </TableCell>)
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    rows && rows.map((row, index) =>
                    <TableRow key={index} hover className={classes.tablerow}>
                        {
                            columns && columns.map((col, col_index) => 
                            <TableCell key={col_index} align={col.align} className="border border-gray-200 p-4">
                                {row[`${col.field}`]}
                            </TableCell>)
                        }                        
                    </TableRow>)
                }
            </TableBody>
        </Table>        
    </React.Fragment>
};

export default TableWRH;