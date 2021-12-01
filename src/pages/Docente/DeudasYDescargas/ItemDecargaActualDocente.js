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
        return (moment(fecha).format('DD MMM YYYY [-] h:mm a'))
    }
}

function formatoFechaProceso(fecha){
    if(fecha!=null){
        return (moment(fecha).format('h:mm a [del] dddd DD MMM YYYY'))
    }
}


export default function ItemDecargaActualDocente(props) {
    const {item,setRecordForEdit, setOpenPopup, onDelete,
        setOpenPopupDetalle, setConfirmDialog, confirmDialog, procesoActivo
    } = props
    const [row, setRow] = React.useState(false)
    

    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
        console.log("Get rowww?", row)
    }

    let now = new Date()  
    let fechafin= new Date(item.procesoDescarga.fecha_fin_docente)
    return (
        <>
            <Typography sx={{color:"primary.light"}}>
                <b>{procesoActivo.nombre}</b> vigente a partir de las {formatoFechaProceso(procesoActivo.fecha_inicio)} 
                {'\u00A0'} hasta las {formatoFechaProceso(procesoActivo.fecha_fin_docente)}
            </Typography>
            <Typography sx={{color:"primary.light"}}>
                * Publicación de Resultados desde las {formatoFechaProceso(procesoActivo.fecha_fin)} 
            </Typography>
            <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
                px={2} pl={2}  mb={10} mt={2}
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
                    <TableCell  sx={{width:"180px",borderBottom: "none"}} align="center">
                        <Typography fontWeight="550" sx={{color:"primary.light"}}>
                            Resultado:{'\u00A0'}
                        </Typography>
                        <DT.Etiqueta
                            type={item.resultado === 0 ? "pendiente" :
                            item.resultado === 1 ? "aprobado" :
                            "desaprobado"}
                            sx={{ marginBottom:"4px"}}
                        />
                    </TableCell>
                    
                    <TableCell sx={{width:"250px",borderBottom: "none"}} align="right">
                        <Controls.Button
                            text="Ver Solicitud"
                            type="submit"
                            onClick={() => { setRecordForEdit(item); setOpenPopupDetalle(true) }}
                            />
                    </TableCell>
                    {
                        fechafin<=now? 
                        <TableCell sx={{maxWidth:"200px",borderBottom: "none",borderBottom: "none"}}>
                            <> </>
                        </TableCell>:
                        <>
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
                        </>
                    }
                </TableRow>
                <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                />
            </Box>
        </>
    )
}
