import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import esLocale from 'date-fns/locale/es';
 
 

export default function SimpleDatePicker(props) {

    const {name, label, value, onChange, year, ...other } = props;

    const convertToDefaultEventParameter = (name, value) => ({
        target: {
            name, value
        }
    })
    let minimumDate = year.toString() + "-01-3";
    let maximumDate = year.toString() + "-12-18";
    //Se tiene que cambiar a español (los meses)
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale} >
            <DatePicker 
                name={name}
                label={label}
                inputFormat="dd/MM/yyyy"
                value={value}
                minDate={new Date(minimumDate)}
                maxDate={new Date(maximumDate)}
                onChange={date => onChange(convertToDefaultEventParameter(name, date))}
                renderInput={(params) => <TextField {...params} helperText={null}/>}
                {...other}
 
            />
        </LocalizationProvider>
    );
  }