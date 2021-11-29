/* Author: Gabs
 *
 * Si no hay proceso activo, permite crear uno.
 *
 */
import React from 'react'
import { Controls } from '../../../../components/controls/Controls'
import { Box, Stack, Typography } from '@mui/material'

export default function ItemProcesoActualVacio(props) {
    const { setOpenPopup, addOrEdit } = props
    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            padding={2} mb={2}
        >
            <Stack direction="column" align="center" spacing={1}>
                <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                    No se ha iniciado ningún proceso de descargas
                </Typography>
                <Box mb={3}>
                    <Controls.Button
                        text="Iniciar Nuevo Proceso"
                        onClick={() => { setOpenPopup(true); }}
                    />
                </Box>
            </Stack> 
        </Box>
    )
}
