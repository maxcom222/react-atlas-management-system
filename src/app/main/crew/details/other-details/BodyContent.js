import { makeStyles } from '@material-ui/core/styles';
import React, {} from 'react';


const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	textField: {
		width: "100%",
		marginRight: ".5rem",
	},
	formControl: {
		minWidth: 120,
	},
	spacingBottom: {
		marginBottom: "2rem"
	},
	dateField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}));

function BodyContent(props) {
	const classes = useStyles(props);

	return <>
		{/* <h3>body ...</h3> */}
	</>;
}

export default BodyContent;
