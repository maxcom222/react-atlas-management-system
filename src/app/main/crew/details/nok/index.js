import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import LeftSidebarContent from '../LeftSidebarContent';
import ToolbarContent from "./ToolbarContent";
import NOKDialog from "./NOKDialog";
import { useDispatch, useSelector } from "react-redux";
import { getNOK, getRelations } from "../store";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function NOKPage(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [ state, setState ] = useState({});
	const crew = useSelector(state => state.crewApp.crew.recent);

	React.useEffect(() => {
		if(crew) {
			dispatch(getNOK());
			dispatch(getRelations());
		}
	}, [dispatch, crew]);

	return <>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Edit / View Crew > Next of KIN</h4>
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
		<NOKDialog />
	</>
}

export default NOKPage;
