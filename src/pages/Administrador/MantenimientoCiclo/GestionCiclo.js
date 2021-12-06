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
      id: 'fecha_inicio',
      label: 'Fecha de Inicio',
      numeric: false,
      sortable: false
    },
    {
      id: 'fecha_fin',
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
                fecha_inicio: ciclo.fecha_inicio,
                fecha_fin: ciclo.fecha_fin
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
              return items.filter(x => x.anho.toString()
                  .includes(target.value.toString()))
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

      try{
        recordForEdit
        ? CicloService.updateCiclo(ciclo,ciclo.id)
        : CicloService.registerCiclo(ciclo)
        .then(idCiclo=> {
          if(recordForEdit){
            setRecordForEdit(null);
            setUpdateData(true);
          }
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
      catch(error){
        setNotify({
          isOpen: true,
          message: 'Cambios Guardados Exitosamente',
          type: 'error'
        });
        setUpdateData(false);
        setOpenPopup(false)
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
                label="Buscar por Ciclo"
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
                {records.length > 0 ? 
                     recordsAfterPagingAndSorting().map(item => (

                        <StyledTableRow key={item.id}>
                          {/* NO SE SI ESTO ERA NECESARIO (MERGE CONFLICT MANUEL->DEVELOP) Dec02 */}
                        
                          {/* <StyledTableCell >{item.anho}</StyledTableCell>
                          <StyledTableCell >{item.periodo}</StyledTableCell> */}
                          {/* <StyledTableCell > */}
                          <StyledTableCell align="center-left">{item.anho}</StyledTableCell>
                          <StyledTableCell align="center-left">
                            {
                              item.periodo == 0 ? "Verano" : 
                              item.periodo == 1 ? "Primero" : "Segundo"
                            }
                          </StyledTableCell>
                          <StyledTableCell align="center-left">
                              {
                                item.fecha_inicio != null ?
                                item.fecha_inicio.slice(8,10)
                                +'/'
                                +item.fecha_inicio.slice(5,7)
                                +'/'
                                +item.fecha_inicio.slice(0,4)
                                : " "
                              }
                          </StyledTableCell>
                          <StyledTableCell>
                              {
                                item.fecha_fin != null ?

                                item.fecha_fin.slice(8,10)
                                +'/'
                                +item.fecha_fin.slice(5,7)
                                +'/'
                                +item.fecha_fin.slice(0,4)
                                : " "
                              }
                          </StyledTableCell>
                          <StyledTableCell align = "right">
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
                     )):
                     (
                      <Typography variant="body1" color="primary.light" style={SubtitulosTable}>    
                          No se han ingresado Ciclos 
                      </Typography>  
                      )
                  }
                </TableBody>
              </TblContainer>
            </BoxTbl>
          </Paper>
          <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title= {recordForEdit ? "Editar Ciclo": "Nuevo Ciclo"}
                size="sm"
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
