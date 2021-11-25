import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import { FormHelperText } from '@mui/material';
import React from 'react'

export default function Checkbox(props) {

    const { name, label, value, onChange, error } = props;

    /* Event Parameters of Radio Button "onChange event" are different from
     * the usual (name:string, value:string).  They need to be converted */
    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl
            {...(error && {error: true})}
        >
            <FormControlLabel
                control = {
                    <MuiCheckbox
                        name={name}
                        color="primary"
                        checked={value}
                        onChange={e => onChange(convertToDefaultEventParameter(name, e.target.checked))}
                        />
                }
                label = {label}
                // sx={{width: '40%'}}
                >
            </FormControlLabel>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
