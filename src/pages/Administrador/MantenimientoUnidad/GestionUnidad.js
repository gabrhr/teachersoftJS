import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment, Typography } from '@mui/material';

/*Local y Services*/ 
import AgregarEditarUnidad from './AgregarEditarUnidad'
import Notification from '../../../components/util/Notification'
import ConfirmDialog from '../../../components/util/ConfirmDialog';
import UnidadService from '../../../services/unidadService.js';
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';

/* ICONS */
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';


const tableHeaders = [
    /*{
      id: 'id',
      label: 'UnidadID',
      numeric: true,
      sortable: true
    },
    */
    {
      id: 'nombre',
      label: 'Nombre',
      numeric: false,
      sortable: true
    },
    {
      id: 'fechaCreacion',
      label: 'Fecha de creación',
      numeric: false,
      sortable: true
    },
    {
      id: 'fechaModificacion',
      label: 'Última Modificación',
      numeric: false,
      sortable: true
    },
    {
      id: 'actions',
      label: '',
      numeric: false,
      sortable: false
    }
]


const getUnidades = async () => {
  
    let dataUni = await UnidadService.getUnidades();
    dataUni = dataUni ?? []  
 
    const unidades = [];
    if(dataUni){
      dataUni.map(unid => (
        unidades.push({
          id: unid.id.toString(),
          activo: unid.activo,
          nombre: unid.nombre,
          fechaModificacion: unid.fecha_modificacion,
          fechaCreacion:unid.fecha_creacion,
        })
      ));
    }
    else console.log("No existen datos en Unidades");
    window.localStorage.setItem('listUnidades',JSON.stringify(dataUni));
    return unidades;
  }

export default function GestionUnidad() {

    const [openPopup, setOpenPopup] = useState(false)
    const [deleteData, setDeleteData] = useState(false)
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', mt: 3,pb:4,pt:2, px:2, color:"primary.light", elevation:0}

    const [confirmDialog, setConfirmDialog] = useState(
        { isOpen: false, title: '', subtitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
    } = useTable(records, tableHeaders, filterFn);

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

    useEffect(() => {
        getUnidades()
        .then (newUnid =>{
          setRecords(newUnid);
          console.log(newUnid);
          setDeleteData(false);
          setCreateData(false);
        });
    }, [recordForEdit, deleteData, createData])


    const addOrEdit = (unidad, resetForm) => {
        recordForEdit
        ? UnidadService.updateUnidad(unidad,unidad.id)
        : UnidadService.registerUnidad(unidad)
        .then(idUnidad=> {
          if(recordForEdit){
            setRecordForEdit(null);
            setUpdateData(true);}
        })
        //window.location.replace('');
        setOpenPopup(false)
        resetForm()
        setCreateData(true);
        console.log(updateData);
        console.log(createData);
        if(!updateData){
          setNotify({
            isOpen: true,
            message: 'Cambios Guardados Exitosamente',
            type: 'success'
          });
          setUpdateData(false);
        } else {
          setNotify({
            isOpen: true,
            message: 'Registro de Facultad Exitoso',
            type: 'success'
          });
          setUpdateData(false);
        }
    }

    const onDelete = (idUnidad) => {
        // if (!window.confirm('Are you sure to delete this record?'))
        //   return
        setDeleteData(true);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        console.log(records)
        console.log(idUnidad)
        //console.log(id)
        const nuevaTabla = records.filter(unidadPorEliminar => unidadPorEliminar.id !== idUnidad)
        console.log(nuevaTabla)
        UnidadService.deleteUnidad(idUnidad);
 
        setNotify({
          isOpen: true,
          message: 'Borrado Exitoso',
          type: 'success'
        })
    }

    return(
        <>
          <ContentHeader
            text="Gestión de Facultades y Unidades Académicas"
            cbo={false}
          />
          <Paper variant="outlined" sx={PaperStyle}>
            <Typography variant="h4" style={SubtitulosTable}>
              Unidades Académicas
            </Typography>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
              {/* <Toolbar> */}
              <Controls.Input
                label="Buscar Unidades Académicas por Nombre"
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
              <Controls.AddButton
                title="Nueva Facultad"
                variant="iconoTexto"
                onClick = {() => {setOpenPopup(true); setRecordForEdit(null)}}
              />
            </div>
            <BoxTbl>
              <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                            <StyledTableRow key={item.id}>
                              <StyledTableCell>{item.nombre}</StyledTableCell>
                              <StyledTableCell align="left">
                                {"Hora: "
                                +item.fechaCreacion.slice(11,19)
                                +"   -  Fecha: "
                                +item.fechaCreacion.slice(8,10)
                                +'/'
                                +item.fechaCreacion.slice(5,7)
                                +'/'
                                +item.fechaCreacion.slice(0,4)}
                               </StyledTableCell>
                               <StyledTableCell align="left">
                                {"Hora: "
                                +item.fechaModificacion.slice(11,19)
                                +"   -  Fecha: "
                                +item.fechaModificacion.slice(8,10)
                                +'/'
                                +item.fechaModificacion.slice(5,7)
                                +'/'
                                +item.fechaModificacion.slice(0,4)}
                               </StyledTableCell>
                               <StyledTableCell>
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
                                        title: '¿Eliminar departamento permanentemente?',
                                        subTitle: 'No es posible deshacer esta accion',
                                        onConfirm: () => {onDelete(item.id)
                                    }
                              })
                            }}/>
                          </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>

                        ))
                    }
                </TableBody>
              </TblContainer>
            </BoxTbl>

          </Paper>

          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title= {recordForEdit ? "Editar Departamento": "Nuevo Departamento"}
          >
            <AgregarEditarUnidad
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
                setOpenPopup={setOpenPopup}
            />
          </Popup>
          <Notification
            notify={notify}
            setNotify={setNotify}
          />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
    );

}