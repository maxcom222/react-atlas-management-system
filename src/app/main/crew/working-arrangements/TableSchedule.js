import React,{ } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableFooter, Select, MenuItem, Checkbox } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { isEmpty } from "app/functions";
import {hours} from "./demoData";
import { updateCrewTransRHValue } from "../store/workingarrSlice";
import { useDispatch } from "react-redux";
import { header_keys } from "./demoData";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650
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



const SelectValue = (props) => {
    const { value, name, row_id } = props;
    const [state, setState] = React.useState(value);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(updateCrewTransRHValue({
            id: row_id,
            [name]: event.target.value
        }))
        setState(event.target.value);        
    }

    return <>
        <Select
            value={state}
            onChange={handleChange}
            name={name}
            size="small"            
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value='w' >W</MenuItem>
            <MenuItem value='r' >R</MenuItem>
        </Select>
    </>
}

const CTableRow = (props) => {
    const {row, columns, onRowClick, selectedRow} = props;
    var data_cnt = row.data.length;
    const classes = useStyles();
    const [state, setState] = React.useState(false)

    return <React.Fragment>
        {
            row.data && row.data.map((row_data, row_i) => (
                <TableRow hover className={selectedRow == row_data.id ? classes.selectedRow : ""} key={row_i} onClick={event => onRowClick(row_data)}>
                    {
                        columns && columns.map((col, col_i) => {
                            switch(col_i) {
                                case 0: if(row_i == 0) {
                                        return (
                                            <TableCell 
                                                className="border border-gray-200 p-4" 
                                                align="center" 
                                                rowSpan={data_cnt}
                                                key={col_i}
                                            > 
                                                {row[`${col.field}`]}     
                                            </TableCell>)
                                    };break;
                                case 1: if(row_i == 0) {
                                        return (
                                            <TableCell 
                                                className="border border-gray-200 p-4" 
                                                align="center" 
                                                rowSpan={data_cnt}
                                                key={col_i}
                                            > 
                                                {row[`${col.field}`]}     
                                            </TableCell>)
                                    };break;
                                case 2: if(row_i == 0) {
                                        return (
                                            <TableCell 
                                                className="border border-gray-200 p-4" 
                                                align="center" 
                                                rowSpan={data_cnt}
                                                key={col_i}
                                            > 
                                                {row[`${col.field}`]}     
                                            </TableCell>)
                                    };break;
                                case 3: return (
                                    <TableCell 
                                        className="border border-gray-200 p-4" 
                                        align="center" 
                                        key={col_i}
                                    > 
                                        <Checkbox 
                                            checked={row_data[`${col.field}`] == "1"}
                                            size="small"
                                        />     
                                    </TableCell>)
                                case 4: return (
                                    <TableCell 
                                        className="border border-gray-200 p-4" 
                                        align="center" 
                                        key={col_i}
                                    >    
                                        {row_data[`${col.field}`]}  
                                    </TableCell>)
                                default: return (
                                    <TableCell 
                                        className="border border-gray-200 p-4" 
                                        align="center" 
                                        key={col_i}
                                    > 
                                        <SelectValue 
                                            value={isEmpty(row_data[`${col.field}`])}
                                            name={`${col.field}`}
                                            row_id={row_data.id}
                                        />    
                                    </TableCell>)
                            }
                        })
                    }
                </TableRow>
            ))
        }
    </React.Fragment>
    
};

const TableSchedule = (props) => {
    const classes = useStyles();
    const { state, setState, columns } = props;
    const rows = state.rows;
    // const [state, setState] = React.useState({
    //     selectedRow: null,
    //     workingHours: 0
    // })
    const handleRowSelect = (row) => {
        var workingHours = 0;
        header_keys.map(h => {
            if(row[h] == "w") {
                workingHours += 0.5
            }
        });
        setState({
            ...state,
            selectedRow: row.id,
            workingHours
        })
    }
    return <React.Fragment>
        <Table className={classes.table} size="small" aria-label="Retention Rate Table">
            <TableHead>
                <TableRow>
                    <TableCell className="border border-gray-200 p-4" align="center">*
                    </TableCell>
                    <TableCell className="border border-gray-200 p-4" colSpan={4} align="center">Hours
                    </TableCell>
                    {
                        hours && hours.map((hour, index) => 
                        <TableCell className="border border-gray-200 p-4" colSpan={2} align="center" key={index}>
                            {hour}
                        </TableCell>)
                    }
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
                        <CTableRow row={row} key={index} columns={columns} onRowClick={handleRowSelect} selectedRow={state.selectedRow} />
                    )
                }
            </TableBody>
        </Table>        
    </React.Fragment>
};

export default TableSchedule;