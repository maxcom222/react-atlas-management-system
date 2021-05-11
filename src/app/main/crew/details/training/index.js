import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import HeaderContent from './HeaderContent';
import LeftSidebarContent from '../LeftSidebarContent';

import ToolbarContent from "./ToolbarContent";
import { openDialog, closeDialog } from "app/store/fuse/dialogSlice";
import { AppBar, Toolbar, Typography, Button, DialogActions, DialogContent } from "@material-ui/core";
import { useDispatch } from "react-redux";
import EditContent from "./EditContent";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function TrainingPage(props) {	
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [ state, setState ] = useState({});

	const handleSave = () => {
		// console.log(state);
	};

	const handleEdit = (event, param) => {
		dispatch(openDialog({
			children: (
				<React.Fragment>
					<div className="" style={{ maxWidth: '900px' }}>

					<AppBar position="static" elevation={1}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								Edit Appraisals
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent>
						<EditContent />
					</DialogContent>
					<DialogActions>
						<Button onClick={()=> dispatch(closeDialog())} variant="contained" className="text-white bg-green-400 hover:bg-green-500">
							Save
						</Button>
						<Button onClick={()=> dispatch(closeDialog())} variant="contained" className="text-white bg-red-400 hover:bg-red-500">
							Cancel
						</Button>
					</DialogActions>
					</div>
				</React.Fragment>
				 )
			 }))		
	}	

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Edit / View Crew > Training</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<ToolbarContent handleEdit={handleEdit} />
				</div>
			}
			content={
				<div className="p-24 h-full">
					<BodyContent state={state} setState={setState}/>
				</div>
			}
			leftSidebarContent={<LeftSidebarContent />}		
			sidebarInner	
		/>
	);
}

export default TrainingPage;
