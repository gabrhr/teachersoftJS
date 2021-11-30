import React, {useState, useEffect, useContext} from 'react'
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import useTable from '../../../components/useTable';
import { Controls } from '../../../components/controls/Controls';
import { Grid, InputAdornment, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import NuevaDescargaDocente from './NuevaDescargaDocente';
import Notification from '../../../components/util/Notification';
import moment from 'moment'
import 'moment/locale/es'
import Popup from '../../../components/util/Popup';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import procesoDescargaService from '../../../services/procesoDescargaService';
import tramiteDescargaService from '../../../services/tramiteDescargaService';
import {UserContext} from '../../../constants/UserContext';

moment.locale('es');


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
export default function GestionDescargaDocente() {
    const [openPopup, setOpenPopup] = useState(false)
    const [row, setRow] = useState(false)
    const [records, setRecords] = useState([])
    const [deleteData, setDeleteData] = useState(false)
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState(
        { isOpen: false, title: '', subtitle: '' })
    const {user} = useContext(UserContext)
    let procesoActivo;
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records,tableHeaders, filterFn);
    
    const handleSearch = e => {
        let target = e.target;
        /* React "state object" (useState()) doens't allow functions, only
          * objects.  Thus the function needs to be inside an object. */
        setFilterFn({
          fn: items => {
            if (target.value == "")
              /* no search text */
              return items
            else
              return items.filter(x => x.nombre.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
    }
    function getRow ({...props}){
        //setOpenDetalle(true)
        setRow(props)
    }

    const addOrEdit = async(values, resetForm) => {
        //Service
        console.log(values)
        console.log(recordForEdit)
        let resultado, newTramite, editTramite;
        if(!recordForEdit){
            newTramite = {
                "observacion": values.observacion,
                "procesoDescarga": {
                    "id": 10,
                },
                "tipo_bono": values.tipo_bono,
                "persona_seccion": {
                    "id": 3,
                },
                "persona_departamento": null,
                "departamento": {
                    "id": 3,
                },
            }
            await tramiteDescargaService.registerTramiteDescarga(newTramite)
        }else{
            editTramite = {
                "id": values.id,
                "observacion": values.observacion,
                "procesoDescarga": {
                    "id": 10,
                },
                "tipo_bono": values.tipo_bono,
                "persona_seccion": {
                    "id": 3,
                },
                "persona_departamento": null,
                "departamento": {
                    "id": 3,
                },
            }
            await tramiteDescargaService.updateTramiteDescarga(editTramite)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)    
        setNotify({
          isOpen: true,
          message: recordForEdit ? 'Se ha editado exitosamente' : 'Se ha añadido exitosamente',
          type: 'success'
        })
    }
    const onDelete = (idCiclo) => {
        // if (!window.confirm('Are you sure to delete this record?'))
        //   return

        //Serviceeee
       /*  setDeleteData(true);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        console.log(records)
        console.log(idCiclo)
        //console.log(id)
        const nuevaTabla = records.filter(cicloPorEliminar => cicloPorEliminar.id !== idCiclo)
        console.log(nuevaTabla)
        CicloService.deleteCiclo(idCiclo);
 
        setNotify({
          isOpen: true,
          message: 'Borrado Exitoso',
          type: 'success'
        }) */
    }

    const getTramitesDescargasDocente = async() => {
        procesoActivo = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        console.log("El proceso activo es ", procesoActivo)
        const procesos = await tramiteDescargaService.getTramitesDescarga();
        setRecords(procesos)
    }

    React.useEffect(() => {
        getTramitesDescargasDocente()
        console.log("El docente pertenece al departamento ", user.persona.departamento.id)

    }, [recordForEdit, createData. deleteData, openPopup])
    
    
    return (
        <>
        <ContentHeader text={"Solicitudes de Descarga"} cbo={false} />
        {/* Solicitud actual del año */}
        <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
            <Controls.AddButton
                title="Agregar Nueva Solicitud"
                variant="iconoTexto"
                onClick = {() => {setOpenPopup(true);}}
            />
        </div>
        {/* Solicitud Pasada */}
        <Typography variant="h4" >Lista de Solicitudes de Descarga Pasadas</Typography>

        <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
                {/* <Toolbar> */}
                <Controls.Input
                    label="Buscar Solicitud por Nombre"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                    }}
                    sx={{ width: .75 }}
                    onChange={handleSearch}
                    type="search"
                />
            </div>
            { records.length?
             <>
                <BoxTbl>
                    <TblContainer>
                        {/* <TblHead />  */}
                        <TableBody>
                        {
                        recordsAfterPagingAndSorting().map(item => (
                                <Item item={item} getRow= {getRow}
                                    setOpenPopup={setOpenPopup}
                                    setRecordForEdit={setRecordForEdit}
                                    setConfirmDialog={setConfirmDialog}
                                    onDelete={onDelete}
                                />
                            ))
                        }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </BoxTbl>
             </>
             :
                <BoxTbl>
                    <Grid item xs= {12} rowSpacing={20} align = "center">
                        <Typography variant="h4" color = "secondary">
                                Aún no tiene Solicitudes de Descarga registradas
                        </Typography>
                    </Grid>
                </BoxTbl>

            }
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title= {recordForEdit ? "Editar Solicitud de Descarga": "Nueva Solicitud de Descarga"}
                size="sm"
            >
                <NuevaDescargaDocente 
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification
              notify={notify}
              setNotify={setNotify}
            />
        </>
    )
}


function Item(props){
    const {item,getRow, setOpenPopup,setRecordForEdit, setConfirmDialog, onDelete} = props
    function formatoFecha(fecha){
        if(fecha!=null){
            return (moment.utc(fecha).format('DD MMM YYYY [-] h:mm a'))
        }
    }
    return (
        <>
        
            <TableRow key={item.id}>
                <TableCell sx={{maxWidth:"400px"}}>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Fecha: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {formatoFecha(item.fecha_creacion)}
                    </Typography>
                    <div/>
                    <Typography fontWeight='bold' fontSize={18}>
                         {item.procesoDescarga.nombre}
                    </Typography>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Autor: {item.persona_seccion.nombres + " " + item.persona_seccion.apellidos} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {/* Docente de soli */}
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography display="inline">
                        Resultado de Solicitud:{'\u00A0'}
                    </Typography>
                    <Typography display="inline">
                        {item.resultado === 0 ? "Pendiente" :
                         item.resultado === 1 ? "Aprobado" :
                         "Desaprobado"}
                    </Typography>  
                </TableCell>
                <TableCell>
                    <Controls.ActionButton
                        color="warning"
                        onClick={ () => {setOpenPopup(true);setRecordForEdit(item);}}
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
                        

        </>
    );
}

