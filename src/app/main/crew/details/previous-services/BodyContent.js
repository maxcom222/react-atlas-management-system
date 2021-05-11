import { makeStyles } from '@material-ui/core/styles';
import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { TableContainer, Paper } from '@material-ui/core';

import { useSelector, useDispatch } from "react-redux";
import { setPrevServ } from "../store";

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	textField: {
		width: "100%",
		marginRight: ".5rem",
	},
	formControl: {
		minWidth: 120,
	},
	spacingBottom: {
		marginBottom: "2rem"
	},
	dateField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

const columns = [
	{ field: 'CPR_MANAGER_NAME', headerName: 'Manager', width: 130 },
	{ field: 'CPR_VESSEL_NAME', headerName: 'First name', width: 130 },
	{ field: 'vessel_type_desc', headerName: 'Vessel Type', width: 130 },
	{ field: 'rank_desc', headerName: 'Rank', width: 130 },
	{ field: 'CPR_START_DATE', headerName: 'Departure', width: 130 },
	{ field: 'CPR_SON_DATE', headerName: 'S/On', width: 130 },
	{ field: 'CPR_SOFF_DATE', headerName: 'S/Off', width: 130 },
	{ field: 'CPR_END_DATE', headerName: 'Repatriation', width: 130 },
	{ field: 'soff_reason_desc', headerName: 'S/Off Reason', width: 130 },
  ];


function BodyContent(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const cellAlign = "left";
	const prev_services = useSelector(state => state.crewApp.crew_details.prev_services.list);
	const [state, setState] = React.useState({
		rows: []
	});

	React.useEffect(() => {
		if (prev_services) {
			setState({
				...state,
				rows: prev_services.map(services => ({
					...services,
					vessel_type_desc: services.vessel_type ? services.vessel_type.VT_DESCR : "",
					rank_desc: services.rank ? services.rank.PR_DESCR : "",
					soff_reason_desc: services.soff_reason ? services.soff_reason.SR_DESCR : "",
				}))
			})
		}
	}, [prev_services])

	const handleSelectRow = (event) => {
		dispatch(setPrevServ(event.data))
	}

	return <TableContainer component={Paper} style={{ height: '100%', width: '100%' }}>
			<DataGrid rows={state.rows} columns={columns} rowHeight={25} onRowClick={event => handleSelectRow(event)} />
		</TableContainer>
}

export default BodyContent;
