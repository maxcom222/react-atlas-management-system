import { makeStyles } from '@material-ui/core/styles';
import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { TableContainer, Paper, Checkbox } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { setRank } from "./store/rankSlice";

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

function createData(id, description, abrv, order) {
	return {id, description, abrv, order};
}

function BodyContent(props) {
	const classes = useStyles(props);
	const rows = useSelector(state => state.rankApp.rank.list);
	const [state, setState] = React.useState(rows);
	const dispatch = useDispatch();

	const columns = [
		{ field: 'PR_DESCR', headerName: 'Description', width: 500 },
		{ field: 'PR_ABRV', headerName: 'Abrv', width: 200 },
		{ field: 'PR_AA', headerName: 'Order', width: 200 },
		{
			field: "PR_FL_ACTIVE",
			headerName: "Active",
			renderCell: (params) => {
				const { value } = params;
				return <Checkbox />
			}
		}
	];

	// handlings...
	const handleSelectRow = (event) => {
		dispatch(setRank(event.data));
	}

	return <TableContainer component={Paper} style={{ height: '100%', width: '100%' }}>
			<DataGrid rows={rows} columns={columns} rowHeight={25} showCellRightBorder showColumnRightBorder onRowClick={(event) => handleSelectRow(event)}  />
		</TableContainer>
}

export default BodyContent;
