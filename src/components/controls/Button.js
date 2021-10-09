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
    let {text, size, color, variant, onClick, ...other} = props

    /* opciones super sercretas */
    if (variant == "asdf") {
        // return (
        //     <MuiButton
        //         variant={variant || "contained"}
        //         size={size || "large"}
        //         color={color || "primary"}
        //         onClick={onClick}
        //         {...other}
        //         // classes={{root: classes.root}}
        //         // sx={{
        //         //     margin: '4px',
        //         //     textTransform: 'none'
        //         // }}
        //         >
        //         ":)"
        //     </MuiButton>
        // )
        variant=null
        text = ":)"
    }

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            // classes={{root: classes.root}}
            >
            {text}
        </MuiButton>
    )
}
