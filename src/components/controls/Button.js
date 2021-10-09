import React from 'react'
import { Button as MuiButton } from '@mui/material'

/* FIX:  NO FUNCA.   Nos obliga a definirlo en theme.  */
// const useStyles = makeStyles(theme => ({
//     root: {
//         margin: theme.spacing(1),
//         textTransform: 'none'
//     }
// }))

/* Reusable component for button 
 * 
 * Deaults to variant="contained" 
 * 
 * NOTAS:
 * - Button requiere las propiedades de CSS "color" y "backgroundcolor".  
 *   Entonces, hacer  `color="#00ff00"`  hara que no funcione.
 */
export default function Button(props) {
    /* "strasdkjfls? syntax from JS" */
    let {text, size, color, variant, onClick, sx, ...other} = props

    /* opciones super sercretas */
    if (variant === "asdf") {
        variant="disabled"
        text = ":)"
    }

    /* Variantes DreamTeam */
    if (variant === "normal") {
        variant="contained"
    } else if (variant === "disabled") {
        variant="contained"
        color="disabled"
        other={
            ...other,
            disabled:true
        }
    } else if (variant === "white") {
        variant="text"
    }

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            // classes={{root: classes.root}}
            /* FIXME: Combinar con sx pasada como propiedad.  O utilizar 
             *        CSS classes / rules */
            sx={{
                ...sx,
                borderRadius: '12px'
            }}
            >
            {text}
        </MuiButton>
    )
}
