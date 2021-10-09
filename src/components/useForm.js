import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';

export function useForm(initialFieldValues) {
    const [values, setValues] = useState(initialFieldValues);

    const handleInputChange = e => {
        /* retrieve values from event */
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
        handleInputChange
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {
    const classes = useStyles();

    return (
        <form className={classes.root} autoComplete="off">
            {props.children}
        </form>
    )
}

