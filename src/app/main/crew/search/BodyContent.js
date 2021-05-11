import { DataGrid} from "@material-ui/data-grid";
import React, {  } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContent from './HeaderContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector, useDispatch } from "react-redux";
import { setCrew } from "../store/crewSlice";
import { CUR_YEAR } from "app/functions";


const columns = [
	{ field: 'SGULL_CODE', headerName: 'ID' },
	{ field: 'm_agent_name', headerName: 'M' },
	{ field: 'LAST_NAME', headerName: 'Last name', width: 130 },
	{ field: 'FIRST_NAME', headerName: 'First name', width: 130 },
	{ field: 'FATHER_NAME', headerName: 'Father', width: 130 },
	{ field: 'MOTHER_NAME', headerName: 'Mother', width: 130 },
	{ field: 'age', headerName: 'Age', width: 130 },
	{ field: 'rank_descr', headerName: 'Lic Rank', width: 130 },
	{ field: 'nat_descr', headerName: 'Nationality', width: 130 },
	{ field: 'birthday', headerName: 'Birthdate', width: 130 },
	{ field: 'av_from', headerName: 'Av.From', width: 130 },
	{ field: 'av_to', headerName: 'Av.to', width: 130 },
	// { field: 'last_rank', headerName: 'Last Rank', width: 130 },
	// { field: 'vessel', headerName: 'Vessel', width: 130 },
	// { field: 'status', headerName: 'Status', width: 130 },
  ];
  

function BodyContent(props) {
	const history = useHistory();
	const rows = useSelector(state => state.crewApp.crew.searchlist);
	const dispatch = useDispatch();
	const [state, setState] = React.useState({
		rows: []
	});

	React.useEffect(() => {
		if (rows) {
			console.log(rows);
			setState({
				...state,
				rows: rows.map(row => ({
					...row,
					m_agent_name: row.manager ? row.manager.M_COMPANY_ABRV : "",
					rank_descr: row.rank ? row.rank.PR_DESCR : "",
					nat_descr: row.nationality ? row.nationality.PN_DESCR : "",
					birthday: row.BIRTH_DATE ? row.BIRTH_DATE.split('-').join('/') : "",
					av_from: row.AV_FROM ? row.AV_FROM.split('-').join('/') : "",
					av_to: row.AV_TO ? row.AV_TO.split('-').join('/') : "",
					age: row.BIRTH_DATE ? (Number(CUR_YEAR) - Number(row.BIRTH_DATE.split('-')[0])) : ""
				}))
			})
		}
	}, [rows])

	function handleClick(event) {
		dispatch(setCrew(event.data));
	}

	return <>
	 	<HeaderContent />		 
		<TableContainer component={Paper} className="overflow-hidden overflow-x-auto">
			<div style={{width: '100%', height: 600}}>
				<DataGrid 
					rows={state.rows} 
					columns={columns} 
					onRowClick={event => handleClick(event)} 
					rowHeight={25}
				/>
			</div>
		</TableContainer>		
	</>;
}

export default BodyContent;
