import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BodyContent from './BodyContent';
import HeaderContent from './HeaderContent';
import ToolbarContent from "./ToolbarContent";
import reducer from "../store";
import withReducer from "app/store/withReducer";
import { useDispatch } from "react-redux";
import { getNationalities, getManagers, getVessels, getEmpStatus } from "app/main/crew/details/store";
import { getRanks } from "app/main/crew/ranks/store/rankSlice";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function SearchPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getNationalities());
		dispatch(getRanks());
		dispatch(getVessels());
		dispatch(getEmpStatus());
		dispatch(getManagers());
	}, [dispatch]);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Search Crew</h4>
				</div>
			}
			contentToolbar={
				<div className="w-full px-24 overflow-x-auto">
					<ToolbarContent />
				</div>
			}
			content={
				<div className="p-24 h-full">
					<BodyContent />
				</div>
			}
		/>
	);
}

export default withReducer("crewApp", reducer)(SearchPage);
