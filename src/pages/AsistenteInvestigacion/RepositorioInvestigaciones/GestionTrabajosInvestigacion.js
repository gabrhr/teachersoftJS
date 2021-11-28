import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Link, LBox, Grid, Typography, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';


import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportCSV } from '../../../components/PageComponents/ExportCSV';

import Popup from '../../../components/util/Popup'
import Notification from '../../../components/util/Notification';
import ConfirmDialog from '../../../components/util/ConfirmDialog';

/*IMPORTS LOCALES*/ 

import TrabajosInvestigacion from './TrabajosInvestigacion'

/* SERVICES */ 

//import { getHorarios, registerHorario, updateHorario, deleteHorario } from '../../../services/horarioService';

/*ICONS*/

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DetailsIcon from '@mui/icons-material/Details';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DT } from '../../../components/DreamTeam/DT'



//TABLE HEADERS

const tableHeaders = [
//**falta agregar headers
    {
      id: 'cod_publicacion',
      label: 'Código',
      numeric: false,
      sortable: true
    },
    {
      id: 'titulo',
      label: 'Título',
      numeric: false,
      sortable: true
    },
    {
        id: 'nombre',
        label: 'Autor',
        numeric: false,
        sortable: true
    },


    {
        id: 'anho_publicacion',
        label: 'Año',
        numeric: false,
        sortable: false
    },

    {
        id: 'url',
        label: 'Texto Completo',
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


const getTrabajos = async () => {
    
    const trabajos = [];
    /*
    let dataTrabajo = await TrabajoService.getTrabajos();
    dataTrabajo = dataTrabajo ?? [];

    if (dataTrabajo){
        dataTrabajo.map(trabajo => (
            trabajos.push({
                id: trabajo.id.toString(),
                activo: trabajo.activo,
                cod_publicacion: trabajo.cod_publicacion,
                titulo: trabajo.titulo,
                tipo_publicacion: trabajo.tipo_publicacion,
                tipo_referencia: trabajo.tipo_referencia,
                indicador_calidad: trabajo.indicador_calidad,
                anho: trabajo.anho,
                idioma: trabajo.idioma,
                pais: trabajo.pais,
                idAutor: trabajo.persona.id,
                nombreAutor: trabajo.persona.nombre
            })
        ));
    }
    else console.log("No existen datos en Trabajos de investigación");  
    window.localStorage.setItem('listTrabajos',JSON.stringify(dataTrabajo));

    */
    return trabajos;
}



export default function GestionTrabajosInvestigacion() {

    const [openPopup, setOpenPopup] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''});

    // design
    const SubtitulosTable={display:"flex"}
    const PaperStyle={ borderRadius: '20px', mt: 3,pb:4,pt:2, px:2, color:"primary.light", elevation:0}

    const [confirmDialog, setConfirmDialog] = useState(
        { isOpen: false, title: '', subtitle: '' });

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
              return items.filter(x => x.titulo.toLowerCase()
                  .includes(target.value.toLowerCase()))
          }
        })
    }

    useEffect(() => {
        getTrabajos()
        .then (newTrabjo =>{
          setRecords(newTrabjo);
          console.log(newTrabjo);
          setDeleteData(false);
          setCreateData(false);
        });
    }, [recordForEdit, deleteData, createData])

    const addOrEdit = (trabajo, resetForm) => {

        //puede que se modifique, revisar Gestion USuario
        /*
        recordForEdit
        ? TrabajoService.updateTrabajo(trabajo,trabajo.id)
        : TrabajoService.registerTrabajo(trabajo)
        .then(idTrabajo=> {
          if(recordForEdit){
            setRecordForEdit(null);
            setUpdateData(true);}
        })
        */
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
            message: 'Registro de Trabajo Exitoso',
            type: 'success'
          });
          setUpdateData(false);
        }
    }

    const onDelete = (idTrabajo) => {
        // if (!window.confirm('Are you sure to delete this record?'))
        //   return
        setDeleteData(true);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        console.log(records)
        console.log(idTrabajo)
        //console.log(id)
        const nuevaTabla = records.filter(trabajoPorEliminar => trabajoPorEliminar.id !== idTrabajo)
        console.log(nuevaTabla)
        //TrabajoService.deleteTrabajo(idTrabajo);
 
        setNotify({
          isOpen: true,
          message: 'Borrado Exitoso',
          type: 'success'
        })
        
    }

    return (
        <>
          <ContentHeader
            text="Gestión del repositorio de investigación"
            cbo={false}
          />
          <Paper variant="outlined" sx={PaperStyle}>
          <Typography variant="h4" style={SubtitulosTable}>
              Repositorio de Investigación
          </Typography>
          <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
              {/* <Toolbar> */}
              <Controls.Input
                label="Buscar Trabajos de Investigación por Nombre"
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
                title="Añadir Trabajo de Investigación"
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
                          <StyledTableCell >{item.cod_publicacion}</StyledTableCell>
                          <StyledTableCell >{item.titulo}</StyledTableCell>
                        

                          <StyledTableCell >{item.anho}</StyledTableCell>
                      
                          <StyledTableCell >{item.url}</StyledTableCell>
                                                    
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
        </>
    );
}