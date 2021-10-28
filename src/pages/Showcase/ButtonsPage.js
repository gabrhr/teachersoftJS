/* Author: Mitsuo
 */
import React from 'react'
import { Typography } from '@mui/material';
import { Controls } from '../../components/controls/Controls';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function ButtonsPage() {
    return (
        <>
            <Typography> Azul con icono </Typography>
            <Controls.Button
                text="Submit"
                type="submit"   // html property (not component)
                endIcon={<ErrorOutlineIcon />}
            />
            <Typography> Gris </Typography>
            <Controls.Button
                // disabled={true}
                variant="disabled"
                text="Reset"
            />
            <Typography> Boton Desactivado Plomo </Typography>
            <Controls.Button
                variant="contained"
                disabled
                text="Disabled"
                size="medium"
            />
            <Typography> Boton Blanco </Typography>
            <Controls.Button
                variant="outlined"
                text="outlined"
                size="small"
            />
            <div></div>
            
            <Typography> Boton con icono (malogrado) </Typography>
            <Controls.Button
                variant="iconoTexto"
                text="icon button text"
            />
        </>
    )
}
