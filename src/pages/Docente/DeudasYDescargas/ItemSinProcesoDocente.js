import React from 'react'
import { Box, Grid, Typography } from '@mui/material'


export default function ItemSinProcesoDocente() {
    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            padding={2} mb={10} mt={2}
        >
            <Grid item xs= {12} rowSpacing={20} align = "center">
                <Typography display="inline" align="center" fontWeight="550"  sx={{color:"primary.light"}}>
                    No se tiene ningún proceso de Solicitud de Descargas abierto
                </Typography>
            </Grid>
        </Box>
    )
}
