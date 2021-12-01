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
    const { solicitudActual, setRecordForEdit, onDelete,
        setConfirmDialog,confirmDialog, addOrEdit } = props
    const [row, setRow] = React.useState(false)
    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
    }

    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            padding={2} mb={2}
        >
             <TableRow>
                <TableCell sx={{minWidth:"200px",borderBottom: "none"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.fecha_enviado}
                    </Typography>
                    <div/>
                    <Typography fontWeight='bold' fontSize={18}>
                        {solicitudActual.asunto}
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
                        {solicitudActual.solicitador.fullName} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Estado: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.estado} 
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Nombre del proceso: {'\u00A0'} 
                    </Typography>
                    <Typography fontWeight='bold' fontSize={16}>
                        {solicitudActual.proceso.nombre}
                    </Typography>
                </TableCell>
                <TableCell>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes recibidas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.solicitudes_recibidas} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes enviadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.solicitudes_enviadas} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes aprobadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {solicitudActual.solicitudes_aprobadas} 
                    </Typography>
                </TableCell>
                <TableCell sx={{maxWidth:"200px",borderBottom: "none",borderBottom: "none"}}>
                    <Link to ={{
                        pathname:"/cord/solicitudes/deudasYDescargas/nuevaSolicitud",
                        state:{
                            recordForEdit: solicitudActual
                        }
                    }}  style={{ textDecoration: 'none' }}>
                        <Controls.ActionButton
                            color="warning"
                            //onClick={ () => { setRecordForEdit(solicitudActual)}}
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
