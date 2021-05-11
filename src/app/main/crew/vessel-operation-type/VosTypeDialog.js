import React,{} from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Dialog, DialogContent, DialogActions, Toolbar, Typography, AppBar, Checkbox } from "@material-ui/core";
import clsx from "clsx";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "app/store/fuse/dialogSlice";
import { updateVostypes, setVostype, addVostypes } from "../store/vostypeSlice";
import { getFormDataFromObject } from "app/functions";
import ColorPicker from "material-ui-color-picker";


const CertDialog = (props) => {
    const { dialog } = useSelector(state => state.fuse);
    const {vostype} = useSelector(state => state.crewApp);    
    const dispatch = useDispatch();
    const [state, setState] = React.useState({});
    const [color, setColor] = React.useState("");

    const contentsLeft = [
        {
            type: "text",
            label: "Description",		
            name: "VOST_DESCR"
        },
        {
            type: "color",
            label: "Color",			
            name: "VOST_COLOR"
        },
        {
            type: "textarea",
            label: "Notes",			
            name: "VOST_NOTES"
        },
        {
            type: "text",
            label: "AA",			
            name: "VOST_AA"
        },
    ];

    React.useEffect(() => {
        if( dialog.options.type == "Edit" ) {
            setState(vostype.recent);
        } 
        else if ( dialog.options.type == "New" ) {
            setState({

            })
        }
    }, [dialog, vostype]);

    React.useEffect(() => {
        console.log(color);
    }, [color])

    const handleChange = (e) => {    
        console.log(state);    
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
            case 'color':
                    if(e.target.value) {
                        setState({
                            ...state,
                            [e.target.name]: e.target.value
                        });
                    }; break;
            default: 
                    setState({
                        ...state,
                        [e.target.name]: e.target.value
                    });
        }     
    };

    const handleSave = () => {
        if(dialog.options.type == "Edit") {
            console.log(state);
            dispatch(updateVostypes(state));
        } else if (dialog.options.type == "New") {
            dispatch(addVostypes(state));
        }
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
                />            
            )
            case 'color': return (
                <ColorPicker
                    name={`${content.name}`}
                    variant="outlined"
                    className="w-full mb-16 mr-5"
                    size="small"
                    key={index}	
                    onChange={color => handleChange({
                        target:{
                            type: "color",
                            value: color,
                            name: content.name
                        }
                    })}
                    style={{
                        backgroundColor: `${state[`${content.name}`]}`
                    }}
                    defaultValue=""
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
                                {dialog.options.type} Vessel Operation Type
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Grid container spacing={1}  style={{ minWidth: '50rem', minHeight: '500px' }}>
                            <Grid item xs={12}>
                                {
                                    contentsLeft && contentsLeft.map((content, index) => Contents(content, index, "left"))
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
}

export default CertDialog;