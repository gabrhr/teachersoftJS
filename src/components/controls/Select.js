import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';
import React from 'react'
import { styled } from '@mui/material/styles'
import { InputBase } from '@mui/material'
import { borderColor } from '@mui/system';

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

const StyledInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(2),
        color: theme.palette.primary.main,        
    },
    '& .MuiInputBase-input': {
        fontSize: 16,
    }

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

    const {name, label, value, error=null, onChange, options, variant, displayNoneOpt=false, ...other} = props;
    return (
        <FormControl
            variant={variant || "outlined"}
            {...(error && {error: true})}
        >
            <InputLabel >{label}</InputLabel>
            
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                hover={false}
                defaultValue=""
                sx={{
                    borderRadius: "20px",
                    boxShadow: " 0px 3px 3px rgba(0, 0, 0, 0.25)",
                    borderColor:"hsl(0, 0%, 0%, 0)",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: " hsl(0, 0%, 0%, 0)",
                    },
                    "&:hover": {
                        "&& fieldset": {
                          border: "0.5px solid hsl(0, 0%, 0%, 0)"
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
