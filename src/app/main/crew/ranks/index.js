import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import ToolbarContent from "./ToolbarContent";

import { useDispatch, useSelector } from "react-redux";
import RankDialog from "./RankDialog";
import reducer from "./store";
import withReducer from "app/store/withReducer";
import { getRanks } from "./store/rankSlice";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function RanksPage(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [ state, setState ] = useState({});

	React.useEffect(() => {
		dispatch(getRanks());
	}, [dispatch]);

	return (<>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Crew Ranks</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<ToolbarContent />
				</div>
			}
			content={
				<div className="p-24 h-full">
					<BodyContent />
				</div>
			}		
		/>
		<RankDialog />
	</>);
}

export default withReducer("rankApp", reducer)(RanksPage);
