import { makeStyles } from '@material-ui/core/styles';
import React, {} from 'react';
import { Grid } from '@material-ui/core';
import clsx from "clsx";
import { TableCard, BarChartCard, NotesCard, CollapseTableCard } from "./Cards";
import { 
	columns, rows, 
	work_order_last_7days_columns, work_order_last_7days_rows,
	last_sync_from_vessel_columns, last_sync_from_vessel_rows,
	new_requisition_columns, new_requisition_rows,
	stores_action_status_columns, stores_action_status_rows,
	last_reports_from_vessel_columns, last_reports_from_vessel_rows,
	crew_certs_next2months_columns, crew_certs_next2months_rows,
	vessel_certs_next2months_columns, vessel_certs_next2months_rows
} from "./DemoData";


const useStyles = makeStyles(theme => ({
	layoutRoot: {},
}));

function BodyContent(props) {
	const {state, setState} = props;
	const classes = useStyles(props);

	return <React.Fragment>
		<Grid container spacing={1}>
			<Grid item xs={12} md={3} className="p-16">
				<TableCard 
					title="Unread PMS WO Acklq"
					columns={columns}
					rows={rows}
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<TableCard 
					title="Work Orders last 7days"
					columns={work_order_last_7days_columns}
					rows={work_order_last_7days_rows}
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<TableCard 
					title="Work Orders last 30days"
					columns={work_order_last_7days_columns}
					rows={work_order_last_7days_rows}
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<TableCard 
					title="Last Sync from vessel"
					columns={last_sync_from_vessel_columns}
					rows={last_sync_from_vessel_rows}
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<TableCard 
					title="new Requisition(s) from vessel"
					columns={new_requisition_columns}
					rows={new_requisition_rows}
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<TableCard 
					title="Stores Action Status"
					columns={stores_action_status_columns}
					rows={stores_action_status_rows}
				/>
			</Grid>			
			<Grid item xs={12} md={3} className="p-16">
				<BarChartCard 
					title="Stores Action Status"
					label="Cases"
					data={[2, 3, 1]}	
					options={{
						stepSize: 1,
						max: 4
					}}				
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<BarChartCard 
					title="Vessel Certificates Expiring next two (2) Months."
					label="Vessel Certs"
					data={[53, 21, 8, 22, 19, 64, 2]}
					options={{
						stepSize: 10
					}}			
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<NotesCard 
					title="Noets (3)"
					rows={[
						"1",
						"2",
						"3"
					]}
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<BarChartCard 
					title="Crew Certificates Expiring next two (2) Months"
					label="Crew Certs"
					data={[25, 3, 27, 4, 15, 22]}
					options={{
						stepSize: 10
					}}			
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<CollapseTableCard 
					title="Crew Certificates Expiring next two (2) Months"
					columns={crew_certs_next2months_columns}
					rows={crew_certs_next2months_rows}
				/>
			</Grid>
			<Grid item xs={12} md={3} className="p-16">
				<CollapseTableCard 
					title="Vessel Certificates Expiring next two (2) Months"
					columns={vessel_certs_next2months_columns}
					rows={vessel_certs_next2months_rows}
				/>
			</Grid>
		</Grid>
	</React.Fragment>
}

export default BodyContent;
