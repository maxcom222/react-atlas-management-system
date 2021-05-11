import React, {  } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContent from './HeaderContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Grid, Typography} from "@material-ui/core";
import TableSchedule from "./TableSchedule";
import { makeStyles } from "@material-ui/core/styles";
import { header_keys } from "./demoData";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";

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

const createData = (id, name, rank, w, s_p, data) => {
    return {id, name, rank, data};
};





function BodyContent(props) {
	const history = useHistory();
	const classes = useStyles();
	const { working_arrangements } = useSelector(state => state.crewApp);
	const [state, setState] = React.useState({
		rows: [],
		selectedRow: null,
        workingHours: 0
	})
	
	React.useEffect(() => {
		var original_rows = working_arrangements.filteredList;
		if(original_rows.length > 0) {
			// console.log(original_rows);
			var rows = original_rows.reduce((acc, current) => {
				if(!acc[current.crew_trans.crew.id]) {
					acc[current.crew_trans.crew.id] = {
						data: []
					};
				}
				acc[current.crew_trans.crew.id] = {
					id: current.crew_trans.crew.id,
					name: `${current.crew_trans.crew.FIRST_NAME} ${current.crew_trans.crew.LAST_NAME}`,
					rank: current.crew_trans.rank ? current.crew_trans.rank.PR_DESCR : "",
					data: [
						...acc[current.crew_trans.crew.id].data,
						current
						// [
						// 	current.CTRH_WATCHKEEPING,
						// 	current.CTRH_AT_TYPE,
						// 	...Object.keys(current).filter(key => key[0] == "H").map(key => (current[key]))
						// ]
					]
				};
				return acc;
			}, []);
			setState({
				...state,
				rows: rows
			})
			// console.log(rows);
		}

	}, [working_arrangements]);
	

	function handleClick(row) {
		history.push(`/crew/edit/${row.id}/personal-details`);
	}

	const data_head = header_keys.map((key, index) => {
		if(index % 2 == 0) {
			return {
				field: key,
				headerName: "00",
				width: 5
			}
		} else {
			return {
				field: key,
				headerName: "30",
				width: 5
			}
		}
	})

	const columns = [
		{
			field: "",
			headerName: "*",
			width: 10
		},
		{
			field: "name",
			headerName: "Name",
			width: 100
		},
		{
			field: "rank",
			headerName: "Rank",
			align: "center",
			width: 110
		},
		{
			field: "CTRH_WATCHKEEPING",
			headerName: "W",
			align: "center",
			width: 110
		},
		{
			field: "CTRH_AT_TYPE",
			headerName: "S/P",
			align: "center",
			width: 110
		},	...data_head
	];

	return <React.Fragment>
		<Grid container spacing={1} className="h-full w-full block">
			<Grid item xs={12} className="flex w-full">
				<HeaderContent />
			</Grid>		
			<Grid item xs={12} className="md:flex h-screen max-h-lg">				
				<Grid item xs={12} className="block">			
					<TableContainer component={Paper} className="mb-4" style={{height: 'calc(100% - 100px)'}}>
						<TableSchedule columns={columns} state={state} setState={setState} />
					</TableContainer>	
					<div className="w-full px-16 py-8 block" style={{height: 100}}>
						<Typography >
							Working Arrangements: 
						</Typography>
						<Typography >
							{`Working Hours per day: ${state.workingHours}`}
						</Typography>
					</div>
				</Grid>
			</Grid>	
		</Grid>
	</React.Fragment>
}

export default BodyContent;
