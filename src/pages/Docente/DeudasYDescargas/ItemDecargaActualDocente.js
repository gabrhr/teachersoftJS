import React, {useState} from 'react'
import { Box, TableCell, TableRow, Typography, Divider, Table } from '@mui/material'
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
        return (moment.utc(fecha).format('DD MMM YYYY')) + " - " +(moment.utc(fecha).subtract(5, 'hours').format('h:mm a'))
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
    }

    let now = new Date()  
    let fechafin= new Date(item.procesoDescarga.fecha_fin_docente)
    return (
        <>
            <Typography sx={{color:"primary.light"}}>
                <b>{procesoActivo.nombre}</b> 
                {fechafin<=now || (
                    " vigente a partir de las " + formatoFechaProceso(procesoActivo.fecha_inicio) +
                    '\u00A0' + "hasta las " + formatoFechaProceso(procesoActivo.fecha_fin_docente))
                }
            </Typography>
            {item.resultado===0 &&
                <Typography sx={{color:"primary.light"}}>
                    Publicación de Resultados desde las {formatoFechaProceso(procesoActivo.fecha_fin)} 
                </Typography>
            }
            { fechafin<=now ||
                <Typography  my={1} sx={{color:"primary.light"}}>
                    * La solicitud generada se enviará automáticamente a las {formatoFechaProceso(procesoActivo.fecha_fin_docente)}
                </Typography>
            }

            <Box border="solid 1px" borderColor="#D4D9EC" borderRadius="15px" 
                px={2} mb={10} mt={2}
            >
                <Table>
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
                            {item.solicitador.nombres + " " + item.solicitador.apellidos} 
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
                    
                    <TableCell sx={{width:"220px",borderBottom: "none"}} align="right">
                        <Controls.Button
                            text="Ver Solicitud"
                            type="submit"
                            onClick={() => { setRecordForEdit(item); setOpenPopupDetalle(true) }}
                            />
                    </TableCell>
                    {
                        fechafin<=now || <>
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
                </Table>
                <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                />
            </Box>
        </>
    )
}
