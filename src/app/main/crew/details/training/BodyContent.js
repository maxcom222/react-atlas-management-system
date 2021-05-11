import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Paper, TableContainer, Typography, Grid } from "@material-ui/core";



const createData = (id, course_no, course_description, date, total_score, total_cmpl, notes) => {
	return {id, course_no, course_description, date, total_score, total_cmpl, notes};
};

const columns = [
	{
		field: "course_no",
		headerName: "Course No",
		width: 130
	},
	{
		field: "course_description",
		headerName: "Course Description",
		width: 230
	},
	{
		field: "date",
		headerName: "Date",
		width: 130
	},
	{
		field: "total_score",
		headerName: "Total Score",
		width: 200
	},
	{
		field: "total_cmpl",
		headerName: "Total Cmpl",
		width: 200
	},
	{
		field: "notes",
		headerName: "Notes",
		width: 200
	},
];
const rows = [
	createData(0, "Test", "Test", "Test", "Test", "Test", "Test"),
];

function BodyContent(props) {
	return <React.Fragment>
		<Grid container spacing={1} className="h-full">
			<Grid item xs={12} md={7} className="w-full flex">
				<TableContainer component={Paper} className="w-full overflow-hidden">
					<DataGrid 
						rows={rows}
						columns={columns}		
						rowHeight={25}
						hideFooter	
						checkboxSelection
					/>
				</TableContainer>
			</Grid>
			<Grid item xs={12} md={5} className="w-full flex flex-wrap">				
				<TableContainer component={Paper} className="h-full overflow-hidden">
					<Typography variant="subtitle1" align="center">
						Compliance
					</Typography>
					<DataGrid 
						rows={[]}
						columns={[
							{
								field: "course",
								headerName: "Counrse",
								width: 130
							},
							{
								field: "date",
								headerName: "Date",
								width: 130
							},
							{
								field: "score",
								headerName: "Score",
								width: 130
							},
						]}		
						rowHeight={25}	
						hideFooter
					/>
				</TableContainer>
			</Grid>
		</Grid>
	</React.Fragment>
}

export default BodyContent;
