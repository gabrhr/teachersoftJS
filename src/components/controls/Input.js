/* Reusable Input component 
 * (It's better not to give a generic name. */

import React from 'react'
import { TextField } from '@mui/material'

export default function Input(props) {
    const {name, label, value, error=null, onChange, ...other} = props
    return (
        <TextField
            variant="outlined"  // The other one is "filled"
            label={label}
            name={name}
            value={value} 
            onChange = {onChange}
            {...(error && {error: true, helperText: error})}
            {...other}
        />
    )
}
