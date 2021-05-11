import { DataGrid} from "@material-ui/data-grid";

import React, {  } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContent from './HeaderContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Grid, Typography } from "@material-ui/core";
import { CUR_YEAR } from "app/functions";
import { useSelector, useDispatch } from "react-redux";
import { getDateFormat } from "app/functions";
  
function createData( id, num, last_name, first_name, nationality, age, last_rank, wage, status, departure, s_on_date, months_onb, s_off_date, s_off_port, s_off_reason ) {
	return { id, num, last_name, first_name, nationality, age, last_rank, wage, status, departure, s_on_date, months_onb, s_off_date, s_off_port, s_off_reason };
}

const columns = [
	{ field: 'num', headerName: '', width: 80 },
	{ field: 'SGULL_CODE', headerName: 'Id' },
	{ field: 'LAST_NAME', headerName: 'Lastname', width: 130 },
	{ field: 'FIRST_NAME', headerName: 'Firstname', width: 130 },
	{ field: 'nat_descr', headerName: 'Nationality', width: 130 },
	{ field: 'age', headerName: 'Age', width: 80 },
	{ field: 'last_rank', headerName: 'Last Rank', width: 130 },
	{ field: 'CT_TOTAL_WAGE', headerName: 'Wage', width: 130 },
	{ field: 'CT_STATUS', headerName: 'Status', width: 130 },
	{ field: 'CT_START_DATE', headerName: 'Departure', width: 130 },
	{ field: 'CT_SON_DATE', headerName: 'S/On Date', width: 130 },
	{ field: 'months_onb', headerName: 'Months ONB', width: 130 },
	{ field: 'CT_SOFF_DATE', headerName: 'S/Off Date', width: 130 },
	{ field: 'CT_SOFF_PORT', headerName: 'S/Off Port', width: 130 },
	{ field: 's_off_reason', headerName: 'S/Off Reason', width: 130 },
	{ field: 'CT_END_DATE', headerName: 'Repatriation', width: 130 },
	{ field: 'CT_COE', headerName: 'COE', width: 130 },
	{ field: 'CT_EXT_COE', headerName: 'Ext COE', width: 130 },
  ];
  
// const rows = [
// 	createData(1, "1001", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test")
// ];

function BodyContent(props) {
	const history = useHistory();
	const rows = useSelector(state => state.crewApp.crew.crew_trans_list);
	const dispatch = useDispatch();
	const [state, setState] = React.useState({
		rows: []
	});

	React.useEffect(() => {
		if (rows) {
			console.log(rows);
			setState({
				...state,
				rows: rows.map((row, index) => ({
					...row,
					num: index + 1,
					SGULL_CODE: row.crew.SGULL_CODE,
					LAST_NAME: row.crew.LAST_NAME,
					FIRST_NAME: row.crew.FIRST_NAME,
					nat_descr: row.crew.nationality ? row.crew.nationality.PN_DESCR : "",
					age: row.crew.BIRTH_DATE ? (Number(CUR_YEAR) - Number(row.crew.BIRTH_DATE.split('-')[0])) : "",
					s_off_reason: row.soff_reason ? row.soff_reason.SR_DESCR : "",
					CT_START_DATE: getDateFormat(row.CT_START_DATE),
					CT_SON_DATE: getDateFormat(row.CT_SON_DATE),
					CT_SOFF_DATE: getDateFormat(row.CT_SOFF_DATE),
					CT_END_DATE: getDateFormat(row.CT_END_DATE),
					CT_COE: getDateFormat(row.CT_COE),
					CT_EXT_COE: getDateFormat(row.CT_EXT_COE),
					last_rank: row.rank ? row.rank.PR_DESCR : "",

					m_agent_name: row.manager ? row.manager.M_COMPANY_ABRV : "",
					// rank_descr: row.rank ? row.rank.PR_DESCR : "",
					birthday: row.BIRTH_DATE ? row.BIRTH_DATE.split('-').join('/') : "",
					av_from: row.AV_FROM ? row.AV_FROM.split('-').join('/') : "",
					av_to: row.AV_TO ? row.AV_TO.split('-').join('/') : "",
				}))
			})
		}
	}, [rows])

	// function handleClick(row) {
	// 	history.push(`/crew/edit/${row.id}/personal-details`);
	// }
	return <React.Fragment>
		<Grid container spacing={2} className="h-full w-full block">
			<Grid item xs={12} className="flex w-full">
				<HeaderContent />
			</Grid>		
			<Grid item xs={12} className="flex h-full">
				<TableContainer component={Paper} className="">
					<DataGrid 
						rows={state.rows} 
						columns={columns} 
						// onRowClick={event => handleClick(event.rowModel)} 
						rowHeight={25}
						className="shadow-2xl"
					/>
				</TableContainer>
			</Grid>	
			<Grid item xs={12}>
				<TableContainer component={Paper}  className="flex justify-center p-16 ">
					<div className="flex justify-between">
						<div className="flex justify-center w-full">
							<Typography className="px-8 py-4 bg-gray-200 mr-24">35.33</Typography>
						</div>
						<div className="flex justify-center w-full">
							<Typography className="px-8 py-4 bg-gray-200 mr-24">35.33</Typography>
						</div>
						<div className="flex justify-center w-full">
							<Typography className="px-8 py-4 bg-gray-200 mr-24">35.33</Typography>
						</div>						
					</div>
				</TableContainer>
			</Grid>	
		</Grid>
	</React.Fragment>
}

export default BodyContent;
