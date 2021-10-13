import React from 'react'
import { Button as MuiButton, Typography } from '@mui/material'
import IconButton from './IconButton'
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';

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
            // disabled:true
        }
    } else if (variant === "white") {
        variant="text"
    }else if (variant=="iconoTexto"){
        return (
            <Box display="ruby-base-container" textAlign="center" > 
            
                <Typography pt={1.3}> {text} </Typography>
                <IconButton 
                    color="secondary"
                    size="large"
                    sx={{
                        color: "#fff",
                        backgroundColor: "primary.main",
                        "&:hover" :{
                            backgroundColor: "primary.light",
                        }
                    }}
                    onClick={onClick}
                    {
                        ...other
                    }
                >
                <AddIcon />
           </IconButton>
            </Box>
        );
    }

    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "medium"}
            color={color || "DTButton"}
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
