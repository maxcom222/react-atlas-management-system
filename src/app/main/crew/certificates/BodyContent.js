import { makeStyles } from '@material-ui/core/styles';
import React, {} from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { TableContainer, Paper, Checkbox, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { setCertCateg, getCertificates, setCertificate } from "./store/certificateSlice";

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

function createData(id, description, abrv, order) {
	return {id, description, abrv, order};
}



const columns_category = [
	{
		field: "PCC_DESCR",
		headerName: "Description",
		headerAlign: "center",
		width: 200
	}
]


function BodyContent(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const { certificate } = useSelector(state => state.certificateApp);
	const rows_category = certificate.category.list;
	const rows = certificate.list;

	const columns = [
		{ field: 'PC_DESCR', headerName: 'Description', width: 250, headerAlign: "center" },
		{ field: 'PC_ABRV', headerName: 'Abrv', width: 130, headerAlign: "center" },
		{ field: 'PC_ORDER', headerName: 'Order', width: 130, headerAlign: "center", align: "right" },
		{ 
			field: 'optional_cert_stcw', 
			headerName: 'Optional Certificate More than STCW', 
			width: 200, 
			headerAlign: "center",
			align: "center",
			renderCell: (params)=> {
				return <div className="w-full justify-center">
					<Checkbox color="secondary" />
				</div>
			},
		},
		{
			field: 'kpi_stcw', 
			headerName: 'KPI (STCW)', 
			width: 200, 
			headerAlign: "center",
			align: "center",
			renderCell: (params)=> {
				return <div className="w-full justify-center">
					<Checkbox color="secondary" />
				</div>
			},
		}
	  ];

	// handles...
	const handleSelectCategory = (event) => {
		dispatch(setCertCateg(event.data));
		dispatch(getCertificates(event.data));
		dispatch(setCertificate(null));
	};

	const handleSelectCertificate = (event) => {
		dispatch(setCertificate(event.data));
	};

	return <Grid container spacing={1} className="h-full w-full">
		<Grid item xs={12} md={3} className="flex">
			<Paper className="w-full">
				<DataGrid rows={rows_category} columns={columns_category} rowHeight={25} hideFooter onRowClick={event => handleSelectCategory(event)} />
			</Paper>
		</Grid>
		<Grid item xs={12} md={9} className="flex">
			<Paper className="w-full">
				<DataGrid rows={rows} columns={columns} rowHeight={25} showCellRightBorder showColumnRightBorder onRowClick={event => handleSelectCertificate(event)} />
			</Paper>
		</Grid>
	</Grid>
}

export default BodyContent;
