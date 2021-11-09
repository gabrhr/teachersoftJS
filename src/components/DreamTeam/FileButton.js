import React from 'react'
import { Button as MuiButton, Typography } from '@mui/material'
import IconButton from '../controls/IconButton'
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { makeStyles } from "@mui/styles";
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';




export default function FileButton(props) {
    /* "strasdkjfls? syntax from JS" */
    let {text, size, color, onClick, sx, ...other} = props

    const useStyles = makeStyles(theme => ({
        buttonStyle: {
            /* archivos */
            background: '#7b61ff',
            border: '2px solid #D4D9EC',
            boxSizing: 'border-box',
            borderRadius: '20px',
            fontSize: '15px',
            color: '#FFF'
        }
    }))
    /* opciones super sercretas */
    const classes = useStyles();
     return (
        <MuiButton className={classes.buttonStyle}
            variant={"outlined"}
            size={size || "medium"}
            color={color || "DTButton"}
            onClick={onClick}
            endIcon={<SystemUpdateAltOutlinedIcon/>} 
 
            {...other}

            // classes={{root: classes.root}}
            /* FIXME: Combinar con sx pasada como propiedad.  O utilizar 
             *        CSS classes / rules */
            sx={{
                ...sx,
                borderRadius :'10px'
            }}
            >
            {text}
        </MuiButton>
    )
}

