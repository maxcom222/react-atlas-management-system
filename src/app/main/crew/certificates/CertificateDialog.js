import React, {} from "react";
import { 
    TextField, FormControl, InputLabel, Select, MenuItem, Grid, Checkbox, Typography,
    DialogActions, Button, DialogContent, Dialog, AppBar, Toolbar
} from "@material-ui/core";
import clsx from "clsx";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "./store/dialogSlice";
import { addCertificate, updateCertificate } from "./store/certificateSlice";

const contentsLeft = [
    {
        type: "text",
        label: "Description",
        name: "PC_DESCR"
    },
    {
        type: "text",
        label: "Abrv",	
        name: "PC_ABRV"		
    },
    {
        type: "text",
        label: "Order",	
        name: "PC_ORDER"		
    },
    {
        type: "select",
        label: "Category",			
        children: [
            "Item 1",
            "Item 2"
        ],
        name: "category"
    },
];
const CertificateDialog = (props) => {
    const { dialog, certificate } = useSelector(state => state.certificateApp);

    const dispatch = useDispatch();
    const [state, setState] = React.useState({
    });

    React.useEffect(() => {
        if( dialog.type == "Edit" ) {
            setState(certificate.recent);
        } 

        if( dialog.type == "New" ) {
            setState({});
        }
    }, [certificate.recent, dialog]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
		if(dialog.type == "New")
            dispatch(addCertificate({
                certificate: state,
                category: certificate.category.recent
            }));
        else if (dialog.type == "Edit")
            dispatch(updateCertificate({
                certificate: state,
                category: certificate.category.recent
            }));
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
                            content.children.map((item, i) => <MenuItem value={i+1} key={i}>{item}</MenuItem>)
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
        };
    };


    return (
        <Dialog
            open={dialog.open}
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
                                {dialog.type} Crew Certificate
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                {
                                    contentsLeft && contentsLeft.map((content, index) => Contents(content, index, "left"))
                                }		
                                <div className="flex w-full items-center">
                                    <Checkbox size="small" color="secondary" />
                                    <Typography variant="subtitle2">
                                        Optional Certificate (KPI - Crew with certificates more than STCW)
                                    </Typography>
                                </div>
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

export default CertificateDialog;