import React from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup } from '@mui/material'

export default function RadioGroup(props) {
    const { name, label, value, onChange, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value} 
                onChange={onChange}
                >
                {
                    items.map(
                        /* callback function with 2 parameters */
                        (item, index) => (
                            <FormControlLabel 
                                label={item.title}
                                key={item.id}
                                value={item.id}
                                control={<Radio />}
                                />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
