import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Controls } from '../../../components/controls/Controls';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');

function formatoFecha(fecha){
    if(fecha!=null){
        return (moment(fecha).format('h:mm a [del] dddd DD MMM YYYY'))
    }
}

export default function ItemDecargaVaciaDocente(props) {
    const {proceso, setOpenPopup, addOrEdit } = props
    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            padding={2} mb={10} mt={2}
        >
            <Stack direction="column" fontWeight="540" align="center" spacing={1}>
                <Typography sx={{color:"primary.light"}}>
                    Se ha iniciado un nuevo proceso de Descarga. Puede enviar su solicitud <br/>
                    a partir de las <b> {formatoFecha(proceso.fecha_inicio)} </b> hasta las <b> {formatoFecha(proceso.fecha_fin_docente)} </b>
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
