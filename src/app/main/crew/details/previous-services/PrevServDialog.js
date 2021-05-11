import React, {} from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Dialog, DialogContent, DialogActions, Toolbar, Typography, AppBar, Checkbox } from "@material-ui/core";
import clsx from "clsx";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "app/store/fuse/dialogSlice";
import { setPrevServ, updatePrevServ, addPrevServ } from "../store";


const PrevServDialog = (props) => {
    const { dialog } = useSelector(state => state.fuse);
    const [state, setState] = React.useState({});
    const dispatch = useDispatch();
    const prev_services = useSelector(state => state.crewApp.crew_details.prev_services.recent);
    const {vessel_types, eng_types, nationalities, soff_reasons} = useSelector(state => state.crewApp.crew_details);
    const { rank } = useSelector(state => state.rankApp);


    React.useEffect(() => {
        if( dialog.options.type == "Edit" ) {
            if(prev_services) {
                setState({
                    ...prev_services,
                    CPR_VESSEL_TYPE_CODE: prev_services.vessel_type ? prev_services.vessel_type.id : "",
                    CPR_ENG_TYPE_CODE: prev_services.eng_type ? prev_services.eng_type.id : "",
                    CPR_VESSEL_FLAG_CODE: prev_services.nationality ? prev_services.nationality.id : "",
                    CPR_RANK_CODE: prev_services.rank ? prev_services.rank.id : "",
                    CPR_SOFF_REASON_CODE: prev_services.soff_reason ? prev_services.soff_reason.id : ""
                });
            }
        } else {
            setState({})
        }
    }, [dialog, prev_services]);    

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
            dispatch(addPrevServ(state));
        } else if(dialog.options.type == "Edit") {
            dispatch(updatePrevServ(state));
        }
        handleClose();
	};

    const handleClose = () => {
        dispatch(closeDialog())
    }

    const contentsLeft = [
        {
            type: "text",
            label: "Vessel",
            name: "CPR_VESSEL_NAME"		
        },
        {
            type: "select",
            label: "Vessel Type",
            children: vessel_types.list.map(type => ({
                label: type.VT_DESCR,
                key: type.id
            })),
            name: "CPR_VESSEL_TYPE_CODE"
        },
        {
            type: "select",
            label: "Engine Type",
            children: eng_types.list.map(type => ({
                label: type.ET_DESCR,
                key: type.id
            })),
            name: "CPR_ENG_TYPE_CODE"
        },		
        {
            type: "select",
            label: "Vessel Flag",
            children: nationalities.list.map(type => ({
                label: type.PN_DESCR,
                key: type.id
            })),
            name: "CPR_VESSEL_FLAG_CODE"
        },
        {
            type: "text",
            label: "Vessel NRT",
            name: "CPR_NRT"			
        },
        {
            type: "text",
            label: "Vessel GRT",		
            name: "CPR_GRT"	
        },
        {
            type: "text",
            label: "Vessel DWT",		
            name: "CPR_DWT"	
        },
    ];
    
    const contentsRight = [
        {
            type: "text",
            label: "Manager",		
            name: "CPR_MANAGER_NAME"	
        },
        {
            type: "text",
            label: "Agency",	
            name: "CPR_MANNING_AGENCY"		
        },
        {
            type: "select",
            label: "Rank",
            children: rank.list.map(rank => ({
                label: rank.PR_DESCR,
                key: rank.id
            })),
            name: "CPR_RANK_CODE"
        },
        {
            type: "date",
            label: "Departure Date",
            name: "CPR_START_DATE"
        },		
        {
            type: "date",
            label: "S/On Date",
            name: "CPR_SON_DATE"
        },
        {
            type: "text",
            label: "S/On Place",
            name: "CPR_SON_PORT"
        },
        {
            type: "date",
            label: "S/Off Date",
            name: "CPR_SOFF_DATE"
        },
        {
            type: "date",
            label: "Repartiation Date",
            name: "CPR_END_DATE"
        },
        {
            type: "text",
            label: "S/Off Place",	
            name: "CPR_SOFF_PORT"		
        },
        {
            type: "select",
            label: "S/Off Reason",			
            children: soff_reasons.list.map(type => ({
                label: type.SR_DESCR,
                key: type.id
            })),
            name: "CPR_SOFF_REASON_CODE"
        },
    ];

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
                                {dialog.options.type} Previous Services
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Grid container spacing={1}  style={{ minWidth: '50rem' }}>
                            <Grid item xs={6}>
                                {
                                    contentsLeft && contentsLeft.map((content, index) => Contents(content, index, "left"))
                                }						
                            </Grid>
                            <Grid item xs={6}>
                                {
                                    contentsRight && contentsRight.map((content, index) => Contents(content, index, "rigth"))
                                }						
                            </Grid>
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

export default PrevServDialog;