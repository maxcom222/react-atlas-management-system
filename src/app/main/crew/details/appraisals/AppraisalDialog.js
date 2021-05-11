import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Paper, TableContainer, FormControl, InputLabel, Select, MenuItem, Grid, Button, Dialog, DialogContent, DialogActions, Toolbar, Typography, AppBar, Checkbox, Table, TableBody, TableRow, TableCell, TableHead, TableFooter } from "@material-ui/core";
import clsx from "clsx";
import { DataGrid } from "@material-ui/data-grid";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "app/store/fuse/dialogSlice";
import { updateAppraisals, addAppraisals } from "../store";
import { getFormDataFromObject } from "app/functions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 300
    }
}));



const AppraisalDialog = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const { dialog } = useSelector(state => state.fuse);
    const appraisals = useSelector(state=>state.crewApp.crew_details.appraisals.recent);
    const {vessels, employ_status} = useSelector(state => state.crewApp.crew_details);
    const [state, setState] = React.useState({});
    const form = React.useRef(null);

    React.useEffect(() => {
        if( dialog.options.type == "Edit" ) {
            if(appraisals) {
                setState({
                    ...appraisals,
                    CA_VESSEL_CODE: appraisals.vessel ? appraisals.vessel.id : "",
                    CA_EMPLOY_STATUS: appraisals.employ_status ? appraisals.employ_status.id : "",		
                });
            }
        } else {
            setState({})
        }
    }, [dialog, appraisals]);    

    const handleChange = (e) => {        
        const type = e.target.type;
        switch(type) {
            case 'checkbox': 
                    setState({
                        ...state,
                        [e.target.name]: e.target.checked ? 1 : 0
                    }); break;
            case 'file':
                    setState({
                        ...state,
                        [e.target.name]: e.target.files[0]
                    }); break;
            default: 
                    setState({
                        ...state,
                        [e.target.name]: e.target.value
                    });
        }        
    };
    const handleSave = () => {
        if(form.current.reportValidity()) {
            const formData = getFormDataFromObject(state)
            if(dialog.options.type == "New") {
                dispatch(addAppraisals(formData));
            } 
            if(dialog.options.type == "Edit") {
                dispatch(updateAppraisals({
                    id: state.id,
                    data: formData
                }));
            }
            handleClose();
        }
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
            name: "CA_VESSEL_CODE",
            required: true
        },
        {
            type: "select",
            label: "Type",
            children: [
                { label: "Appraisal", key: "1" },
                { label: "Discharge", key: "2" },                
            ],
            name: "CA_TYPE",
            required: true
        },
        {
            type: "text",
            label: "Assessor Name",
            name: "CA_ASSESSOR_NAME"
        },
        {
            type: "date",
            label: "Assessment Date",
            name: "CA_ASSESSMENT_DATE",
            required: true
        },
        {
            type: "select",
            label: "Employment Status",
            children: employ_status.list.map(emp_s => ({
                label: emp_s.ES_DESCR,
                key: emp_s.id
            })),
            name: "CA_EMPLOY_STATUS",
            required: true
        },
        {
            type: "text",
            label: "Bad Habits",
            name: "CA_BAD_HABITS"
        },
        {
            type: "text",
            label: "To be Promoted",
            name: "CA_TO_BE_PROMOTED"
        },
        {
            type: "text",
            label: "Reason for dismissal",
            name: "CA_DISMISSAL_REASON"
        },
        {
            type: "textarea",
            label: "Notes",
            name: "CA_NOTES"
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
                    required={content.required}             
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
                        required={content.required}
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
                    required={content.required}
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
                    required={content.required}
                />
            )
            case 'textarea' : return (
                <TextField 
                    variant="outlined"
                    label={content.label}
                    className="w-full mb-16 mr-5"
                    size="small"
                    key={index}	
                    value={isEmpty(state[`${content.name}`])}	
                    name={`${content.name}`}
                    onChange={handleChange}
                    type="text"
                    rows={3}
                    multiline
                    required={content.required}
                />
            )
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
                                {dialog.options.type} Appraisals
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <form ref={form}>
                        <Grid container spacing={2} className="p-8" >
                            <Grid item xs={12} md={12} >
                                {
                                    contents1 && contents1.map((content, index) => Contents(content, index, "left"))
                                }
                                <TextField 
                                    variant="outlined"
                                    label="File Upload"
                                    className="w-full mb-16 mr-5"
                                    size="small"
                                    type="file"
                                    onChange={handleChange}
                                    name="CA_FILENAME"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            
                            {/* <Grid item xs={12} md={7}>
                                <Grid container className="w-full h-320 mb-16">
                                    <Grid item xs={12} className="w-full h-full">
                                        <TableContainer component={Paper} className="w-full h-full">
                                            <DataGrid 
                                                rows={[
                                                    {
                                                        id: 0,
                                                        category: "test",
                                                        score: "test"
                                                    }
                                                ]}
                                                columns={[
                                                    {
                                                        field: "category",
                                                        headerName: "Category",
                                                        width: 200

                                                    },
                                                    {
                                                        field: "score",
                                                        headerName: "Score",
                                                        width: 130
                                                    }
                                                ]}		
                                                rowHeight={25}	
                                                hideFooter={true}
                                                
                                            />
                                        </TableContainer>  
                                    </Grid>
                                </Grid>
                                <Grid container className="flex justify-end">
                                    <Grid item xs={4}>
                                        <TextField 
                                            label="OVERALL RATING"
                                            variant="outlined"      
                                            size="small"                      
                                        />
                                    </Grid> 
                                </Grid>
                            </Grid> */}
                        </Grid> 
                        </form>
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
export default AppraisalDialog;