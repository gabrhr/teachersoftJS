import React, {useState} from 'react'
import useTable from '../../../../components/useTable'
import { Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider } from '@mui/material'
import { Controls } from '../../../../components/controls/Controls'
import Popup from '../../../../components/util/Popup'
import ModalDetalleSolicitudDescarga from './ModalDetalleSolicitudDescarga'
import Notification from '../../../../components/util/Notification'

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

function Item(props){
    const {item,setOpenDetalle} = props
    return (
        <>
            <TableRow>
                <TableCell sx={{minWidth:"200px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.fecha_enviado}
                    </Typography>
                    <div/>
                    <Typography fontWeight='bold' fontSize={18}>
                        {item.asunto}
                    </Typography>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Seccion: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.seccion.nombre}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Autor: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.solicitador.fullName} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Estado: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.estado} 
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Nombre del proceso: {'\u00A0'} 
                    </Typography>
                    <Typography fontWeight='bold' fontSize={16}>
                        {item.proceso.nombre}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes recibidas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.solicitudes_recibidas} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes enviadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.solicitudes_enviadas} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes aprobadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.solicitudes_aprobadas} 
                    </Typography>
                </TableCell>
                <TableCell sx={{maxWidth:"300px"}}>
                    <Controls.Button
                        text="Detalle"
                        onClick={()=>{setOpenDetalle(true)}} 
                    />
                </TableCell>
            </TableRow>
        </>

    );
}

export default function ListaSolicitudes({seccion}){

    const [records, setRecords] = useState([
        {
            fecha_enviado: '1/1/1',
            asunto: 'AYUDA',
            seccion: {
                nombre: 'Ingeniería Informática'
            },
            solicitador: {
                fullName: 'Yo'
            },
            estado: 'No atendido',
            proceso: {
                nombre: 'Proceso 1'
            },
            solicitudes_recibidas: 10,
            solicitudes_enviadas: 8,
            solicitudes_aprobadas: 1
        }
    ])

    const [openDetalle, setOpenDetalle] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    /* de gestion de ciclo */
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);

    const addOrEdit = async (values, resetForm) => {
        //Service
        let ciclo, procesoNew, procesoEdit;
        
        if(recordForEdit === null){
            console.log("Se crea un ")
        }else{
            console.log("Se edita un ")
        }
        resetForm()
        setRecordForEdit(null)
        setNotify({
            isOpen: true,
            message: 'Se ha añadido exitosamente',
            type: 'success'
        })
    }

    React.useEffect(() => {
        //Service
    }, [recordForEdit, createData, openDetalle])


    return(
        <>
            <Grid>
                <Typography fontWeight="550" fontSize="20px" sx={{color:"primary.light", paddingTop: '1%'}}>
                    Solicitudes recibidas: {`${records.length}`}
                </Typography>
            </Grid>
            <BoxTbl>
                <TblContainer>
                    <TableBody>
                        {
                        recordsAfterPagingAndSorting().map((item,index) => (
                                <Item key={index} item={item}
                                setOpenDetalle={setOpenDetalle}
                        />
                        ))
                    }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </BoxTbl>
            <Popup
                openPopup={openDetalle}
                setOpenPopup={setOpenDetalle}
                title= {`Solicitud de descarga - Sección ${seccion}`}
                size="md"
            >
               <ModalDetalleSolicitudDescarga setOpenDetalle = {setOpenDetalle} /*guardarSolicitud = {guardarSolicitud}*//>
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}