import FusePageSimple from '@fuse/core/FusePageSimple';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles } from '@material-ui/core/styles';
import React,{ useState } from 'react';
import BodyContent from './BodyContent';
import HeaderContent from './HeaderContent';
import ToolbarContent from "./ToolbarContent";
import { AppBar, Toolbar, Typography, Button, DialogActions, DialogContent } from "@material-ui/core";
import { useDispatch } from "react-redux";
import CertificateDialog from "./CertificateDialog";
import { getCertCategs } from "./store/certificateSlice";
import withReducer from "app/store/withReducer";
import reducer from "./store";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function CertificatesPage(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);

	React.useEffect(() => {
		dispatch(getCertCategs());
	}, [dispatch]);

	return (<>
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="px-24 flex items-center">
					<h4>Crew Certificates</h4>
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
		<CertificateDialog />
	</>);
}

export default withReducer("certificateApp", reducer)(CertificatesPage);
