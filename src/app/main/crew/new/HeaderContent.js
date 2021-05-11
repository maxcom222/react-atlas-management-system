import React, {} from 'react';
import { Button, colors } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
	return <>
	 	<ButtonSuccess variant="contained" className="mr-5 text-white" onClick={props.handleSave}>
			 Save
		</ButtonSuccess>
		<ButtonDanger variant="contained" >
			 Close
		</ButtonDanger>
	</>;
}

export default HeaderContent;
