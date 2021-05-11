import React, {} from "react";
import { Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, IconButton, Icon, colors } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@material-ui/core/styles";

export const TableCard = (props) => {
    const { title, columns, rows } = props;
    return <Paper className="rounded-none" style={{ height: "30rem" }}>
        <div className="w-full flex items-center px-4" style={{ backgroundColor: "#4a5459", height: 30 }}>
            <Typography variant="caption" align="center" className="w-full" style={{color: "#FFF"}}>
                {title}
            </Typography>                       
        </div>
        <TableContainer className="" style={{height: "calc(100% - 30px)"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns && columns.map((col, index) => 
                            <TableCell key={index} align="center" className="border border-gray-200 p-6" width={col.width}>
                                {col.headerName}
                            </TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows && rows.map((row, index)=>
                        <TableRow key={index}>
                            {
                                columns.map((col, col_index) => 
                                <TableCell key={col_index} align={col.align} className="border border-gray-200 p-6">
                                    {row[`${col.field}`]}
                                </TableCell>)
                            }
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
};

export const BarChartCard = (props) => {
    const theme = useTheme();
    const { title, data, label, options} = props;
    const options_value = {
        legend:{
          display:true,
          position:'right',
          labels: {
            boxWidth: 13,
          }
        },
        scales: {
            yAxes: [{
                ticks: {
                    max: options.max,
                    min: 0,
                    stepSize: options.stepSize
                }
            }]
        },
    };
    const labels = data.map(() => "");
    return <Paper className="rounded-none" style={{ height: "30rem" }}>
        <div className="w-full flex items-center px-4" style={{ backgroundColor: "#4a5459", height: 30 }}>
            <Typography variant="caption" align="center" className="w-full" style={{color: "#FFF"}}>
                {title}
            </Typography>                       
        </div>
        <div className="w-full flex py-16 px-6 overflow-x-auto items-center" style={{height: "calc(100% - 30px)"}}>
            <Typography variant="caption" className="text-center" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>
                {label}
            </Typography>
            <div className="w-full">                
                <Bar
                    data={{
                        labels: labels,
                        datasets: [{
                            borderColor: colors.yellow[600],
                            backgroundColor: colors.yellow[600],
                            barPercentage: 0.5,
                            label: label,
                            data: data
                        }]
                    }}
                    options={options_value}
                />
            </div>
        </div>
    </Paper>
};

export const NotesCard = (props) => {
    const { title, columns, rows } = props;
    return <Paper className="rounded-none" style={{ height: "30rem" }}>
        <div className="w-full flex items-center justify-between px-4" style={{ backgroundColor: "#4a5459", height: 30 }}>
            <Typography variant="caption" className="w-full" style={{color: "#FFF"}}>
                {title}
            </Typography>      
            <div className="flex">
                <IconButton color="secondary">
                    <Icon>refresh</Icon>
                </IconButton>
                <IconButton color="secondary">
                    <Icon>folder_special</Icon>
                </IconButton>
            </div>                 
        </div>
        <TableContainer className="" style={{height: "calc(100% - 30px)"}}>
            <Table>
                <TableBody>
                    {
                        rows && rows.map((row, index)=>
                        <TableRow key={index} hover>
                            <TableCell className="border border-gray-200 p-6">
                                {row}
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
};

export const CollapseTableCard = (props) => {
    const { title, columns, rows } = props;
    return <Paper className="rounded-none" style={{ height: "30rem" }}>
        <div className="w-full flex items-center px-4" style={{ backgroundColor: "#4a5459", height: 30 }}>
            <Typography variant="caption" align="center" className="w-full" style={{color: "#FFF"}}>
                {title}
            </Typography>                       
        </div>
        <TableContainer className="" style={{height: "calc(100% - 30px)"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns && columns.map((col, index) => 
                            <TableCell key={index} align="center" className="border border-gray-200 p-6" width={col.width}>
                                {col.headerName}
                            </TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows && rows.map((row, index)=>
                        <TableRow key={index}>
                            <TableCell className="border border-gray-200 p-6" colSpan={columns.length}>
                                <span className="flex items-center">
                                    <Icon>arrow_right</Icon>{row[`${columns[0].field}`]}
                                </span>
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
};