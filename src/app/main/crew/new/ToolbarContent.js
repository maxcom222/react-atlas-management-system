import React, {} from "react";
import { Fab, Icon, IconButton, Button, TableContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { addCrew } from "./../store/crewSlice";
import { getFormDataFromObject } from "app/functions";

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
    const { state, setState, form } = props;
    const dispatch = useDispatch();

    const handleSave = (event) => {
        if(state && form.current.reportValidity()) {
            const formData = getFormDataFromObject(state);

            dispatch(addCrew(
                formData
            ));
            setState({});
        }
    }

    return <React.Fragment>
        <div className={clsx(classes.root, "w-full flex")}>
            <Button variant="contained" color="secondary" onClick={event => handleSave(event)}>
                <Icon>save</Icon> Save
            </Button>
        </div>
    </React.Fragment>
};

export default ToolbarContent;