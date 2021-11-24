import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import AgregarEditarCiclo from './AgregarEditarCiclo'
import Notification from '../../../components/util/Notification'
import ConfirmDialog from '../../../components/util/ConfirmDialog';

 /*services*/
 import CicloService from '../../../services/cicloService.js';
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import cicloService from '../../../services/cicloService';
import * as employeeService from '../../../services/employeeService'
import { Form } from '../../../components/useForm'

/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

//TABLE HEADERS

const tableHeaders = [

    {
      id: 'anho',
      label: 'Año',
      numeric: false,
      sortable: true
    },
    {
      id: 'periodo',
      label: 'Periodo',
      numeric: false,
      sortable: true
    },
    {
      id: 'fechaInicio',
      label: 'Fecha de Inicio',
      numeric: false,
      sortable: false
    },
    {
      id: 'fechaFin',
      label: 'Fecha Fin',
      numeric: false,
      sortable: false
    },
    {
      id: 'actions',
      label: '',
      numeric: false,
      sortable: false
    }
]

const getCiclos = async () => {

    const ciclos = [];
 
    
    let dataCiclo = await CicloService.getCiclos();
    dataCiclo = dataCiclo ?? [];

    if (dataCiclo){
        dataCiclo.map(ciclo => (
            ciclos.push({
                id: ciclo.id.toString(),
                activo: ciclo.activo,
                fechaCreacion: ciclo.fecha_creacion,
                fechaModificacion: ciclo.fecha_modificacion,
                anho: ciclo.anho,
                periodo: ciclo.periodo,
                fechaInicio: ciclo.fecha_inicio,
                fechaFin: ciclo.fecha_fin
            })
        ));
    }
    else console.log("No existen datos en Ciclos");
    
    window.localStorage.setItem('listCiclos',JSON.stringify(dataCiclo));
  

    return ciclos;
}

export default function GestionCiclo() {

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
        getCiclos()
        .then (newDep =>{
          setRecords(newDep);
          console.log(newDep);
          setDeleteData(false);
          setCreateData(false);
        });
    }, [recordForEdit, deleteData, createData])

    const addOrEdit = (ciclo, resetForm) => {
        recordForEdit
        ? CicloService.updateCiclo(ciclo,ciclo.id)
        : CicloService.registerCiclo(ciclo)
        .then(idCiclo=> {
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
            message: 'Registro de Ciclo Exitoso',
            type: 'success'
          });
          setUpdateData(false);
        }
    }

    const onDelete = (idCiclo) => {
        // if (!window.confirm('Are you sure to delete this record?'))
        //   return
        setDeleteData(true);
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
        })
    }

    return (
        <>
          <ContentHeader
            text="Gestión de Ciclos Universitarios"
            cbo={false}
          />
          <Paper variant="outlined" sx={PaperStyle}>
            <Typography variant="h4" style={SubtitulosTable}>
              Ciclos
            </Typography>
            <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
              {/* <Toolbar> */}
              <Controls.Input
                label="Buscar Ciclos por Nombre"
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
                title="Nuevo Ciclo"
                variant="iconoTexto"
                onClick = {() => {setOpenPopup(true); setRecordForEdit(null)}}
              />
              {/* </Toolbar> */}
            </div>
            <BoxTbl>
              <TblContainer>
                <TblHead />
                <TableBody>
                    {
                     recordsAfterPagingAndSorting().map(item => (

                        <StyledTableRow key={item.id}>
                          <StyledTableCell align="center-left">{item.anho}</StyledTableCell>
                          <StyledTableCell align="center">{item.periodo}</StyledTableCell>
                          <StyledTableCell align="center-left">
                              {
                                item.fechaInicio.slice(8,10)
                                +'/'
                                +item.fechaInicio.slice(5,7)
                                +'/'
                                +item.fechaInicio.slice(0,4)
                              }
                          </StyledTableCell>
                          <StyledTableCell align="center-left">
                              {
                                item.fechaFin.slice(8,10)
                                +'/'
                                +item.fechaFin.slice(5,7)
                                +'/'
                                +item.fechaFin.slice(0,4)
                              }
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
                                title: '¿Eliminar ciclo permanentemente?',
                                subTitle: 'No es posible deshacer esta accion',
                                onConfirm: () => {onDelete(item.id)}
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
                title= {recordForEdit ? "Editar Ciclo": "Nuevo Ciclo"}
            >
              <AgregarEditarCiclo
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
    )

}
