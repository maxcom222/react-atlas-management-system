import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import LeftSidebarConfig from "./LeftSidebarConfig";
import { useHistory, useParams } from "react-router-dom";
import { getCrew } from '../store/crewSlice';

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		paddingLeft: 24
	}
}));

function LeftSidebarContent(props) {
	const { crewId } = useParams();
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getCrew(crewId));
	}, [dispatch])

	const classes = useStyles();
	return <React.Fragment>
		<div className="flex-auto border-l-1">
			<div>
				<List>
					{LeftSidebarConfig &&
						LeftSidebarConfig.map((label, index) => (
							<ListItem
								button
								component={NavLinkAdapter}
								to={`/crew/details/${crewId}/${label.handle}`}
								key={index}
								className={classes.listItem}
							>
								<Icon className="list-item-icon" color="action">
									label
								</Icon>
								<ListItemText primary={label.title} disableTypography />
							</ListItem>
						))}
				</List>
			</div>
		</div>
	</React.Fragment>
}

export default LeftSidebarContent;
