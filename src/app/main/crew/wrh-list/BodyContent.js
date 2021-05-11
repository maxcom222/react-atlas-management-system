import React, {  } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContent from './HeaderContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Grid, Typography, TableCell, Table, TableRow, TableBody, TableHead } from "@material-ui/core";
import TableWRH from "./TableWRH";
import TableSchedule from "./TableSchedule";
import { makeStyles } from "@material-ui/core/styles";
import { columns, data } from "./demoData";

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

const createData = (id, status, date, data, hr_rest24_period, hr_work24_period, hr_restany24_period, hr_restany7day_period, notes) => {
    return {id, status, date, data, hr_rest24_period, hr_work24_period, hr_restany24_period, hr_restany7day_period, notes};
};

const createData1 = (id, name, rank) => {
    return {id, name, rank};
}



const rows = [
	createData(0, "test", "test", data, "test", "test", "test", "test", "test", "test", "test", "test", "test"),
	createData(1, "test", "test", data, "test", "test", "test", "test", "test", "test", "test", "test", "test"),
	createData(2, "test", "test", data, "test", "test", "test", "test", "test", "test", "test", "test", "test"),
	createData(3, "test", "test", data, "test", "test", "test", "test", "test", "test", "test", "test", "test"),
	createData(4, "test", "test", data, "test", "test", "test", "test", "test", "test", "test", "test", "test"),
	createData(5, "test", "test", data, "test", "test", "test", "test", "test", "test", "test", "test", "test"),
];



const columns1 = [
	{
		field: "id",
		headerName: "",
		align: "right",
		width: 20
	},
	{
		field: "",
		headerName: "",
		align: "center",
		width: 20
	},
	{
		field: "name",
		headerName: "Name",
		align: "center",
		// width: 130
	},
	{
		field: "rank",
		headerName: "Rank",
		align: "center",
		// width: 150
	},
];

const rows1 = [
	createData1(1, "test", "test", data, "test", "test", "test", "test", "test"),
]

const color_head = [
	{
		field: "color",
		headerName: "Color"
	},
	{
		field: "description",
		headerName: "Description"
	}
];

const color_rows = [
	{
		color: "red",
		description: "Berthing"
	},
	{
		color: "blue",
		description: "Berthing"
	},
	{
		color: "blue",
		description: "Berthing"
	},
	{
		color: "blue",
		description: "Berthing"
	},
	{
		color: "blue",
		description: "Berthing"
	},
	{
		color: "blue",
		description: "Berthing"
	},
];

function BodyContent(props) {
	const history = useHistory();
	const classes = useStyles();

	function handleClick(row) {
		history.push(`/crew/edit/${row.id}/personal-details`);
	}

	return <React.Fragment>
		<Grid container spacing={1} className="h-full w-full block">
			<Grid item xs={12} className="flex w-full">
				<HeaderContent />
			</Grid>		
			<Grid item xs={12} className="md:flex h-screen max-h-md">
				<Grid item xs={12} md={3} className="flex">
					<TableContainer component={Paper} className="mb-4 md:mr-4 overflow-hidden flex flex-wrap items-end">
						<TableContainer className="" style={{height: 'calc(100% - 250px)'}}>
							<TableWRH rows={rows1} columns={columns1} />
						</TableContainer>
						<TableContainer className="" style={{height: 250}}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell colSpan={3} className="bg-gray-300 p-6 border border-gray-200" align="center">
											Vessel Operation Types
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="p-6"> </TableCell>
										{
											color_head && color_head.map((cell, index)=>
											<TableCell align="center" key={index} className="p-6 border border-gray-200">{cell.headerName}</TableCell>)
										}
									</TableRow>
								</TableHead>
								<TableBody>
									{
										color_rows && color_rows.map((row, index) => 
										<TableRow className={classes.tablerow} hover key={index}>
											<TableCell></TableCell>
											{
												color_head && color_head.map((col, index)=>{
													if(col.field == "color") {
														return <TableCell className="p-6 border border-gray-200" style={{backgroundColor: `${row[`${col.field}`]}`}} key={index}>
															
														</TableCell>
													} else {
														return <TableCell className="p-6 border border-gray-200" key={index}>
															{row[`${col.field}`]}
														</TableCell>
													}
												})
											}
										</TableRow>)
									}
								</TableBody>
							</Table>
						</TableContainer>
					</TableContainer>
					
				</Grid>
				<Grid item xs={12} md={9} className="block">
					<Typography variant="subtitle2" align="center" className="w-full font-bold" style={{height: 30}}>NAVEED MUHAMMAD - MASTER</Typography>				
					<TableContainer component={Paper} className="mb-4" style={{height: 'calc(100% - 130px)'}}>
						<TableSchedule rows={rows} columns={columns}/>
					</TableContainer>	
					<div className="w-full px-16 py-8 block" style={{height: 100}}>
						<Typography >
							Number of days in Month: 31
						</Typography>
						<Typography >
							Working Hours Per Week: (2020/40 - 37 hrs)(2020/41 - 72 hrs)(2020/42 - 57.5 hrs)
						</Typography>
						<Typography >
							Working Hours Per Month: 166.5
						</Typography>
					</div>
				</Grid>
			</Grid>	
		</Grid>
	</React.Fragment>
}

export default BodyContent;
