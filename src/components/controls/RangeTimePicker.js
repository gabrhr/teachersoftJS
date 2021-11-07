import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { es } from "date-fns/locale";

export default function RangeTimePicker() {
  const [value, setValue] = React.useState([null, null]);
  const styleField = {
    size:"small",
    width:"90px",
    "& .MuiFormLabel-root": {
      color: "#848499",
    },
    "& .MuiFormLabel-root.Mui-focused":{
      color: "hsl(0, 0%, 0%, 0)",
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'secondary.main', // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#fff"
    },
    "& label.Mui-focused": {
      color: "#fff"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff"
  }}
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
      <DateRangePicker
        startText="Fecha inicio"
        endText="Fecha fin"
        okText={"Okk"}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={( startProps, endProps) => (
          <React.Fragment>
            <Box sx={{ mx: 2, mt:2}}> <CalendarTodayOutlinedIcon/> </Box>
            <TextField variant="standard" { ...startProps}  sx={styleField}/>
            <Box sx={{ ml: .1, mr:1, color:"#000", mb:"10px"}}> hasta </Box>
            <TextField variant="standard" {...endProps} sx={styleField}/>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}