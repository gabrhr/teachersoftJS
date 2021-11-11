import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';

/* Uso de Formularios.
 *
 * - El objeto a modificar es `values`,  inicializado.
 * - Se puede pasar una funcion de validacion para validacion en tiempo real.
 *   (Los errores se guardan en `errors`).  Su valor se muestra en el
 *   componente que se esta modificando en el momento.
 *   - La funcion validate, crea y guarda los errores en `errors`
 */
export function useForm(initialFieldValues, validateOnChange=false, validate) {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        /* retrieve values from React's "synthetic event" (wrapper for 
            HTML DOM Event Object) */
        const { name, value } = e.target
        /* NuevaSolicitudForm passes numeric id as prop.name */
        if (typeof name === 'number') name = name.toString()
        setValues({
            /* use current value of other properties */
            ...values,
            /* only change the name property */
            [name]: value
        })
        if (validateOnChange) {
            /* only validate current input field */
            validate({[name]: value})
        }
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root' : {
            width: '100%',
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

