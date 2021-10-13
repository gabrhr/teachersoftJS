import React from 'react'
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles( theme => ({
    root: {
        minWidth: 0,
        margin: 0.5,
    },
    secondary: {
        backgroundColor: "secondary.light",
        '& .MuiButton-label': {
            color: "secondary.main"
        }
    },
    primary: {
        backgroundColor: "primary.light",
        '& .MuiButton-label': {
            color: "secondary.main"
        }
    }
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles()


    return (
        <Button
            // "string interpolation"
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}
