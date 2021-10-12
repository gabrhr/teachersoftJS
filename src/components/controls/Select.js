import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import React from 'react'

export default function Select(props) {

    const {name, label, value, error=null, onChange, options, variant, ...other} = props;
    return (
        <FormControl
            variant={variant || "outlined"}
            {...(error && {error: true})}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                defaultValue=""
                {...other}
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (
                            <MenuItem key={item.id} value={item.id} >
                                {item.title}
                            </MenuItem>
                        )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
