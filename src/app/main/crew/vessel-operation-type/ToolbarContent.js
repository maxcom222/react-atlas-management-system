import React, {} from "react";
import { Icon, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, closeDialog } from "app/store/fuse/dialogSlice";
import { deleteVostypes, setVostype } from "../store/vostypeSlice";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: 3,
        minWidth: 570,
        '& Button': {
            color: '#FFF',
            marginRight: 3,
        }
    },
    addButton: {
        zIndex: 99
    }
}));

const ToolbarContent = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { vostype } = useSelector(state => state.crewApp);
 
     const handleNew = (event) => {
         dispatch(openDialog({type: "New"}));
     }
 
     const handleEdit = (event) => {
         if(vostype.recent) {
             dispatch(openDialog({type: "Edit"}));
         }
     }
     const handleDelete = (event) => {
         if(vostype.recent) {
             if(window.confirm("Are you sure to delete this item?")){
                 dispatch(deleteVostypes(vostype.recent));
                 dispatch(setVostype(null));
             }   
         }    
     }

    return <React.Fragment>
        <div className={clsx(classes.root, "w-full flex")}>
            <Button variant="contained" color="secondary" onClick={event => handleNew(event)}>
                <Icon>add</Icon> New
            </Button>
            <Button variant="contained" color="secondary" onClick={event => handleEdit(event)}>
                <Icon>edit</Icon> Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={event => handleDelete(event)}>
                <Icon>delete</Icon>
            </Button>
        </div>
    </React.Fragment>
};

export default ToolbarContent;