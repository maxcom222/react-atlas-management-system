import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Dialog, DialogContent, DialogActions, Toolbar, Typography, AppBar, Checkbox, Table, TableBody, TableRow, TableCell, TableHead, TableFooter } from "@material-ui/core";
import clsx from "clsx";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "app/store/fuse/dialogSlice";
import { addCPrevServ, updateCPrevServ } from "../store";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 300
    }
}));

const minItemWidth = 20;

const CPrevServDialog = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const { dialog } = useSelector(state => state.fuse);
    const cprev_services = useSelector(state=>state.crewApp.crew_details.cprev_services.recent);
    const {vessels, mng_agents, soff_reasons, prm_currencies} = useSelector(state => state.crewApp.crew_details);
    const { rank } = useSelector(state => state.rankApp);
    const [state, setState] = React.useState({});

    React.useEffect(() => {
        if( dialog.options.type == "Edit" ) {
            if(cprev_services) {
                setState({
                    ...cprev_services,
                    CT_VESSEL_CODE: cprev_services.vessel ? cprev_services.vessel.id : "",
                    CT_RANK_CODE: cprev_services.rank ? cprev_services.rank.id : "",
                    CT_MNG_AGENCY_CODE: cprev_services.manning_agency ? cprev_services.manning_agency.id : "",
                    CT_SOFF_REASON_CODE: cprev_services.soff_reason ? cprev_services.soff_reason.id : "",
                    CT_WAGE_CURR: cprev_services.currency ? cprev_services.currency.id : "",
                    total_wage: "0.00"
                });
            }
        } else {
            setState({})
        }
    }, [dialog, cprev_services]);    

    const handleChange = (e) => {        
        const type = e.target.type;
        switch(type) {
            case 'checkbox': 
                    setState({
                        ...state,
                        [e.target.name]: e.target.checked ? 1 : 0
                    }); break;
            default: 
                    setState({
                        ...state,
                        [e.target.name]: e.target.value
                    });
        }        
    };

    const handleSave = () => {
        if(dialog.options.type == "New") {
            dispatch(addCPrevServ(state));
        } 
        // else 
        if(dialog.options.type == "Edit") {
            dispatch(updateCPrevServ(state));
        }
        handleClose();
	};

    const handleClose = () => {
        dispatch(closeDialog())
    }

    const contents1 = [
        {
            type: "select",
            label: "Vessel",
            children: vessels.list.map(vessel => ({
                label: vessel.VESSEL_NAME,
                key: vessel.id
            })),
            name: "CT_VESSEL_CODE"
        },
        {
            type: "select",
            label: "Agency",
            children: mng_agents.list.map(agent => ({
                label: agent.PMA_DESCR,
                key: agent.id
            })),
            name: "CT_MNG_AGENCY_CODE"
        },
        {
            type: "select",
            label: "Rank",
            children: rank.list.map(rank => ({
                label: rank.PR_DESCR,
                key: rank.id
            })),
            name: "CT_RANK_CODE"
        },
        {
            type: "date",
            label: "Departure Date",
            name: "CT_START_DATE"
        },
        {
            type: "date",
            label: "S/On Date",
            name: "CT_SON_DATE"
        },
        {
            type: "text",
            label: "S/On Place",
            name: "CT_SON_PORT"
        },
        {
            type: "select",
            label: "OFB",
            children: [
                {
                    label: "Null",
                    key: "1",
                },
                {
                    label: "ONB",
                    key: "2",
                },
                {
                    label: "OFB",
                    key: "3",
                },
            ],
            name: "CT_STATUS"
        },
    ];
    const contents2 = [
        {
            type: "date",
            label: "S/Off Date",
            name: "CT_SOFF_DATE"
        },
        {
            type: "date",
            label: "Repatriation Date",
            name: "CT_END_DATE"
        },
        {
            type: "text",
            label: "S/Off Place",
            name: "CT_SOFF_PORT"
        },
        {
            type: "select",
            label: "S/Off Reason",
            children: soff_reasons.list.map(type => ({
                label: type.SR_DESCR,
                key: type.id
            })),
            name: "CT_SOFF_REASON_CODE"
        },
    ];

    const table_data = [
        {
            type: "Basic Wage",
            amount: "0.00"
        },
        {
            type: "Overtime",
            amount: "0.00"
        },
        {
            type: "Owner Bonus",
            amount: "0.00"
        }
    ]

    const Contents = (content, index, contentId) => {
        switch (content.type) {
            case 'text' : return (
                <TextField 
                    variant="outlined"
                    label={content.label}
                    className="w-full mb-16 mr-5"
                    size="small"
                    key={index}	
                    value={isEmpty(state[`${content.name}`])}	
                    name={`${content.name}`}
                    onChange={handleChange}
                    InputProps={{
                        readOnly: content.editDisabled
                    }}                    
                />)
            case 'select' : return (
                <FormControl variant="outlined" className={clsx("w-full mr-5 mb-16")} size="small" key={index}>
                    <InputLabel id={`select-label-${index}`}>{content.label}</InputLabel>
                    <Select
                        labelId={`select-label-${index}`}
                        value={isEmpty(state[`${content.name}`])}
                        onChange={handleChange}
                        label={content.label}
                        name={`${content.name}`}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            content.children.map((item, i) => <MenuItem value={item.key} key={i}>{item.label}</MenuItem>)
                        }
                    </Select>
                </FormControl>)
            case 'date' : return (
                <TextField 
                    variant="outlined"
                    label={content.label}
                    className="w-full mb-16 mr-5"
                    size="small"
                    key={index}	
                    value={isEmpty(state[`${content.name}`])}	
                    name={`${content.name}`}
                    onChange={handleChange}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />)
            case 'file' : return (
                <TextField 
                    variant="outlined"
                    label={content.label}
                    className="w-full mb-16 mr-5"
                    size="small"
                    key={index}	
                    value={isEmpty(state[`${content.name}`])}	
                    name={`${content.name}`}
                    onChange={handleChange}
                    type="file"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />)
        };
    };

    return (
        <Dialog
            open={dialog.state}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            classes={{
                paper: 'rounded-8'
            }}
        >
            {
                state && <>
                    <AppBar position="static" elevation={1}>
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                {dialog.options.type} Company Previous Services
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Grid container spacing={2} className="p-8">
                            <Grid item xs={12} md={5} style={{ minWidth: `${minItemWidth}rem` }}>
                                {
                                    contents1 && contents1.map((content, index) => Contents(content, index, "left"))
                                }
                            </Grid>
                            <Grid item xs={12} md={6} style={{ minWidth: `${minItemWidth + 10}rem` }}>
                                <Grid container >
                                    <Grid item xs={8}>
                                        <TextField 
                                            variant="outlined"
                                            label="Total Wage"
                                            className="w-full mb-16 mr-4"
                                            size="small"
                                            value={isEmpty(state[`total_wage`])}	
                                            name={`total_wage`}	
                                            onChange={handleChange}
                                            inputProps={{
                                                style: {
                                                    textAlign: "right"
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className="pl-4">
                                        <FormControl variant="outlined" className={clsx(classes.formControl, "w-full mr-5 mb-16")} size="small">
                                            <InputLabel id={`select-label-total-wage`}></InputLabel>
                                            <Select
                                                labelId={`select-label-total-wage`}
                                                value={isEmpty(state[`CT_WAGE_CURR`])}
                                                onChange={handleChange}
                                                label=""
                                                name={`CT_WAGE_CURR`}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    prm_currencies.list && prm_currencies.list.map((currency, key) => <MenuItem value={currency.id} key={key}>{currency.PC_CURR}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8} className="mb-32">
                                    {
                                        contents2 && contents2.map((content, index) => Contents(content, index, "right"))
                                    }
                                    </Grid>
                                    <Grid item xs={8}> 
                                        <TextField 
                                            variant="outlined"
                                            label="Contract Expiry"
                                            className="w-full mb-16 mr-5"
                                            size="small"
                                            value={isEmpty(state[`CT_COE`])}	
                                            name={`CT_COE`}	
                                            onChange={handleChange}
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={8}> 
                                        <TextField 
                                            variant="outlined"
                                            label="Ext.Contract"
                                            className="w-full mb-16 mr-5"
                                            size="small"
                                            value={isEmpty(state[`CT_EXT_COE`])}	
                                            name={`CT_EXT_COE`}	
                                            onChange={handleChange}
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            {/* <Grid item xs={12} md={6} style={{ minWidth: `${minItemWidth}rem` }}>
                                <Table >
                                    <TableHead>
                                        <TableRow >
                                            <TableCell className="p-6 border border-gray-300" colSpan={2} align="center" >Wage</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell className="p-6 border border-gray-300" align="left" width={150} >Type</TableCell>
                                            <TableCell className="p-6 border border-gray-300" align="right" width={150} >Amount</TableCell>
                                        </TableRow>                                        
                                    </TableHead>
                                    <TableBody>
                                        {
                                            table_data && table_data.map((data, key) => 
                                                <TableRow key={key}>
                                                    <TableCell className="p-6 border border-gray-300" align="left" >{data.type}</TableCell>
                                                    <TableCell className="p-6 border border-gray-300" align="right" >{data.amount}</TableCell>
                                                </TableRow>)
                                        }

                                        <TableRow >
                                            <TableCell className="p-6 border border-gray-300" align="left" ></TableCell>
                                            <TableCell className="p-6 border border-gray-300" align="right">{state.total_wage}</TableCell>
                                        </TableRow>   
                                    </TableBody>
                                </Table>
                            </Grid> */}
                        </Grid> 
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleSave()} variant="contained" className="text-white bg-green-400 hover:bg-green-500">
                            Save
                        </Button>
                        <Button onClick={()=> handleClose()} variant="contained" className="text-white bg-red-400 hover:bg-red-500">
                            Cancel
                        </Button>
                    </DialogActions>
                </>
            }
        </Dialog>)


};
export default CPrevServDialog;