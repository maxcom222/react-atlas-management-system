import React, {} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
		<h3>Header ...</h3>
	</>;
}

export default HeaderContent;
