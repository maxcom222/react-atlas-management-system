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

function HeaderContent(props) {
	const classes = useStyles(props);
	return <>
	</>;
}

export default HeaderContent;
