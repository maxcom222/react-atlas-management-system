import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import {  Paper, TableContainer} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setCPrevServ } from "../store";

function BodyContent(props) {
	const dispatch = useDispatch();
	const cprev_services = useSelector(state=>state.crewApp.crew_details.cprev_services.list);
	const [state, setState] = React.useState({
		rows: []
	});

	React.useEffect(() => {
		if (cprev_services) {
			setState({
				...state,
				rows: cprev_services.map(services => ({
					...services,
					vessel_name: services.vessel ? services.vessel.VESSEL_NAME : "",
					rank_descr: services.rank ? services.rank.PR_DESCR : "",
					agent_descr: services.manning_agency ? services.manning_agency.PMA_DESCR : "",
					soff_reason_descr: services.soff_reason ? services.soff_reason.SR_DESCR : ""					
				}))
			})
		}

	}, [cprev_services])


	const columns = [
		{
			field: "vessel_name",
			headerName: "Vessel",
			width: 130,
		},
		{
			field: "rank_descr",
			headerName: "Rank",
			width: 130
		},	
		{
			field: "agent_descr",
			headerName: "Agent",
			width: 130
		},	
		{
			field: "CT_START_DATE",
			headerName: "Departure",
			width: 130
		},	
		{
			field: "CT_SON_DATE",
			headerName: "S/On",
			width: 130
		},	
		{
			field: "CT_SOFF_DATE",
			headerName: "S/Off",
			width: 130
		},	
		{
			field: "CT_END_DATE",
			headerName: "Repatriation",
			width: 130
		},		
		{
			field: "CT_SOFF_PORT",
			headerName: "S/Off Port",
			width: 130
		},	
		{
			field: "soff_reason_descr",
			headerName: "S/Off Reason",
			width: 130
		},	
		{
			field: "CT_COE",
			headerName: "COE",
			width: 130
		},
	];
	
	const handleSelectRow = (event) => {
		dispatch(setCPrevServ(event.data))
	}

	return <React.Fragment>
		<TableContainer component={Paper} className="w-full h-full">
			<DataGrid 
				rows={state.rows}
				columns={columns}		
				rowHeight={25}	
				onRowClick={event => handleSelectRow(event)}
			/>
		</TableContainer>
	</React.Fragment>
}

export default BodyContent;
