import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BodyContent from './BodyContent';
import HeaderContent from './HeaderContent';
import { getVostypes, getVostypeRanks } from '../store/vostypeSlice';
import { getRanks } from "app/main/crew/ranks/store/rankSlice";
import { useDispatch } from "react-redux";
import VosTypeDialog from "./VosTypeDialog";
import ToolbarContent from "./ToolbarContent";


const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function VesselOperationTypePage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getVostypes());
		dispatch(getRanks());
	}, [dispatch]);

	return <>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Vessel Operation Type</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24 w-full overflow-x-auto">
					<ToolbarContent />
				</div>
			}
			content={
				<div className="p-24 h-full">
					<BodyContent />
				</div>
			}
		/>
		<VosTypeDialog />
	</>
}

export default VesselOperationTypePage;
