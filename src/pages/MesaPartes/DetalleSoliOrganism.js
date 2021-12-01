/* Author: Gabs (UI/UX), Mitsuo (conexion), Sergio (Files)
 *
 * P:  RecepcionDetalleSolicitud.js
 */
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Controls } from '../../components/controls/Controls'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell, InputAdornment, Grid, Typography, TextField, Stack } from '@mui/material';
import { DT } from '../../components/DreamTeam/DT';
import { Link } from 'react-router-dom';
import archivoService from '../../services/archivoService';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');
// import moment from 'moment'

/*ICONS*/

function crearEstado(estado, titulo, contenido, fecha, completado) {
    return {
        estado, titulo, contenido, fecha, completado
    }
}

function estadoCompletado(fecha) {
    return fecha !== null
}

function formatoFecha(fecha,e) {
    if (fecha != null) {
        if(e>0){
            return (moment.utc(fecha).subtract(5, 'hours').format('[Fecha] DD MMM YYYY [- Hora: ] h:mm a'))
        }
        return (moment.utc(fecha).format('[Fecha] DD MMM YYYY [- Hora: ] h:mm a'))
    }
    return (" ")
}

function estadosTrackingInit(solicitud) {
    let fecha1 = solicitud.tracking.fecha_enviado
    let fecha2 = solicitud.tracking.fecha_revision
    let fecha3 = solicitud.tracking.fecha_delegado
    let fecha4 = solicitud.tracking.fecha_atendido
    let delegado = fecha3==null && fecha4!=null? "atendido por Secretaría":solicitud.delegado.fullName
    let e= solicitud.estado
    let resultado = solicitud.resultado
    return [
        crearEstado(1, 'Enviado', '', formatoFecha(fecha1,e), estadoCompletado(fecha1)),
        crearEstado(2, 'En revisión', "", formatoFecha(fecha2,e), estadoCompletado(fecha2)),
        crearEstado(3, fecha3==null && fecha4!=null?'No Delegado':'Delegado', `${delegado}`,
         formatoFecha(fecha3,e), estadoCompletado(fecha3)),
        crearEstado(4, 'Atendido', "", formatoFecha(fecha4,e), estadoCompletado(fecha4)),
        crearEstado(5, 'Resultado', "", fecha4 == null ? " " : `${resultado}`, true),
    ]
} 

const onDownload = (item) => {
    var a = document.createElement("a"); //Create <a>
    a.href = item.base64; //Image Base64 Goes here
    a.download = item.nombre; //File name Here
    a.click(); //Downloaded file
}

const listarArchivos = async (id) =>{
    var archivosAsignados = await archivoService.getArchivosSolicitud(id);
    archivosAsignados = archivosAsignados ?? []
    const archivosAsignadosObj = [];
    archivosAsignados.map(archivo => (
        archivosAsignadosObj.push({
          id: archivo.id.toString(),
          nombre: archivo.nombre + '.' + archivo.extension,
          base64: archivo.contenido_b64
        })
    ));
    return archivosAsignadosObj;
}


export default function DetalleSoliOrganism(props) {
    const { solicitud } = props
    const [records, setRecords] = useState([])
    const SubtitulosTable = { display: "flex" }

    const [estadosTracking, setEstadosTracking] = useState(estadosTrackingInit(solicitud))

    React.useEffect(() => {
        setEstadosTracking(estadosTrackingInit(solicitud))
    }, [solicitud])

    useEffect(() => {
        listarArchivos(solicitud.id)
        .then (archivosAsignadosObj =>{
           setRecords(archivosAsignadosObj);
           console.log("records archivos",archivosAsignadosObj)
        });
    }, [])

    return (
        <>
            <Grid container spacing={2} ml={".3px"}>
                <Grid item xs={7.4}>
                    <Typography variant="body1" color={"#D4D9EC"} my={.5}>
                        Solicitud #{solicitud.id}
                    </Typography>
                    <Box>
                        <DT.Title size="medium" text={'Trámite: ' + `${solicitud.temaTramite}` + ' - ' + `${solicitud.tipoTramite}`} />
                        <Typography variant="subtitle1">
                            Sección: {solicitud.seccion}
                        </Typography>
                    </Box>
                    <Divider flexItem />
                    <DT.HeaderSolicitud solicitud={solicitud} solicitador={true} />
                    <Box ml="75px">
                        <Controls.DreamTitle
                            title={'Asunto: ' + `${solicitud.asunto}`}
                            size='20px'
                            lineheight='300%'
                        />
                    </Box>
                    <TextField
                        id="outlined-multiline-static"
                        fullWidth
                        multiline
                        rows={6}
                        disabled
                        defaultValue={`${solicitud.descripcion}`}
                        sx={{
                            pl: "78px",
                            mb: "20px",
                            /* magia negra de gabs */
                            ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                                WebkitTextFillColor: "black"
                            }
                        }}
                    />
                    <Grid item xs={0.3}/>
                    <Divider flexItem pl="20px" />
                    <Box ml="76px" width="100%" mb="50px"> 
                        <Controls.DreamTitle
                            title={'Archivos Adjuntos: '}
                            size='20px'
                            lineheight='300%'
                        />
                        <Grid 
                            container
                            direction="row"
                        >
                        {
                            
                            records.map((archivo,index) => (
                                <DT.FileButton
                                    key={index}
                                    text={
                                        archivo.nombre.length <= 19
                                        ? archivo.nombre
                                        : archivo.nombre.substring(0,17) + "..."
                                    }
                                    onClick={() => {
                                        onDownload(archivo);
                                    }}
                                    type="addFile"
                                />
                            ))
                        }
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={0.3}/>
                <Divider orientation="vertical" flexItem sx={{ marginTop: '20px', mr: "10px", ml: "20px", mb: "10px" }} />
                <Grid item xs={4}>
                    <Controls.DreamTitle
                        title={'Respuesta a la Solicitud'}
                        size='18px'
                        lineheight='150%'
                    />
                    <DT.Tracking estadosTracking={estadosTracking}/>
                </Grid>
            </Grid>
        </>
    )
}