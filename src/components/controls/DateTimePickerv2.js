import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { TextField } from '@mui/material';
import esLocale from 'date-fns/locale/es';

export default function DateTimePickerv2(props) {
    const {name, label, value, onChange, error, ...other } = props;

    /* same as in ./Checkbox */
    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <DateTimePicker
                name={name}
                //inputFormat="dd/MM/yyyy "
                minDate = {new Date()}
                label={label}
                value={value}
                error={error}
                openTo="year"
                views={['year', 'month', 'day', 'hours','minutes']}
                onChange={date => onChange(convertToDefaultEventParameter(name, date))}
                renderInput={(params) => <TextField {...params} helperText={null}/>}
                {...other}
            />
        </LocalizationProvider>
    );
}
