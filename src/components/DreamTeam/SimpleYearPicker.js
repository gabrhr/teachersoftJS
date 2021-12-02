import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import esLocale from 'date-fns/locale/es';
 
 

export default function SimpleYearPicker(props) {

    const {name, label, value, onChange, error, ...other } = props;

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })

    //Se tiene que cambiar a español (los meses)
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale} >
            <DatePicker 
                name={name}
                views={['year']}
                label={label}
                value={new Date(value)}
                onChange={date => onChange(convertToDefaultEventParameter(name, date))}
                renderInput={(params) => <TextField {...params} helperText={null}/>}
                {...other}
 
            />
        </LocalizationProvider>
    );
  }