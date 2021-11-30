import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Controls } from '../../../components/controls/Controls';

export default function ItemDecargaVaciaDocente(props) {
    const { setOpenPopup, addOrEdit } = props
    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            padding={2} mb={2}
        >
            <Stack direction="column" align="center" spacing={1}>
                <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                    Se ha iniciado un nuevo proceso de Desarga
                </Typography>
                <Box mb={3}>
                    <Controls.Button
                        text="Nueva Solicitud"
                        onClick={() => { setOpenPopup(true); }}
                    />
                </Box>
            </Stack> 
        </Box>
    )
}
