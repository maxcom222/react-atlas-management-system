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

const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
]


const TableSchedule = (props) => {
    const classes = useStyles();
    const { rows, columns } = props;

    return <React.Fragment>
        <Table className={classes.table} size="small" aria-label="Retention Rate Table">
            <TableHead>
                <TableRow>
                    <TableCell className="border border-gray-200 p-4" align="center">*
                    </TableCell>
                    <TableCell className="border border-gray-200 p-4" colSpan={2} align="center">Hours
                    </TableCell>
                    {
                        hours && hours.map((hour, index) => 
                        <TableCell className="border border-gray-200 p-4" colSpan={2} align="center" key={index}>
                            {hour}
                        </TableCell>)
                    }
                    <TableCell className="border border-gray-200 p-4" colSpan={5} align="center">
                    </TableCell>                   
                </TableRow>
                <TableRow>
                    {
                        columns && columns.map((col, index) => 
                        <TableCell key={index} className="border border-gray-200 p-4" align="center" style={{ minWidth: `${col.width}px` }}>
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
                            columns && columns.map((col, col_index) => {
                                if(col_index > 2 && col_index <= 50) {
                                    return <TableCell key={col_index} align="center" className={`border border-gray-200 p-4 ${row.data[col_index - 3].value == "W" ? "font-bold" : ""} ${row.data[col_index - 3].color}`}>
                                    {row.data[col_index - 3].value}
                                </TableCell>
                                } else {
                                    return <TableCell key={col_index} align={col.align} className="border border-gray-200 p-4">
                                    {row[`${col.field}`]}
                                </TableCell>
                                }
                            })
                        }                        
                    </TableRow>)
                }
            </TableBody>
        </Table>        
    </React.Fragment>
};

export default TableSchedule;