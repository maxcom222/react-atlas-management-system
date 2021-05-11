import React, {} from "react";
import { Fab, Icon, IconButton, Button, TableContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "./store/dialogSlice";
import { deleteCertificate, setCertificate } from "./store/certificateSlice";

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
   const { certificate } = useSelector(state => state.certificateApp);

    const handleNew = (event) => {
		if(certificate.category.recent) {
            dispatch(openDialog({type: "New"}));
        } else {
            alert("Please choose a category");
        }
	}

    const handleEdit = (event) => {
		if(certificate.recent) {
            dispatch(openDialog({type: "Edit"}));
        }
    }
    const handleDelete = (event) => {
        if(certificate.recent) {
            if(window.confirm("Are you sure to delete this item?")){
                dispatch(deleteCertificate({
                    certificate: certificate.recent,
                    category: certificate.category.recent
                }));
                dispatch(setCertificate(null));
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