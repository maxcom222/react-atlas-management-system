import React,{} from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Dialog, DialogContent, DialogActions, Toolbar, Typography, AppBar, Checkbox } from "@material-ui/core";
import clsx from "clsx";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "app/store/fuse/dialogSlice";
import { updateCertificate, setCertificate } from "../store";
import { getFormDataFromObject } from "app/functions";


const CertDialog = (props) => {
    const { dialog } = useSelector(state => state.fuse);
    const {certificates, countries} = useSelector(state => state.crewApp.crew_details);

    const dispatch = useDispatch();
    const [state, setState] = React.useState({});

    const contentsLeft = [
        {
            type: "text",
            label: "Certification",		
            name: "certification",
            editDisabled: true
        },
        {
            type: "file",    
            label: "File upload",
            name: "CC_FILENAME"
        },
        {
            type: "text",
            label: "Number",			
            name: "CC_NUMBER"
        },
        {
            type: "date",
            label: "Issued",	
            name: "CC_ISSUED"		
        },
        {
            type: "date",
            label: "Expired",		
            name: "CC_EXPIRED"	
        },
        {
            type: "select",
            label: "Issue Country",
            children: countries.map(c => ({
                label: c.PC_DESCR,
                key: c.id
            })),
            name: "CC_ISSUE_CNTR_CODE"
        },	
    ];

    React.useEffect(() => {
        if( dialog.options.type == "Edit" ) {
            setState(certificates.recent);
        } 
    }, [dialog, certificates]);

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
        const formData = getFormDataFromObject(state);
        dispatch(updateCertificate({
            id: state.id,
            data: formData
        }));
        dispatch(setCertificate(null))
        handleClose();
	};

    const handleClose = () => {
        dispatch(closeDialog())
    }

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
                    // value={isEmpty(state[`${content.name}`])}	
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
                                {dialog.options.type} Certificate
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Grid container spacing={1}  style={{ minWidth: '50rem' }}>
                            <Grid item xs={12}>
                                {
                                    contentsLeft && contentsLeft.map((content, index) => Contents(content, index, "left"))
                                }	
                                <Checkbox 
                                    checked={isEmpty(state['CC_ONVSL']) == 1}
                                    onChange={handleChange}
                                    name="CC_ONVSL"
                                />
                                On VSL	
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
}

export default CertDialog;