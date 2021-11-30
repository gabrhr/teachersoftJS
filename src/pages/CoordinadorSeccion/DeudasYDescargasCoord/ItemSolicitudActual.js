/* Author: Gabs
 *
 */
import React from 'react'
import { Grid, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import TrackinDescarga from '../../../components/DreamTeam/TrackinDescarga'
import useTable from '../../../components/useTable'
import { Controls } from '../../../components/controls/Controls'

/* icons */
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '../../../components/controls/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


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
    const { solicitudActual, setRecordForEdit, setOpenPopup } = props
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
            </TableRow>
        </Box>
    )
}
