import { makeStyles } from '@material-ui/core/styles';
import SplitButton from './SplitButton';
import { Container, Paper } from '@material-ui/core';
import React, {useState} from 'react';
import { 
	Grid,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import clsx from "clsx";
import { getSearchCrews } from "../store/crewSlice";
import { useDispatch, useSelector } from "react-redux";

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

function isEmpty(value) {
	return value ? value : "";
}

function HeaderContent(props) {
	const [state, setState] = useState({});
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const { rank } = useSelector(state => state.rankApp);
	const {nationalities, managers, vessels, employ_status} = useSelector(state => state.crewApp.crew_details);

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}
	const handleClickSearch = (event) => {
		dispatch(getSearchCrews(state));
	}
	const handleClear = () => {
		setState({})
	}

	return <>
		<Grid container spacing={2} className={clsx(classes.spacingBottom)}>
			<Grid item xs={12} md={9}>
				<Container component={Paper}>
				<Grid container spacing={2} className="px-10 py-10">
					<Grid item xs={12} md={6}>
						<TextField							
							label="Name"
							variant="outlined"		
							className={clsx(classes.textField, classes.spacingBottom)} 
							size='small'
							value={isEmpty(state.name)}
							name="name"
							onChange={handleChange}
						/>
						<Grid container spacing={1}>
							<Grid item xs={6} md={6} >
								<div>
									<FormControl required variant="outlined" className={clsx(classes.formControl, "w-full mr-5")} size='small'>
										<InputLabel id="rank-label">Rank</InputLabel>
										<Select
											labelId="rank-label"
											label="Rank"
											value={isEmpty(state.rank)}
											name="rank"
											onChange={handleChange}											
										>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{
											rank.list && rank.list.map((r, i) => <MenuItem value={r.id} key={i}>{r.PR_DESCR}</MenuItem>)
										}
										</Select>
									</FormControl>
								</div>
							</Grid>
							<Grid item xs={6} md={6}>
								<div>
									<FormControl required variant="outlined" className={clsx(classes.formControl, "w-full mr-5",classes.spacingBottomSmall)} size='small'>
										<InputLabel id="nation">Nation</InputLabel>
										<Select
											labelId="nation"
											label="Nation"
											value={isEmpty(state.nation)}
											name="nation"
											onChange={handleChange}
										>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{
											nationalities.list && nationalities.list.map((n, i) => <MenuItem value={n.id} key={i}>{n.PN_DESCR}</MenuItem>)
										}
										</Select>
									</FormControl>
								</div>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6} md={6}>
								
							</Grid>
							<Grid item xs={6} md={6}>
								<div>
									<FormControl required variant="outlined" className={clsx(classes.formControl, "w-full mr-5")} size='small'>
										<InputLabel id="onlyformanager">Only for Manager</InputLabel>
										<Select
											labelId="onlyformanager"
											label="Only for Manager"											
											value={isEmpty(state.onlyformanager)}
											name="onlyformanager"
											onChange={handleChange}
											
										>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{
											managers.list && managers.list.map((m, i) => <MenuItem value={m.id} key={i}>{m.M_COMPANY_NAME}</MenuItem>)
										}
										</Select>
									</FormControl>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={3} >
						{/* <div className="w-full">

							<FormControl required variant="outlined" className={clsx(classes.formControl, "w-full mr-5",classes.spacingBottom)} size='small'>
								<InputLabel id="currentstatus">Current Status</InputLabel>
								<Select
									labelId="currentstatus"
									value={isEmpty(state.currentstatus)}
									onChange={handleChange}
									label="Current Status"
									name="currentstatus"									
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={1}>Rank 1</MenuItem>
								<MenuItem value={2}>Rank 2</MenuItem>
								<MenuItem value={3}>Rank 3</MenuItem>
								</Select>
							</FormControl>
						</div> */}
						<TextField							
							label="Phone"
							variant="outlined"		
							className={clsx(classes.textField, classes.spacingBottom)} 
							size='small'
							value={isEmpty(state.phone)}
							name="phone"
							onChange={handleChange}
						/>
						<TextField							
							label="SGULL Id"
							variant="outlined"		
							className={clsx(classes.textField, classes.spacingBottom)} 
							size='small'
							value={isEmpty(state.sgull_id)}
							name="sgull_id"
							onChange={handleChange}
						/>
						<div className="w-full">
							<FormControl required variant="outlined" className={clsx(classes.formControl, "w-full mr-5",classes.spacingBottom)} size='small'>
								<InputLabel id="overalevaluation">Overal Evaluation</InputLabel>
								<Select
									labelId="overalevaluation"
									value={isEmpty(state.overalevaluation)}
									onChange={handleChange}
									label="Overal Evaluation"
									name="overalevaluation"									
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{
									employ_status.list && employ_status.list.map((e, i) => <MenuItem value={e.id} key={i}>{e.ES_DESCR}</MenuItem>)
								}
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} md={3}>
						<div className="w-full">
							<FormControl required variant="outlined" className={clsx(classes.formControl, "w-full mr-5", classes.spacingBottom)} size='small'>
								<InputLabel id="onb_ofb_with">ONB with</InputLabel>
								<Select
									labelId="onb_ofb_with"
									label="ONB with"									
									value={isEmpty(state.onb_ofb_with)}
									name="onb_ofb_with"
									onChange={handleChange}
									
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{
									vessels.list && vessels.list.map((v, i) => <MenuItem value={v.id} key={i}>{v.VESSEL_NAME}</MenuItem>)
								}
								</Select>
							</FormControl>
						</div>
						<div className="w-full">
							<FormControl required variant="outlined" className={clsx(classes.formControl, "w-full mr-5", classes.spacingBottom)} size='small'>
								<InputLabel id="prserv_with">Prserv with</InputLabel>
								<Select
									labelId="prserv_with"
									label="Prserv with"									
									value={isEmpty(state.prserv_with)}
									name="prserv_with"
									onChange={handleChange}
									
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{
									vessels.list && vessels.list.map((v, i) => <MenuItem value={v.id} key={i}>{v.VESSEL_NAME}</MenuItem>)
								}
								</Select>
							</FormControl>
						</div>
						<div className="w-full">
							<FormControl variant="outlined" className={clsx(classes.formControl, "w-full mr-5")} size='small'>
								<InputLabel id="has_appraisal_as">Has Appraisal as</InputLabel>
								<Select
									labelId="has_appraisal_as"
									label="Has Appraisal as"									
									value={isEmpty(state.has_appraisal_as)}
									name="has_appraisal_as"
									onChange={handleChange}
									
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{
									employ_status.list && employ_status.list.map((e, i) => <MenuItem value={e.id} key={i}>{e.ES_DESCR}</MenuItem>)
								}
								</Select>
							</FormControl>
						</div>
					</Grid>					
				</Grid>
				</Container>
			</Grid>
			<Grid item xs={12} md={3}>
				<Container component={Paper} className="py-16">
					<SplitButton onClick={handleClickSearch} handleClear={handleClear} />				
				</Container>
			</Grid>
		</Grid>
	</>;
}

export default HeaderContent;
