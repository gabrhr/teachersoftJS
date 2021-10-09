import React from "react";
import IconButton from '@mui/material/IconButton';

const DTIconButton = (props) => {

    return (
        <IconButton {...props} disableRipple={true}>{props.children}</IconButton>
    );
};


export default DTIconButton;
