import React, {useState} from 'react'
import useTable from '../../../../components/useTable'
import { Grid, InputAdornment, Box, TableBody, TableCell, TableRow, Typography, Divider, Autocomplete, TextField } from '@mui/material'
import { Controls } from '../../../../components/controls/Controls'
import Popup from '../../../../components/util/Popup'
import ModalDetalleSolicitudDescarga from './ModalDetalleSolicitudDescarga'
import Notification from '../../../../components/util/Notification'
import SearchIcon from '@mui/icons-material/Search';
import tramiteSeccionDescargaService from '../../../../services/tramiteSeccionDescargaService'
import seccionService from '../../../../services/seccionService'
import moment from 'moment'
import 'moment/locale/es'
import { DT } from '../../../../components/DreamTeam/DT'
import { useForm } from '../../../../components/useForm'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

const initialFieldValues = {
    /* PROCESO */
    seccionID: 0,
    estadoID: 0
}

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
function getEstadoSolicitud() {
    return ([
        { id: 0, title: 'Todos los estados', icon: <div style={{ mr: 2 }} /> },
        { id: 1, title: 'Pendiente', icon: <AccessTimeOutlinedIcon sx={{ color: "#E9D630", mr: 2 }} /> },
        { id: 2, title: 'Atendido', icon: <TaskAltOutlinedIcon sx={{ color: "#43DB7F", mr: 2 }} /> },
    ])
}

function Item(props){
    const {item,setOpenDetalle, setRecordForView} = props
    return (
        <>
            <TableRow>
                <TableCell sx={{minWidth:"200px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {moment.utc(item.fecha_creacion).format('DD MMM YYYY [-] h:mm a')}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Proceso: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" fontWeight='bold' fontSize={16}>
                        {item.procesoDescarga.nombre}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Seccion: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.solicitador.seccion.nombre}
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Autor: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.solicitador.apellidos + ", " + item.solicitador.nombres} 
                    </Typography>
                </TableCell>
                <TableCell>
                    <DT.Etiqueta
                        type={item.resultado === 0 ? "pendiente" :
                        "atendido"}
                        sx={{ marginBottom:"4px"}}
                    />
                </TableCell>
                <TableCell>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes enviadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.cantidad_solicitada} 
                    </Typography>
                    <div/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Solicitudes aprobadas: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.cantidad_aprobada} 
                    </Typography>
                </TableCell>
                <TableCell sx={{maxWidth:"300px"}}>
                    <Controls.Button
                        text={item.resultado === 0 ?"Detalle":"Aprobar"}
                        onClick={()=>{setOpenDetalle(true);setRecordForView(item)}} 
                    />
                </TableCell>
            </TableRow>
        </>

    );
}

export default function ListaSolicitudes({seccion}){
    const [recordForView, setRecordForView] = useState(null)
    const [records, setRecords] = useState([])
    const [secciones, setSecciones] = useState([])

    const [openDetalle, setOpenDetalle] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    /* de gestion de ciclo */
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);

    const addOrEdit = async (values, resetForm) => {
        //Service
        
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

    const getTramitesSeccionActivos = async() => {
        const request = await tramiteSeccionDescargaService.getTramitesSeccionDescarga()
        const secciones = await seccionService.getSecciones()
        console.log(request)
        setSecciones(secciones)
        setRecords(request)
    }

    React.useEffect(() => {
        getTramitesSeccionActivos()
    }, [recordForEdit, createData, openDetalle])

    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
           fn: items => {
             if (target.value == "" || items.length === 0)
               /* no search text */
               return items
             else
               return items.filter(x => x.procesoDescarga.nombre.toLowerCase()
                   .includes(target.value.toLowerCase()))
           }
        })
    }
    const [valueFecha, setValueFecha] = React.useState([null, null]);

    React.useEffect(() => {
        const fechaIni = moment(valueFecha[0]).format('DD/MM/YYYY')
        const fechaFin = moment(valueFecha[1]).format('DD/MM/YYYY')
        setFilterFn({
          fn: items => {
            if (valueFecha[0]== null && valueFecha[1] == null)
              return items
            if (valueFecha[1]==null)
              return items.filter(x => 
                fechaIni <= moment(x.fecha_creacion).format('DD/MM/YYYY')
              )
            else{
              return items.filter((x) => fechaIni <= moment(x.fecha_creacion).format('DD/MM/YYYY') &&
                  moment(x.fecha_creacion).format('DD/MM/YYYY') <= fechaFin
              )
            }
          }
        })
    }, [valueFecha])

    const handleSearchSeccion = e =>{
        let target = e.target;
          /* React "state object" (useState()) doens't allow functions, only
            * objects.  Thus the function needs to be inside an object. */
        handleInputChange(e)
        setFilterFn({
          fn: items => {
             if (target.value == 0 || items.length === 0)
               return items
             else
               return items.filter(x => x.solicitador.seccion.id == target.value)
  
          }
        })
      } 
      const handleSearchEstados = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        handleInputChange(e)
        setFilterFn({
          fn: items => {
             if (target.value == 0 || items.length === 0)
               /* no search text */
               return items
             else
               return items.filter(x => x.resultado
                   .includes(target.value))
          }
        })
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    return(
        <>
        <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                <div style={{ width: "650px", marginRight: "50px" }}>
                    <Controls.Input
                        label="Buscar Solicitud por Nombre"
                        sx={{ width: 1 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                        onChange={handleSearch}
                        type="search"
                    />
                </div>
                <div style={{ width: "360px", marginRight: "50px" }}>
                    <Controls.RangeTimePicker 
                        value = {valueFecha}
                        setValue= {setValueFecha}
                    /> 
                </div>
            </div>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                <div style={{ width: "360px", marginRight: "50px" }}>
                    <Controls.Select
                        name="seccionID"
                        label="Sección"
                        value={values.seccionID}
                        onChange={handleSearchSeccion}
                        options={[{id: 0, nombre: "Todos las secciones"}]
                            .concat(secciones
                            .sort((x1, x2) => x1.nombre - x2.nombre))}
                        MenuProps={MenuProps}
                    />
                </div>
                <div style={{ width: "260px", marginRight: "50px" }}>
                    <Controls.Select
                        name="estadoID"
                        label="Estados"
                        value={values.estadoID}
                        onChange={handleSearchEstados}
                        options={getEstadoSolicitud()}
                    />
                </div>
            </div>

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
                                setRecordForView = {setRecordForView}
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
                title= {`Solicitud de descarga - Sección ${recordForView?.solicitador?.seccion.nombre}`}
                size="md"
            >
               <ModalDetalleSolicitudDescarga setOpenDetalle = {setOpenDetalle} recordForView = {recordForView}/>
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}