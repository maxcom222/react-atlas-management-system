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
import PrevServDialog from "./PrevServDialog";
import { getPrevServs, getVesselTypes, getEngTypes, getNationalities, getSoffReasons } from "../store";
import { getRanks } from "app/main/crew/ranks/store/rankSlice";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function PreviousServicesPage(props) {
	const dispatch = useDispatch();
	const crew = useSelector(state => state.crewApp.crew.recent);
	const classes = useStyles(props);
	
	React.useEffect(() => {
		if(crew) {
			dispatch(getPrevServs());
			dispatch(getVesselTypes());
			dispatch(getEngTypes());
			dispatch(getNationalities());
			dispatch(getRanks());
			dispatch(getSoffReasons());
		}
	}, [dispatch, crew]);

	return <>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Edit / View Crew > Previous Services</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<ToolbarContent />
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
		<PrevServDialog />
	</>
}

export default PreviousServicesPage;
