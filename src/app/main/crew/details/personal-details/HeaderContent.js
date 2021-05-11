import React, {} from 'react';

import { 
	Button,
	colors
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { 
	Refresh,
	Print,
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	textField: {
		width: "100%",
		marginRight: ".5rem",
	},
	formControl: {
		minWidth: 120,
	},
}));

const ButtonSuccess = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(colors.green[500]),
		backgroundColor: colors.green[500],
		'&:hover': {
		backgroundColor: colors.green[700],
		},
	}
}))(Button);

const ButtonDanger = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(colors.red[500]),
		backgroundColor: colors.red[500],
		'&:hover': {
		backgroundColor: colors.red[700],
		},
	}
}))(Button);

function HeaderContent(props) {
	const classes = useStyles(props);
	return <React.Fragment>
		<ButtonSuccess variant="contained" className="mr-5 mb-8 text-white" onClick={props.handleSave}>
				Save
			</ButtonSuccess>
			<ButtonDanger variant="contained" className="mr-5 mb-8" >
				Cancel
			</ButtonDanger>
			<Button variant="outlined" className="mr-5 mb-8">
				<Refresh />
			</Button>		
			<Button variant="outlined" className="mr-5 mb-8">
				<Print />Print
			</Button>
			<Button variant="outlined" className="mr-5 mb-8">
				Close
			</Button>	
	</React.Fragment>;
}

export default HeaderContent;
