import { makeStyles } from '@material-ui/core/styles';
import { 
	Container, 
	Paper, 
	TableContainer, 
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Button } from '@material-ui/core';
import React, {	useState } from 'react';
import clsx from "clsx";
import { Search } from "@material-ui/icons";
import { isEmpty } from "app/functions";
import { useSelector, useDispatch } from "react-redux";
import { getCrewTrans } from "../store/crewSlice";

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
		marginBottom: "1rem"
	},
	spacingBottomSmall: {
		marginBottom: '0.5rem'
	},
	select: {
		height:40
	},
	noPadding: {
		padding:0,
		minWidth:'15px'
	},
	noTransform: {
		textTransform:"none"
	}
}));

function HeaderContent(props) {
	const { vessels } = useSelector(state => state.crewApp.crew_details);
	const [state, setState] = useState({});
	const classes = useStyles(props);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}
	const handleSearch = (e) => {
		dispatch(getCrewTrans(state))
	}

	return <React.Fragment>
		<TableContainer component={Paper} className="w-full">
			<div className="flex p-24 items-center">
				<Grid container className="flex justify-between">
					<div className="flex">
						<FormControl variant="outlined" className={clsx(classes.formControl, "md:mr-48 mb-8")} size="small">
							<InputLabel id={`select-label-vessel`}>Vessel</InputLabel>
							<Select
								labelId={`select-label-vessel`}
								label="Vessel"
								value={isEmpty(state.vessel)}
								onChange={handleChange}
								name="vessel"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{
									vessels.list && vessels.list.map((v, i) => <MenuItem value={v.id} key={i}>{v.VESSEL_NAME}</MenuItem>)
								}
							</Select>
						</FormControl>
						
						<TextField 
							variant="outlined"
							label="Period"
							className="mb-8 mr-5"
							size="small"	
							value={isEmpty(state[`period_from`])}	
							name="period_from"
							onChange={handleChange}
							type="date"
							InputLabelProps={{
								shrink: true,
								fontSize: '.5rem'
							}}
						/>
						<Typography className="px-8">-</Typography>
						<TextField 
							variant="outlined"
							className="mb-8 mr-5"
							size="small"	
							value={isEmpty(state[`period_to`])}
							name="period_to"
							onChange={handleChange}
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<Button 
						variant="contained"
						color="primary"
						size="small"
						className="mb-8 mr-5"
						onClick={handleSearch}
					>
						<Search />
						Search
					</Button>
				</Grid>
			</div>
		</TableContainer>
	</React.Fragment>
}

export default HeaderContent;
