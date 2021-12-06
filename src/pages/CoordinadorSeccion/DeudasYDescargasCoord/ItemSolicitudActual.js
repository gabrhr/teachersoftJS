/* Author: Gabs
 *
 */
import React, {useState} from 'react'
import {  Box, TableBody,TableCell, TableRow, Typography, Divider, Table } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'

/* icons */
import IconButton from '../../../components/controls/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'
import ConfirmDialog from '../../../components/util/ConfirmDialog'
import moment from 'moment'
import 'moment/locale/es'
import { DT } from '../../../components/DreamTeam/DT'
import Popup from '../../../components/util/Popup';
import ModalAprobados from './ModalAprobados'
moment.locale('es');

export default function ItemProcesoActual(props) {
    const { solicitudActual,procesoActual,
        setConfirmDialog,confirmDialog, addOrEdit } = props
    const [openAprobados, setOpenAprobados] = useState(false)

    console.log("La solicitud actual es", solicitudActual)
    
    function formatoFecha(fecha){
        if(fecha!=null){
            return (moment(fecha).format('DD MMM YYYY [-] h:mm a'))
        }
    }
    function formatoFechaProceso(fecha,plazo){
        if(fecha!=null){
            if( plazo){
                return (moment(fecha).add(2,'days').format('h:mm a [del] dddd DD MMM YYYY'))
            }  
            return (moment(fecha).format('h:mm a [del] dddd DD MMM YYYY'))
        }
    }
    
    let now = new Date()  
    let fechafin= new Date(solicitudActual.procesoDescarga.fecha_fin_seccion)

    return (
        <>
  
        <Typography sx={{color:"primary.light"}}>
                <b>{procesoActual.nombre}</b> 
                {fechafin<=now || (
                    " vigente a partir de las " + formatoFechaProceso(procesoActual.fecha_fin_docente,0) +
                    '\u00A0' + "hasta las " + formatoFechaProceso(procesoActual.fecha_fin_seccion,0))
                }
        </Typography>
        <Typography sx={{color:"primary.light"}}>
            Publicación de Resultados desde las {formatoFechaProceso(procesoActual.fecha_fin,0)} 
        </Typography>
        {solicitudActual.estado_tracking===1 && solicitudActual.resultado===1  &&
            <Typography sx={{color:"red"}}>
                Debe validar la lista final de aprobados hasta <b> {formatoFechaProceso(procesoActual.fecha_fin,1)} </b>
            </Typography>
        }
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            px={2}  mb={10} mt={2}
        >
            <Table>
             <TableRow align="center">
                <TableCell sx={{minWidth:"150px",borderBottom: "none"}}>
                    <Typography display="inline" fontWeight="450"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {formatoFecha(solicitudActual.fecha_creacion)}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Proceso: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" fontWeight='bold' fontSize={16}>
                        {solicitudActual.procesoDescarga.nombre}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Seccion: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.seccion.nombre} 
                    </Typography>
                    <div/>
                </TableCell>
                <TableCell sx={{borderBottom: "none"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Estado: {'\u00A0'} 
                    </Typography>
                    <DT.Etiqueta
                            type={solicitudActual.resultado === 0 ? "pendiente" :
                            "atendido"}
                            sx={{ marginBottom:"4px"}}
                            />
                </TableCell>
                <TableCell sx={{borderBottom: "none"}}>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes recibidas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {parseInt(solicitudActual.asunto)} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes enviadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.cantidad_solicitada} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes aprobadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={solicitudActual.resultado===0? {color:"primary.light"}:
                        solicitudActual.resultado===1? {color:"#2EBD59"} : {color:"red"}
                    }>
                        {solicitudActual.resultado>0? solicitudActual.cantidad_aprobada: "-"} 
                    </Typography>
                </TableCell>
                <TableCell sx={{borderBottom: "none"}}> 
                    <Link to ={{
                        pathname:"/cord/solicitudes/deudasYDescargas/solicitud",
                        state:{
                            recordForEdit: solicitudActual,
                            procesoActual: procesoActual.id
                        }
                    }}  style={{ textDecoration: 'none' }}>
                        <Controls.Button
                            text="Detalle"
                            />
                    </Link>
                    {solicitudActual.resultado === 1 && solicitudActual.estado_tracking>=1 
                    && solicitudActual.cantidad_solicitada>0 &&(
                        <Controls.Button
                            text={solicitudActual.estado_tracking===2?"Aprobados":"Validar"}
                            onClick={()=>{setOpenAprobados(true)}} 
                        />)
                    }

                </TableCell>
            </TableRow>
            </Table>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                />
        </Box>

        <Popup
                openPopup={openAprobados}
                setOpenPopup={setOpenAprobados}
                title={solicitudActual.estado_tracking===2?"Lista de Aprobados":"Validar Lista de Descargas"}
                size = "md"
            >
               <ModalAprobados setOpenAprobados = {setOpenAprobados} procesoActual = {procesoActual}
               cantAprobada = {solicitudActual.cantidad_aprobada} solicitudActual = {solicitudActual}
                resultado = {solicitudActual.estado_tracking===2? 1:0}/>
        </Popup>
        </>
    )
}
