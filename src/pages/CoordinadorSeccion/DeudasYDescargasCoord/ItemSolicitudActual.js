/* Author: Gabs
 *
 */
import React from 'react'
import { Grid, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import TrackinDescarga from '../../../components/DreamTeam/TrackinDescarga'
import useTable from '../../../components/useTable'
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
moment.locale('es');

const tableHeaders = [
    {
        id: 'proceso',
        label: 'Proceso',
        numeric: false,
        sortable: true
    },
    {
        id: 'descripcion',
        label: 'Descripcion',
        numeric: false,
        sortable: false
    },
    {
        id: 'acciones',
        label: 'Acciones',
        numeric: false,
        sortable: false
    },
    {
        id: 'detalle',
        label: 'Detalle',
        numeric: false,
        sortable: false
    }
]

export default function ItemProcesoActual(props) {
    const { solicitudActual, setRecordForEdit, onDelete,procesoActual,
        setConfirmDialog,confirmDialog, addOrEdit } = props
    const [row, setRow] = React.useState(false)
    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
    }
    function formatoFecha(fecha){
        if(fecha!=null){
            return (moment(fecha).format('DD MMM YYYY [-] h:mm a'))
        }
    }
    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            px={2} mb={10} mt={2}
        >
             <TableRow>
                <TableCell sx={{minWidth:"200px",borderBottom: "none"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
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
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Autor: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.solicitador.nombres+ " " + solicitudActual.solicitador.apellidos} 
                    </Typography>
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
                        {solicitudActual.cantidad_recibidas} 
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
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.cantidad_aprobada} 
                    </Typography>
                </TableCell>
                <TableCell sx={{maxWidth:"300px",borderBottom: "none"}}>
                     <Link to ={{
                        pathname:"/cord/solicitudes/deudasYDescargas/nuevaSolicitud",
                        state:{
                            recordForEdit: solicitudActual,
                            procesoActual: procesoActual.id
                        }
                    }}  style={{ textDecoration: 'none' }}>
                        <Controls.ActionButton
                            color="warning"
                        >
                            <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
                    </Link>
                    <IconButton aria-label="delete">
                            <DeleteIcon
                            color="warning"
                            onClick={() => {
                            
                            setConfirmDialog({
                                isOpen: true,
                                title: '¿Eliminar la solicitud permanentemente?',
                                subTitle: 'No es posible deshacer esta accion',
                                onConfirm: () => {onDelete(solicitudActual.id)}
                            })
                            }}/>
                    </IconButton>
                </TableCell> 
            </TableRow>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                />
        </Box>

    )
}
