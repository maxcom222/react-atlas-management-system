import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BodyContent from './BodyContent';
import HeaderContent from './HeaderContent';
import { getVessels } from "app/main/crew/details/store";
import { useDispatch } from "react-redux";
import { getCrewTransRH } from '../store/workingarrSlice';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function WorkingArrangementsPage(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	React.useEffect(() => {
		dispatch(getVessels());
		dispatch(getCrewTransRH())
	}, [dispatch])
	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Crew Working Arrangements</h4>
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

export default WorkingArrangementsPage;
