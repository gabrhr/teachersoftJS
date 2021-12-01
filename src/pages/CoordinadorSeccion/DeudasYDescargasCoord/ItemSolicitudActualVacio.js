/* Author: Gabs
 *
 * Si no hay proceso activo, permite crear uno.
 *
 */
import React from 'react'
import { Controls } from '../../../components/controls/Controls'
import { Box, Stack, Typography } from '@mui/material'
import { Link} from 'react-router-dom';

export default function ItemProcesoActualVacio(props) {
    const { } = props
    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            padding={2} mb={2}
        >
            <Stack direction="column" align="center" spacing={1}>
                <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                    No se ha iniciado ninguna solicitud de descargas
                </Typography>
                <Box mb={3}>
                    <Link to ={{
                        pathname:"/cord/solicitudes/deudasYDescargas/nuevaSolicitud",
                        state:{
                            recordForEdit: null
                        }
                    }}  style={{ textDecoration: 'none' }}>

                        <Controls.Button
                        text="Nueva Solicitud"
                        />
                    </Link>
                    
                </Box>
            </Stack> 
        </Box>
    )
}
