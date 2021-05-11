import React, {  } from 'react';
import { useHistory } from "react-router-dom";
import HeaderContent from './HeaderContent';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Grid, Typography, TableCell, Table, TableRow, TableBody, TableHead, Container, Button, IconButton } from "@material-ui/core";
import TableVesselOperation from "./TableVesselOperation";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowRight, ArrowForwardIos, DoubleArrow, ArrowBackIos } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import _ from "@lodash";
import { setVostype, getAssignedRanksByVosTypeID, assignRank2VosType, removeAssignedRanks } from "../store/vostypeSlice";

const useStyles = makeStyles(theme => ({
	tablerow: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
	},
	selectedRow: {
		backgroundColor: theme.palette.action.hover,
	}
}));

const createData = (id, description, color, notes, aa) => {
    return {id, description, color, notes, aa};
}

const rank_rows = [
	"MASTER",
	"CHIEF OFFICER",
	"2ND OFFICER",
	"3RD OFFICER",
	"4TH OFFICER",
	"CHIEF ENGINEER",
	"2ND ENGINEER",
	"3RD ENGINEER",
	"4TH ENGINEER",
	"ETO",
];

function BodyContent(props) {
	const history = useHistory();
	const classes = useStyles();
	const {vostype } = useSelector(state => state.crewApp);
	const {rank} = useSelector(state => state.rankApp)
	const assigned_ranks = vostype.assigned_ranks;
	const vostypes = vostype.list;
	const ranks = _.orderBy(rank.list, ['PR_AA']);
	
	const [state, setState] = React.useState({
		ranks: [],
		rankSelected: null,
		asrSelected: null,
	});

	const dispatch = useDispatch();

	React.useEffect(() => {
		var remain_ranks = ranks;
		assigned_ranks.map(as_rank => {
			remain_ranks = remain_ranks.filter(rank => rank.id != as_rank.rank.id )
		})	
		setState({
			...state,
			ranks: remain_ranks
		})
	}, [assigned_ranks])

	const vostypeCol = [
		{
			field: "VOST_DESCR",
			headerName: "Description"
		},
		{
			field: "VOST_COLOR",
			headerName: "Color",
			align: "left",
			color: true
		},
		{
			field: "VOST_NOTES",
			headerName: "Notes",
			align: "left"
		},
		{
			field: "VOST_AA",
			headerName: "AA",
			align: "right"
		},
	];


	function handleClick(row) {
		history.push(`/crew/edit/${row.id}/personal-details`);
	}
	const handleRankSelect = (rank) => {
		setState({
			...state,
			rankSelected: rank.id
		})
	}
	const handleSelectVosType = (row) => {
		dispatch(setVostype(row));
		dispatch(getAssignedRanksByVosTypeID({
			vostypeId: row.id
		}));
		setState({
			...state,
			rankSelected: null,
		})
	}
	const handleAsrSelect = (row) => {
		setState({
			...state,
			asrSelected: row.id
		})
	}
	const handleOneAssignClick = () => {
		if(vostype.recent && state.rankSelected) {
			dispatch(assignRank2VosType({
				ranks: [state.rankSelected],
				VOST_CODE: vostype.recent.id
			}));
			setState({
				...state,
				rankSelected: null,
			})
		}
	}
	const handleAllAssignClick = () => {
		if(vostype.recent && state.ranks.length > 0) {
			dispatch(assignRank2VosType({
				VOST_CODE: vostype.recent.id,
				ranks: state.ranks.map(rank => (rank.id))
			}));
			setState({
				...state,
				rankSelected: null,
			})
		}
	}
	const handleRemoveOneAsrClick = () => {
		if(vostype.recent && state.asrSelected) {
			dispatch(removeAssignedRanks({
				ids: [state.asrSelected]
			}));
			setState({
				...state,
				asrSelected: null,
			})
		}
	}
	const handleRemoveAllAsrClick = () => {
		if(vostype.recent && assigned_ranks.length > 0) {
			dispatch(removeAssignedRanks({
				ids: assigned_ranks.map(rank => (rank.id))
			}));
			setState({
				...state,
				asrSelected: null,
			})
		}
	}
	return <React.Fragment>
		<Grid container spacing={2} className="h-full w-full">	
			<Grid item xs={12} md={6} className="flex">
				<TableContainer component={Paper} className="">
					<TableVesselOperation rows={vostypes} columns={vostypeCol} onRowClick={handleSelectVosType} />
				</TableContainer>
			</Grid>	
			{
				vostype.recent && <Grid item xs={12} md={6} className="flex">
				<TableContainer component={Paper} className="flex">
					<TableContainer className="w-full">
						<Table>
							<TableHead>
								<TableRow>
									<TableCell className="p-6 border border-gray-200" align="center">Ranks</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									state.ranks && state.ranks.map((row, index)=>
									<TableRow key={index} hover className={row.id == state.rankSelected ? classes.selectedRow : ""} onClick={event => handleRankSelect(row)}>
										<TableCell className="p-6 border border-gray-200">{row.PR_DESCR}</TableCell>
									</TableRow>)
								}
							</TableBody>
						</Table>
					</TableContainer>
					<div className="flex flex-wrap p-16">
						<div className="w-full flex items-end">
							<div className="w-full">
								<div className="justify-center w-full flex">
									<IconButton onClick={event => handleOneAssignClick()}>
										<ArrowForwardIos />
									</IconButton>	
								</div>	
								<div className="w-full justify-center flex">
									<IconButton onClick={event => handleAllAssignClick()}>
										<DoubleArrow />
									</IconButton>
								</div>
							</div>			
						</div>
						<div className="w-full">
							<div className="w-full">
								<div className="justify-center w-full flex">
									<IconButton onClick={event => handleRemoveOneAsrClick()}>
										<ArrowForwardIos style={{transform: "scaleX(-1)"}} />
									</IconButton>	
								</div>	
								<div className="w-full justify-center flex">
									<IconButton onClick={event => handleRemoveAllAsrClick()}>
										<DoubleArrow style={{transform: "scaleX(-1)"}} />
									</IconButton>
								</div>
							</div>			
						</div>
					</div>
					<TableContainer className="w-full">
						<Table>
							<TableHead>
								<TableRow>
									<TableCell className="p-6 border border-gray-200" align="center">Assigned Ranks</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									assigned_ranks && assigned_ranks.map((row, index)=>
									<TableRow key={index} hover className={row.id == state.asrSelected ? classes.selectedRow : ""} onClick={() => handleAsrSelect(row)} >
										<TableCell className="p-6 border border-gray-200" >{row.rank ? row.rank.PR_DESCR : ""}</TableCell>
									</TableRow>)
								}
							</TableBody>
						</Table>
					</TableContainer>
				</TableContainer>
			</Grid>
			}
		</Grid>
	</React.Fragment>
}

export default BodyContent;
