import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Paper, TableContainer } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setNOK } from "../store";

const columns = [
	{
		field: "CN_FULLNAME",
		headerName: "Name",
		width: 130
	},
	{
		field: "relation_descr",
		headerName: "Relation",
		width: 130
	},
	{
		field: "CN_PHONE",
		headerName: "Phone",
		width: 130
	},
	{
		field: "CN_MOBILE",
		headerName: "Mobile",
		width: 130
	},
	{
		field: "CN_EMAIL",
		headerName: "Email",
		width: 200
	},
];

function BodyContent(props) {
	const dispatch = useDispatch();
	const nok = useSelector(state=>state.crewApp.crew_details.nok.list);
	const [state, setState] = React.useState({
		rows: []
	});

	React.useEffect(() => {
		if (nok) {
			setState({
				...state,
				rows: nok.map(n => ({
					...n,	
					relation_descr: n.relation ? n.relation.PR_DESCR : "",		
				}))
			})
		}

	}, [nok])

	const handleSelectRow = (event) => {
		dispatch(setNOK(event.data))
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
