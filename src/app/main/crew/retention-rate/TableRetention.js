import React,{ } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableFooter } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650
    },
    tablerow: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}));


const TableRetention = (props) => {
    const classes = useStyles();
    const { rows, columns } = props;

    return <React.Fragment>
        <Table className={classes.table} size="small" aria-label="Retention Rate Table">
            <TableHead>
                <TableRow>
                    <TableCell className="border border-gray-200"></TableCell>
                    <TableCell colSpan={4} className="border border-gray-200" align="center">
                        Crew Employed
                    </TableCell>
                    <TableCell colSpan={3} className="border border-gray-200"></TableCell>
                    <TableCell className="border border-gray-200"></TableCell>
                </TableRow>
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
                    <TableRow key={index} hover className={classes.tablerow}>
                        {
                            columns && columns.map((col, col_index) => 
                            <TableCell key={col_index} align={col.align} className="border border-gray-200">
                                {row[`${col.field}`]}
                            </TableCell>)
                        }                        
                    </TableRow>)
                }
            </TableBody>
        </Table>        
    </React.Fragment>
};

export default TableRetention;