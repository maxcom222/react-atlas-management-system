import { DataGrid} from "@material-ui/data-grid";
import React, {  } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContent from './HeaderContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Grid, Typography, TableCell, Table, TableRow, TableBody, TableHead } from "@material-ui/core";
import TableRetention from "./TableRetention";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650
    },
}));

const createData = (id, rank, on_board, on_leave, crew_pool, pool_ratio, own_request, contact_misconduct, injury_illness, retention_rates) => {
    return {id, rank, on_board, on_leave, crew_pool, pool_ratio, own_request, contact_misconduct, injury_illness, retention_rates};
}

const columns = [
	{
		field: "rank",
		headerName: "Rank",
		width: 130
	},
	{
		field: "on_board",
		headerName: "On board",
		align: "right",
		width: 130
	},
	{
		field: "on_leave",
		headerName: "On Leave",
		align: "right",
		width: 130
	},
	{
		field: "crew_pool",
		headerName: "Crew Pool",
		align: "right",
		width: 130
	},
	{
		field: "pool_ratio",
		headerName: "Pool Ratio",
		align: "right",
		width: 130
	},
	{
		field: "own_request",
		headerName: "Own Request",
		align: "right",
		width: 130
	},
	{
		field: "contact_misconduct",
		headerName: "Contact Misconduct",
		align: "right",
		width: 230
	},
	{
		field: "injury_illness",
		headerName: "Injury / Illness",
		align: "right",
		width: 130
	},
	{
		field: "retention_rates",
		headerName: "Retention Rates %",
		align: "right",
		width: 130
	},
];

const rows = [
	createData(0, "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test"),
	createData(1, "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test")
];

const footerValue = createData(0, "", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test");


function BodyContent(props) {
	const history = useHistory();
	const classes = useStyles();

	function handleClick(row) {
		history.push(`/crew/edit/${row.id}/personal-details`);
	}
	return <React.Fragment>
		<Grid container spacing={2} className="h-full w-full block">
			<Grid item xs={12} className="flex w-full">
				<HeaderContent />
			</Grid>		
			<Grid item xs={12} className="flex h-screen max-h-sm">
				<TableContainer component={Paper} className="">
					<TableRetention rows={rows} columns={columns} />
				</TableContainer>
			</Grid>	
			<Grid item xs={12}>
				<TableContainer component={Paper}  className="flex">
					<Table className={classes.table} size="small" aria-label="">
						<TableBody>
							<TableRow>
								{
									columns && columns.map((col, col_index) => 
									<TableCell key={col_index} width={col.width}>
										{
											footerValue[`${col.field}`] && 
											<Typography className="px-8 py-4 bg-gray-300" align="right">
												{footerValue[`${col.field}`]}
											</Typography>
										}
										
									</TableCell>)
								}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>	
		</Grid>
	</React.Fragment>
}

export default BodyContent;
