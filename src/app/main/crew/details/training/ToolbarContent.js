import React, {} from "react";
import { Icon, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
    const { handleEdit } = props;
    return <React.Fragment>
        <div className={clsx(classes.root, "w-full flex")}>
            <Button variant="contained" color="secondary">
                <Icon>add</Icon> New
            </Button>
            <Button variant="contained" color="secondary" onClick={event => handleEdit(event)}>
                <Icon>edit</Icon> Edit
            </Button>
            <Button variant="contained" color="secondary">
                <Icon>delete</Icon>
            </Button>
        </div>
    </React.Fragment>
};

export default ToolbarContent;