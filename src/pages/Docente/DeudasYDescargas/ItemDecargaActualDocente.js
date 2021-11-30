import React, {useState} from 'react'
import { Box, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ConfirmDialog from '../../../components/util/ConfirmDialog';

const tableHeaders = [
    {
      id: 'asunto',
      label: 'Asunto',
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
      id: 'cantidad',
      label: 'Cantidad',
      numeric: false,
      sortable: true
    }
]


export default function ItemDecargaActualDocente(props) {
    const {descargaActual,setRecordForEdit, setOpenPopup, onDelete,
        setOpenPopupDetalle
    } = props
    const [row, setRow] = React.useState(false)
    const [confirmDialog, setConfirmDialog] = useState(
        { isOpen: false, title: '', subtitle: '' })

    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
    }

    return (
        <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
            px={2} py={2} mb={2}
        >
             <TableRow align="center">
                <TableCell sx={{width: "400px",borderBottom: "none"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {//formatoFecha(item.fecha_enviado)
                            "fecha"
                            }
                    </Typography>
                    <div/>
                    <Typography fontWeight='bold' fontSize={18}>
                         {/* Nombre del proceso */}
                    </Typography>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Autor: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {/* Docente de soli */}
                        lasjdklasjdklasdjlkasjdklajsdlkas
                    </Typography>
                </TableCell>
                <TableCell sx={{width:"150px",borderBottom: "none"}}>
                    <Typography display="inline">
                        Resultado de Solicitud:{'\u00A0'}
                    </Typography>
                    <Typography display="inline">
                        {/* Funcion para que sea Aprobado, Rechazada o Pendiente */}
                        Resultado 
                    </Typography>  
                </TableCell>
                <TableCell sx={{width:"200px",borderBottom: "none"}}>
                    <Controls.Button
                        text="Ver Solicitud"
                        type="submit"
                        onClick={() => { getRow(descargaActual); setOpenPopupDetalle(true) }}
                        />
                </TableCell>
                <TableCell sx={{maxWidth:"200px",borderBottom: "none",borderBottom: "none"}}>
                    <Controls.ActionButton
                        color="warning"
                        onClick={ () => {setOpenPopup(true);setRecordForEdit(descargaActual)}}
                    >
                        <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    <IconButton aria-label="delete">
                            <DeleteIcon
                            color="warning"
                            onClick={() => {
                              
                              setConfirmDialog({
                                isOpen: true,
                                title: '¿Eliminar la solicitud permanentemente?',
                                subTitle: 'No es posible deshacer esta accion',
                                onConfirm: () => {onDelete(descargaActual)}
                                //onConfirm: () => {onDelete(descargaActual.id)}
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
