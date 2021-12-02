import React from 'react'
import { Controls } from '../../../components/controls/Controls'
import { Box, Stack, Typography } from '@mui/material'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');

function formatoFecha(fecha){
    if(fecha!=null){
        return (moment(fecha).format('h:mm a [del] dddd DD MMM YYYY'))
    }
}

export default function ItemSinProcesoSeccion(props) {
    const { proceso } = props
    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            padding={2} mb={2}
        >
            <Stack direction="column" align="center" spacing={1}>
            <Typography sx={{color:"primary.light"}}>
                    Se ha iniciado un nuevo proceso de Descarga. Puede enviar su solicitud <br/>
                    a partir de las <b> {formatoFecha(proceso.fecha_fin_docente)} </b> hasta las <b> {formatoFecha(proceso.fecha_fin_seccion)} </b>
                </Typography>
            </Stack> 
        </Box>
    )
}
