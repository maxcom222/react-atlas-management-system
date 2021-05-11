import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { Paper, TableContainer } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setAllottee } from "../store";

function BodyContent(props) {
	const dispatch = useDispatch();
	const allottees = useSelector(state=>state.crewApp.crew_details.allottees.list);
	const [state, setState] = React.useState({
		rows: []
	});
	React.useEffect(() => {
		if (allottees) {
			setState({
				...state,
				rows: allottees.map(allottee => ({
					...allottee,	
					relation_descr: allottee.relation ? allottee.relation.PR_DESCR : ""				
				}))
			})
		}

	}, [allottees])

	const handleSelectRow = (event) => {
		dispatch(setAllottee(event.data))
	}

	const columns = [
		{
			field: "CA_FULLNAME",
			headerName: "Name",
			width: 130
		},
		{
			field: "relation_descr",
			headerName: "Relation",
			width: 130
		},
		{
			field: "CA_BANK",
			headerName: "Bank",
			width: 130
		},
		{
			field: "CA_BANK_ACCOUNT",
			headerName: "Bank Account",
			width: 200
		},
		{
			field: "CA_AMOUNT",
			headerName: "Amount",
			width: 200
		},
	];
	
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
