import React from 'react'
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles'

/* Does not work :( */
const StyledButton = styled(IconButton)(({ theme }) => ({
        minWidth: 0,
        margin: theme.spacing(0.5),
        backgroundColor: "secondary.light",
        '& .MuiButton-label': {
            color: "secondary.main"
        }
}))

export default function ActionButton(props) {

    const { color, children, onClick, ...other } = props;

    return (
        <IconButton
            onClick={onClick}
            color={color}
            {...other}
        >
            {children}
        </IconButton>
    )
}
