import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button, Dialog, DialogContent, DialogActions, Toolbar, Typography, AppBar, Checkbox, Table, TableBody, TableRow, TableCell, TableHead, TableFooter } from "@material-ui/core";
import clsx from "clsx";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "app/store/fuse/dialogSlice";
import { updateAllottee, addAllottee } from "../store";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 300
    }
}));



const AllotteeDialog = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const { dialog } = useSelector(state => state.fuse);
    const allottees = useSelector(state=>state.crewApp.crew_details.allottees.recent);
    const {relations} = useSelector(state => state.crewApp.crew_details);
    const [state, setState] = React.useState({});

    React.useEffect(() => {
        if( dialog.options.type == "Edit" ) {
            if(allottees) {
                setState({
                    ...allottees,
                    CA_RELATION_CODE: allottees.relation ? allottees.relation.id : ""	
                });
            }
        } else {
            setState({})
        }
    }, [dialog, allottees]);    

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
            dispatch(addAllottee(state));
        } 
        if(dialog.options.type == "Edit") {
            dispatch(updateAllottee(state));
        }
        handleClose();
	};
    const handleClose = () => {
        dispatch(closeDialog())
    }

    const contents1 = [
        {
            type: "text",
            label: "Name",
            name: "CA_FULLNAME"
        },
        {
            type: "text",
            label: "Phone",
            name: "CA_PHONE"
        },
        {
            type: "text",
            label: "Mobile",
            name: "CA_MOBILE"
        },
        {
            type: "text",
            label: "Email",
            name: "CA_EMAIL"
        },
    ];
    const contents2 = [
        {
            type: "select",
            label: "Relation",
            children: relations.list.map(relation => ({
                label: relation.PR_DESCR,
                key: relation.id
            })),
            name: "CA_RELATION_CODE"
        },
        {
            type: "textarea",
            label: "Home Address",
            name: "CA_HOME_ADDRESS"
        }
    ];
    const contents3 = [
        {
            type: "text",
            label: "Bank",
            name: "CA_BANK"
        },
        {
            type: "text",
            label: "Bank Account",
            name: "CA_BANK_ACCOUNT"
        },        
    ];
    const amount = {
        type: "text",
        label: "Amount",
        name: "CA_AMOUNT"
    };

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
                                {dialog.options.type} Allottees Details
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <Grid container spacing={2} className="p-8" >
                            <Grid item xs={12} md={6} >
                                {
                                    contents1 && contents1.map((content, index) => Contents(content, index, "left"))
                                }
                            </Grid>
                            <Grid item xs={12} md={6} >
                                {
                                    contents2 && contents2.map((content, index) => Contents(content, index, "right"))
                                }
                            </Grid>
                            <Grid item xs={12} >
                                {
                                    contents3 && contents3.map((content, index) => Contents(content, index, "3"))
                                }
                            </Grid>
                            <Grid item xs={6}>
                                {Contents(amount, 0, "amount")}
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
export default AllotteeDialog;