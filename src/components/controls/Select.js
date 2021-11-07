import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import React from 'react'
import { styled } from '@mui/material/styles'
import { InputBase } from '@mui/material'
import { borderColor, fontWeight } from '@mui/system';
import  { useTheme } from '@mui/material/styles'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/* Muchas de estas "opciones" puede que esten por gusto.  Solo me las copie
 * del ejemplo de Mui.  Cuidado al modificar */
const StyledInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        // display: "none",
        marginTop: theme.spacing(2),
        color: theme.palette.primary.main,        
    },
    '& .MuiInputBase-input': {
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        borderRadius: "18px",
        border: '.4px solid #BBBBBB30',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            //borderRadius: 4,
            //borderColor: '#80bdff',
            //boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))

function CustomSelect(props) {
    return (
        <Select
            input={<StyledInput />}
        >
            {props.children}
        </Select>
    )
}

export default function Select(props) {
    const theme = useTheme()

    const {name, label, value, error=null, onChange, options, variant, displayNoneOpt=false, ...other} = props;
    return (
        <FormControl
            sx={{
                '& .MuiInputLabel-root': {
                    color: theme.palette.primary.light,
                    fontWeight: "500",
                    fontSize: 17,
                    transform: "translate(1px, -8px) scale(1)"
                }
            }}
            variant={variant || "outlined"}
            {...(error && {error: true})}
        >
            {/* <InputLabel >{label}</InputLabel> */}
            <InputLabel 
                id="DT-customized-select-label" 
                mb={3}
            >
                {label}
            </InputLabel>
            
            <MuiSelect
                labelId="DT-customized-select-label"
                input={<StyledInput />}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                hover={false}
                defaultValue=""
                sx={{
                    borderRadius: "18px",
                    boxShadow: " 0px 3px 3px rgba(0, 0, 0, 0.25)",
                    borderColor:"hsl(0, 0%, 0%, 0)",
                    '& fieldset': {
                        borderColor: "hsl(0, 0%, 0%, 0)"
                       
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: " hsl(0, 0%, 0%, 0)",
                    },
                    "&:hover": {
                        "&& fieldset": {
                          border: "0.5px solid #BBBBBB30"
                        }
                      }
                }}

                disableUnderline
                {...other}
            >
                {displayNoneOpt ? <MenuItem value={value}>Seleccionar</MenuItem> : null}
                {/*displayNoneOpt ? <MenuItem value="">None</MenuItem> : null*/}
                {
                    options.map(
                        item => (
                            <MenuItem key={item.id} value={item.id} >
                                {item.nombre || item.title}
                            </MenuItem>
                        )
                    )

                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
