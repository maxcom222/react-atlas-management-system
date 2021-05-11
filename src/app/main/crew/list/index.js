import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BodyContent from './BodyContent';
import { getVessels } from "app/main/crew/details/store";
import { useDispatch } from "react-redux";
import { getCrewTrans } from "../store/crewSlice";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function ListPage(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getVessels());
		dispatch(getCrewTrans());
	}, [dispatch]);
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Crew List</h4>
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

export default ListPage;
