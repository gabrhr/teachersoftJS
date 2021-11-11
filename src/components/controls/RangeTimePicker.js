import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { es } from "date-fns/locale";
import ClearIcon from '@mui/icons-material/Clear';
import { Controls } from './Controls';
import { set } from 'date-fns';

export default function RangeTimePicker(props) {
  let {value, setValue} = props
  /* const [value, setValue] = React.useState([null, null]); */

  const styleField = {
    size:"small",
    width:"90px",
    ".css-1x51dt5-MuiInputBase-input-MuiInput-input":{
      padding: "11px 0 5px"
    },
    "label+.css-napcq1-MuiInputBase-root-MuiInput-root":{
      marginTop:"8px"
    },
    "& .MuiFormLabel-root": {
      color: "#848499",
    },
    "& .MuiFormLabel-root.Mui-focused":{
      color: "hsl(0, 0%, 0%, 0)",
    },
    '& .MuiInput-underline:hover:after': {
      borderBottomColor: 'secondary.main', // Solid underline on hover
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
    <Box sx= {{
      borderRadius: "18px",
      border: '.4px solid #BBBBBB20',
      width:"340px",
      boxShadow: " 0px 3px 3px rgba(0, 0, 0, 0.25)"
    }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
        <DateRangePicker
          startText="Fecha inicio"
          endText="   Fecha fin"
          value={value}
          clearable
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={( startProps, endProps) => (
            <React.Fragment>
              <Box sx={{ mx: 2, mt:2}}> <CalendarTodayOutlinedIcon fontSize="small" sx={{color:"primary.light"}}/> </Box>
              <TextField variant="standard" { ...startProps}  sx={styleField}/>
              <Box sx={{ ml: .4, mr:1.1, color:"#000", mb:"10px"}}> hasta </Box>
              <TextField variant="standard" {...endProps} sx={styleField}/>
              
                <Box sx={{ ml:1, mr:2}}> 
                  <Controls.IconButton
                    onClick={()=> setValue([null,null])}
                    sx={{
                        padding:"0px"
                    }}
                  >
                    <ClearIcon fontSize="small" /> 
                  </Controls.IconButton>
                </Box>
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </Box>

  );
}