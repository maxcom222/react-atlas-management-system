import React, {} from "react";
import { 
    TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Checkbox, AppBar, Toolbar, DialogContent, DialogActions, 
    Button, Dialog
} from "@material-ui/core";
import clsx from "clsx";
import { isEmpty } from "app/functions";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "./store/dialogSlice";
import { addRank, updateRank } from "./store/rankSlice";

import reducer from "./store";
import withReducer from "app/store/withReducer";

const contentsLeft = [
    {
        type: "text",
        label: "Description",
        name: "PR_DESCR",
        required: true
    },
    {
        type: "text",
        label: "Abrv",	
        name: "PR_ABRV"		
    },
    {
        type: "text",
        label: "Order",	
        name: "PR_AA"		
    },
];
const RankDialog = (props) => {
    const { dialog, rank } = useSelector(state => state.rankApp);   
    const form = React.useRef(null);

    const dispatch = useDispatch();
    const [state, setState] = React.useState({
    });

    React.useEffect(() => {
        if( dialog.type == "Edit" ) {
            setState(rank.recent);
        } 

        if( dialog.type == "New" ) {
            setState({});
        }
    }, [rank.recent, dialog]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
		if(form.current.reportValidity()) {
            if(dialog.type == "New")
                dispatch(addRank(state));
            else if (dialog.type == "Edit")
                dispatch(updateRank(state));
            handleClose();
        }
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
                    required={content.required}
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
                    <form ref={form}>
                    <AppBar position="static" elevation={1}>
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                {dialog.type} Crew Rank
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
                                        Active
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
                    </form>
                </>
            }
        </Dialog>)
};


export default RankDialog;