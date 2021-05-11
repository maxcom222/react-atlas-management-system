import FusePageSimple from '@fuse/core/FusePageSimple';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import HeaderContent from './HeaderContent';
import LeftSidebarContent from '../LeftSidebarContent';
import ToolbarContent from "./ToolbarContent";
import { openDialog, closeDialog } from "app/store/fuse/dialogSlice";
import { AppBar, Toolbar, Typography, Button, DialogActions, DialogContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CPrevServDialog from "./CPrevServDialog";
import { getCPrevServs, getVessels, getMngAgents, getSoffReasons, getCurrencies } from "../store";
import { getRanks } from "app/main/crew/ranks/store/rankSlice";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function CompanyPreviousServicesPage(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [ state, setState ] = useState({});
	const crew = useSelector(state => state.crewApp.crew.recent);

	React.useEffect(() => {
		if(crew) {
			dispatch(getCPrevServs());
			dispatch(getVessels());
			dispatch(getMngAgents());
			dispatch(getRanks());
			dispatch(getSoffReasons());
			dispatch(getCurrencies());
		}
	}, [dispatch, crew]);

	return <>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Edit / View Crew > Company Previous Services</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<ToolbarContent/>
				</div>
			}
			content={
				<div className="p-24 h-full">
					<BodyContent/>
				</div>
			}
			leftSidebarContent={<LeftSidebarContent />}	
			sidebarInner		
		/>
		<CPrevServDialog />
	</>
}

export default CompanyPreviousServicesPage;
