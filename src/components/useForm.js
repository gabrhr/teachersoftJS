import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';

export function useForm(initialFieldValues) {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        /* retrieve values from "Default" event */
        const { name, value } = e.target
        setValues({
            /* use current value of other properties */
            ...values,
            /* only change the name property */
            [name]: value
        })
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root, & .MuiButton-root' : {
            width: '100%',      // left to right
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }
}))

export function Form(props) {
    const classes = useStyles();
    const {children, ...other} = props;

    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

