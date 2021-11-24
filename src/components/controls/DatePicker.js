import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DateTimePicker as MuiDatePicker, LocalizationProvider } from '@mui/lab'
import { TextField } from '@mui/material';
import esLocale from 'date-fns/locale/es';

export default function DatePicker(props) {

    const {name, label, value, onChange, ...other } = props;

    /* same as in ./Checkbox */
    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <MuiDatePicker
                name={name}
                label={label}
                value={value}
                onChange={date => onChange(convertToDefaultEventParameter(name, date))}
                renderInput={(params) => <TextField {...params} helperText={null}/>}
                {...other}
            />
        </LocalizationProvider>
    );
}
