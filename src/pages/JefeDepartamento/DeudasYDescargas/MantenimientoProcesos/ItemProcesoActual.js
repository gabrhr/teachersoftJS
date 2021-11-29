/* Author: Gabs
 *
 */
import React from 'react'
import { Grid, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Link} from 'react-router-dom';
import TrackinDescarga from '../../../../components/DreamTeam/TrackinDescarga'
import useTable from '../../../../components/useTable'
import { Controls } from '../../../../components/controls/Controls'

/* icons */
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '../../../../components/controls/IconButton';
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
    const {procesoActual,setRecordForEdit, setOpenPopup } = props
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
                <TableCell sx={{minWidth:"220px",borderBottom: "none"}}>
                    <Typography  fontWeight="550"  sx={{color:"primary.light"}}>
                        Nombre de Proceso: {'\u00A0'}
                    </Typography>
                    <Typography  sx={{color:"primary.light"}}>
                        {procesoActual.nombre} 
                    </Typography >
                </TableCell>
                <TableCell  align="center" sx={{borderBottom: "none"}}> 
                    {/* Tracking dibujo */}
                    <TrackinDescarga item={procesoActual}/>
                </TableCell>
                <TableCell sx={{maxWidth:"70px",borderBottom: "none"}}> 
                    <Controls.ActionButton
                        color="warning"
                        onClick={ () => {setOpenPopup(true); setRecordForEdit(procesoActual)}}
                    >
                        <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                </TableCell>
                <TableCell sx={{maxWidth:"70px",borderBottom: "none"}}>
                    <Link to ={{
                        pathname:"/jd/asignacionCarga/proceso/descarga",
                        state:{
                            procesoinit: procesoActual
                        }
                    }}  style={{ textDecoration: 'none' }}>

                        <IconButton size="small"
                            onClick={() => { getRow(procesoActual) }}
                        >
                            <ArrowForwardIosIcon fontSize="small" />

                        </IconButton>
                    </Link>
                </TableCell>
            </TableRow>
        </Box>
    )
}
