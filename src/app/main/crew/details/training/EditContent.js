import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { TextField, Select, InputLabel, MenuItem, FormControl, TableContainer, Paper } from "@material-ui/core";
import clsx from "clsx";
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 300
    }
}));

function isEmpty(value) {
    return value ? value : "";
}
const minItemWidth = 30;

const EditContent = (props) => {
    const classes = useStyles(props);
    const [ state, setState ] = React.useState({});

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
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
                    value={isEmpty(state[`${contentId}_text_${index}`])}	
                    name={`${contentId}_text_${index}`}	
                    onChange={handleChange}
                />)
            case 'select' : return (
                <FormControl variant="outlined" className={clsx(classes.formControl, "w-full mr-5 mb-16")} size="small" key={index}>
                    <InputLabel id={`select-label-${index}`}>{content.label}</InputLabel>
                    <Select
                        labelId={`select-label-${index}`}
                        value={isEmpty(state[`${contentId}_select_${index}`])}
                        onChange={handleChange}
                        label={content.label}
                        name={`${contentId}_select_${index}`}
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
                    value={isEmpty(state[`${contentId}_date_${index}`])}	
                    name={`${contentId}_date_${index}`}	
                    onChange={handleChange}
                    type="date"
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
                    value={isEmpty(state[`${contentId}_date_${index}`])}	
                    name={`${contentId}_date_${index}`}	
                    onChange={handleChange}
                    multiline
                    rows={3}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />)
        };
    };


    return <React.Fragment>
        <Grid container spacing={2} className="p-8" >
            <Grid item xs={12} style={{ width: `${minItemWidth}rem` }}>
                {
                    Contents({
                        type: "select",
                        label: "Course",
                        children: [
                            "Item 1",
                            "item 2"
                        ]
                    }, 0, "course")
                }
            </Grid>
            <Grid item xs={12} md={5}>
                {
                    Contents({
                        type: "date",
                        label: "Date",
                    }, 0, "date")
                }
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12} md={4}>
                {
                    Contents({
                        type: "text",
                        label: "Total Score",
                    }, 0, "total_score")
                }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={12} md={4}>
                {
                    Contents({
                        type: "text",
                        label: "Total Completed",
                    }, 0, "total_completed")
                }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {
                    Contents({
                        type: "textarea",
                        label: "Notes",
                    }, 0, "notes")
                }
            </Grid>
        </Grid>        
    </React.Fragment>
};
export default EditContent;