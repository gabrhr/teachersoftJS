/* Author: Manuel
 *
 * Detalle de una solicitud.
 * URL: localhost:3000/doc/solicitudDetalle
 */
import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles';
import { Controls } from '../../components/controls/Controls'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell,InputAdornment, Grid, Typography, TextField } from '@mui/material';
import { DT } from '../../components/DreamTeam/DT';

/*ICONS*/
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const initialFieldValues = {
    seccionID: '',
  }

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
        return ("Fecha: "
                +fecha.slice(8,10) +'/'
                +fecha.slice(5,7) +'/'
                +fecha.slice(0,4)
                +"- Hora: "
                +fecha.slice(11,19)
        )
    }
    return ('Fecha: \xa0--/--/--'+'\xa0\xa0\xa0\xa0' + 'Hora: \xa0--:--')
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
        crearEstado(5, 'Resultado',"",fecha4==null?"-":`${resultado}`, true),
    ]
} 
    

export default function SolicitudDetalle() {
    const [records, setRecords] = useState()
    const location= useLocation()
    const {solicitud}=location.state
    const SubtitulosTable = { display: "flex" }
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    const [estadosTracking, setEstadosTracking ] = useState(estadosTrackingInit(solicitud))
    const history = useHistory();



    return (
        <>
        <ContentHeader
            text="Mesa de Partes - Detalle de la solicitud"
            cbo={false}
        />
        <Grid
            container
            ml={-1}
            mr={0}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
        <Grid item xs={6} md={1} mb={3}>
            <Link to={'/doc/misSolicitudes'}  style={{ textDecoration: 'none' }}> 
                <Controls.Button
                    variant="outlined"
                    text="Regresar"
                    size="small"
                    startIcon={<ArrowBackIcon />}
                />
            </Link>
          </Grid>
        </Grid>
        <Paper variant="outlined" sx={PaperStyle}>
         <Grid container spacing={2}>
            <Grid item xs={4} md={7.4}>
                <Box>
                    <DT.Title size="medium" text={'Trámite: ' + `${solicitud.temaTramite}`+' - '+ `${solicitud.tipoTramite}`} />
                    <Typography variant = "subtitle1">
                        Sección: {solicitud.seccion} 
                    </Typography>
                </Box>
                <Divider  flexItem/>
                <Box>
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
                    defaultValue="Debido a ..."
                />
                <Grid item xs={0.3} md={0.3}/>
                <Divider  flexItem/>
                <Box>
                    <Controls.DreamTitle
                        title ={'Archivos Adjuntos: '}
                        size = '16px'
                        lineheight = '300%'
                    />
                    <DT.FileButton
                        text="Archivo de prueba"
                        type="addFile"
                    />
                </Box>
            </Grid>
            <Grid item xs={0.3} md={0.3}/>
            <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
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
 
        </Paper>
         </>
    )
}
