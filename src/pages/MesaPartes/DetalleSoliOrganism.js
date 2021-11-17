import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles'
import { Controls } from '../../components/controls/Controls'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell,InputAdornment, Grid, Typography, TextField, Stack } from '@mui/material';
import { DT } from '../../components/DreamTeam/DT';
import { Link } from 'react-router-dom';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');
// import moment from 'moment'

/*ICONS*/

function crearEstado(estado, titulo, contenido,fecha, completado) {
    return {
        estado, titulo, contenido, fecha,completado
    }
}

function estadoCompletado(fecha){
    if(fecha==null) 
        return false
    return true
}
function formatoFecha(fecha){
    if(fecha!=null){
        return (moment.utc(fecha).format('[Fecha] DD MMM YYYY [- Hora: ] h:mm a'))
    }
    return (" ")
}

function estadosTrackingInit(solicitud){
    let fecha1= solicitud.tracking.fecha_enviado
    let fecha2= solicitud.tracking.fecha_revision
    let fecha3= solicitud.tracking.fecha_delegado
    let fecha4= solicitud.tracking.fecha_atendido
    let delegado=solicitud.delegado.fullName
    let resultado = solicitud.resultado
    return [
        crearEstado(1, 'Enviado','', formatoFecha(fecha1), estadoCompletado(fecha1)),
        crearEstado(2, 'En revisión',"", formatoFecha(fecha2), estadoCompletado(fecha2)),
        crearEstado(3, 'Delegado',`${delegado}`,formatoFecha(fecha3), estadoCompletado(fecha3)),
        crearEstado(4, 'Atendido',"" ,formatoFecha(fecha4), estadoCompletado(fecha4)),
        crearEstado(5, 'Resultado',"",fecha4==null?" ":`${resultado}`, true),
    ]
} 
export default function DetalleSoliOrganism(props) {
    const {solicitud} = props
    const [records, setRecords] = useState()
    const SubtitulosTable = { display: "flex" }
    
    const [estadosTracking, setEstadosTracking ] = useState(estadosTrackingInit(solicitud))
    return (
        <>
         <Grid container spacing={2} ml={".3px"}>
            <Grid item xs={4} md={7.4}>
                <Box>
                    <DT.Title size="medium" text={'Trámite: ' + `${solicitud.temaTramite}`+' - '+ `${solicitud.tipoTramite}`} />
                    <Typography variant = "subtitle1">
                        Sección: {solicitud.seccion} 
                    </Typography>
                </Box>
                <Divider  flexItem />
                <DT.HeaderSolicitud solicitud={solicitud} solicitador={true}/>
                <Box ml="75px">
                    <Controls.DreamTitle
                        title ={'Asunto: ' + `${solicitud.asunto}`}
                        size = '20px'
                        lineheight = '300%'
                    />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    fullWidth 
                    multiline
                    rows={5}
                    disabled
                    defaultValue={`${solicitud.descripcion}`}
                    sx={{
                        pl:"78px",
                        mb:"20px"
                    }}
                />
                <Grid item xs={0.3} md={0.3}/>
                <Divider  flexItem pl="20px"/>
                <Box ml="76px" display="none">
                    <Controls.DreamTitle
                        title ={'Archivos Adjuntos: '}
                        size = '20px'
                        lineheight = '300%'
                    />
                    <DT.FileButton
                        text="Archivo de prueba"
                        type="addFile"
                    />
                </Box>
            </Grid>
            <Grid item xs={0.3} md={0.3}/>
            <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px", mb:"10px"}} />
            <Grid item xs={6} md={4}>
                <Controls.DreamTitle
                    title ={'Respuesta a la Solicitud'}
                    size = '18px'
                    lineheight = '150%'
                />
                <DT.Tracking estadosTracking={estadosTracking}/>
            </Grid>
        </Grid>
        <Grid item xl={6} md={6} sm={12} xs={12}>    
        </Grid>
 
         </>
    )
}