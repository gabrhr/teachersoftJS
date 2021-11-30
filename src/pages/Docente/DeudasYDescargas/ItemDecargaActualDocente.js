import React, {useState} from 'react'
import { Box, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ConfirmDialog from '../../../components/util/ConfirmDialog';
import moment from 'moment'
import 'moment/locale/es'
import { DT } from '../../../components/DreamTeam/DT';
moment.locale('es');

function formatoFecha(fecha){
    if(fecha!=null){
        return (moment.utc(fecha).format('DD MMM YYYY [-] h:mm a'))
    }
}

export default function ItemDecargaActualDocente(props) {
    const {item,setRecordForEdit, setOpenPopup, onDelete,
        setOpenPopupDetalle, setConfirmDialog, confirmDialog
    } = props
    const [row, setRow] = React.useState(false)
    

    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
        console.log("Get rowww?", row)
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
                        {formatoFecha(item.fecha_creacion)}
                    </Typography>
                    <div/>
                    <Typography fontWeight='bold' fontSize={18}>
                        Solicitud de Descarga - {
                            item.procesoDescarga? item.procesoDescarga.nombre: ""
                        }
                    </Typography>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Autor: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.solicitador.nombres? item.solicitador.nombres: "" + " " + item.solicitador.apellidos? item.solicitador.apellidos:""} 
                    </Typography>
                </TableCell>
                <TableCell  sx={{width:"150px",borderBottom: "none"}}>
                    <Typography fontWeight="550" sx={{color:"primary.light"}}>
                        Resultado:{'\u00A0'}
                    </Typography>
                    <Typography>
                        {item.resultado === 0 ? "Pendiente" :
                         item.resultado === 1 ? "Aprobado" :
                         "Desaprobado"}
                         <DT.Etiqueta
                                type={ "atendido"}
                                sx={{marginRight:"10px", marginBottom:"4px"}}
                            />
                    </Typography>  
                </TableCell>
                <TableCell sx={{width:"200px",borderBottom: "none"}}>
                    <Controls.Button
                        text="Ver Solicitud"
                        type="submit"
                        onClick={() => { getRow(item); setOpenPopupDetalle(true) }}
                        />
                </TableCell>
                <TableCell sx={{maxWidth:"200px",borderBottom: "none",borderBottom: "none"}}>
                    <Controls.ActionButton
                        color="warning"
                        onClick={ () => {setOpenPopup(true);setRecordForEdit(item)}}
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
                                onConfirm: () => {onDelete(item.id)}
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
