import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import HeaderContent from './HeaderContent';
import LeftSidebarContent from '../LeftSidebarContent';
import ToolbarContent from "./ToolbarContent";
import AppraisalDialog from "./AppraisalDialog";
import { useDispatch, useSelector } from "react-redux";
import { getAppraisals, getVessels, getEmpStatus } from "../store";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function AppraisalsPage(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [ state, setState ] = useState({});
	const crew = useSelector(state => state.crewApp.crew.recent);

	React.useEffect(() => {
		if(crew) {
			dispatch(getAppraisals());
			dispatch(getVessels());
			dispatch(getEmpStatus());
		}
	}, [dispatch, crew]);

	
	return <>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Edit / View Crew > Appraisals</h4>
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
		<AppraisalDialog />
	</>
}

export default AppraisalsPage;
