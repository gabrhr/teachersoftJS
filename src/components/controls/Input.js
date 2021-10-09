/* Reusable Input component 
 * (It's better not to give a generic name. */

import React from 'react'
import { TextField } from '@mui/material'

export default function Input(props) {
    const {name, label, value, onChange} = props
    return (
        <TextField
            variant="outlined" 
            label={label}
            name={name}
            value={value} 
            onChange = {onChange}
        />
    )
}
