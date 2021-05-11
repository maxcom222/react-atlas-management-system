import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import LeftSidebarContent from '../LeftSidebarContent';
import ToolbarContent from './ToolbarContent';
import CertDialog from "./CertDialog";
import { openDialog, closeDialog } from "app/store/fuse/dialogSlice";
import { AppBar, Toolbar, DialogContent, Button, Dialog, DialogActions, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getCrewCerts, getCountries } from "../store";


const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));




function CertificatesPage(props) {
	const dispatch = useDispatch();
	const crew = useSelector(state => state.crewApp.crew.recent);

	const classes = useStyles(props);

	React.useEffect(() => {
		if(crew) {
			dispatch(getCrewCerts());
			dispatch(getCountries());
		}
	}, [dispatch, crew]);

	const [ bodyData, setBodyData ] = useState({});


	return <>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Edit / View Crew > Certificates</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24 w-full overflow-x-auto">
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
		<CertDialog />
	</>
}

export default CertificatesPage;
