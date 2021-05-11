import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import ToolbarContent from "./ToolbarContent";
import reducer from "./../store";
import withReducer from "app/store/withReducer";
import { useDispatch, useSelector } from "react-redux";
import { getRanks } from "app/main/crew/ranks/store/rankSlice";
import { getNationalities, getReligions, getSexTypes, getMaritalStatus, getMngAgents, getManagers, getCountries, getPort } from "app/main/crew/details/store";



const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function NewPage(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [ state, setState ] = useState({});
	const form = React.useRef(null);

	React.useEffect(() => {
		dispatch(getNationalities());
		dispatch(getRanks());
		dispatch(getReligions());
		dispatch(getSexTypes());
		dispatch(getMaritalStatus());
		dispatch(getMngAgents());
		dispatch(getManagers());
		dispatch(getCountries());
		dispatch(getPort());
	}, [dispatch]);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>New Crew</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<ToolbarContent state={state} setState={setState} form={form}/>
				</div>
			}
			content={
				<div className="p-24">
					<BodyContent state={state} setState={setState} form={form}/>
				</div>
			}
		/>
	);
}

export default withReducer("crewApp", reducer)(NewPage);
