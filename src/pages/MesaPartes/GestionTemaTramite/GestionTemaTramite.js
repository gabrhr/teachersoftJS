// URL: localhost:3000/as/gestiontematramite/gestiontematramite 

import React, { useState, useEffect } from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { IconButton, Toolbar } from '@mui/material';
import { Box, Divider, Paper, TableBody, Grid, TableRow, TableCell,Typography, InputAdornment } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import Notification from '../../../components/util/Notification'
import Popup from '../../../components/util/Popup'
import ConfirmDialog from '../../../components/util/ConfirmDialog'
import useTable from "../../../components/useTable";
import { useForm, Form } from '../../../components/useForm';

/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

/*SERVICES*/ 
import tematramiteService from '../../../services/tematramiteService';
import * as DTLocalServices from '../../../services/DTLocalServices';
import GestionTemaTramiteForm from './GestionTemaTramiteForm';
import GestionTemaTramiteDetails from './GestionTemaTramiteDetails';
import { render } from '@testing-library/react';
import { WindowSharp } from '@mui/icons-material';


let selectedID = 1;

const initialFieldValues = {
    seccionID: '',
}

  const tableHeaders = [
    {
        id: 'name',
        label: 'Nombre del tema de Trámite',
        numeric: false,
        sortable: true
    },
    {
        id: 'seccion',
        label: 'Seccion',
        numeric: false,
        sortable: true
    }
]


const getTemaTramite = async () => {

    let auxTemas = tematramiteService.getTemaTramites();  
    auxTemas = auxTemas ?? [];
    console.log(auxTemas);
    var str,std,stl,ape1,ape2
    let roles = DTLocalServices.getAllRoles();
    const temas = [];
    
    for (let i = 0; i < auxTemas.length; i++){
        temas.push({
            id: auxTemas[i].id.toString(),
            nombre: auxTemas[i].nombre,
            seccion:{
                id : auxTemas[i].seccion ? auxTemas[i].seccion.id : '',
                nombre : auxTemas[i].seccion ? auxTemas[i].seccion.nombre : '',
            },
            idSeccion: auxTemas[i].seccion ? auxTemas[i].seccion.id : '',
            nombreSeccion: auxTemas[i].seccion ? auxTemas[i].seccion.nombre : '',
        })
    }

    /*
    auxTemas.map( tema => (

    temas.push({
        id: tema.id.toString(),
        nombre: tema.nombre,
        seccion: tema.seccion
    })
    ));
    */
    window.localStorage.setItem('listTemas', JSON.stringify(auxTemas));
    return temas;
}



export default function GestionTemaTramite() {

    const [records, setRecords] = useState([])
    const [deleteData, setDeleteData] = useState(false);
    const [changeData, setChangeData] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })
    const [detail, setDetail] = useState(false)
    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        BoxTbl
      } = useTable(records, tableHeaders, filterFn);

      const {
        values,
        handleInputChange
      } = useForm(initialFieldValues);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
          fn: items => {
            if (target.value === "")
              /* no search text */
              return items
            else
              return items.filter(x => x.nombre.toLowerCase()
                .includes(target.value.toLowerCase()))
          }
        })
    }

    const handleSearchSeccion = e => {
        let target = e.target;
        handleInputChange(e)
        setFilterFn({
           fn: items => {
            //4 es el valor escrito en bruto para listar todo
            if (target.value == "" || items.length === 0)
              return items
            else
               return items.filter(x => x.nombreSeccion
                   .includes(target.value))
          }
        })
    }

    useEffect(() => {
        getTemaTramite()
        .then (newTema =>{
          setRecords(newTema);
          setDeleteData(false);
          setChangeData(false);
        });
        
      }, [recordForEdit,changeData, deleteData])
 
    const addOrEdit = (temaTramite, resetForm) => {

        const dataTemaTramite = {
            id: temaTramite.id,
            nombre: temaTramite.nombre,
            seccion: {
                id: temaTramite.seccion.id,
                nombre: temaTramite.seccion.nombre
              } 
        }

        //PUede que esta parte sea necesario modificarla
        recordForEdit
            ? tematramiteService.updateTemaTramite(dataTemaTramite, temaTramite.id)
            : tematramiteService.registerTemaTramite(dataTemaTramite)

                
        setOpenPopup(false)
        resetForm()
        setChangeData(true);

        setNotify({
            isOpen: true,
            message: 'Registro de Cambios Añadidos',
            type: 'success'
        })
    }

    /* open object in a pop up (for edit) */
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    
    const onDelete = (id_tramite) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
          })
 
          console.log(id_tramite)
      
          tematramiteService.deleteTemaTramite(id_tramite);
      
          //window.location.replace('');
          /*DTLocalServices.getUsers().then((response) => {
            setRecords(response.data)
            console.log(response.data);
          });*/
          //setRecords(DTLocalServices.getAllPersonas())
          setDeleteData(true);
          setNotify({
            isOpen: true,
            message: 'Borrado Exitoso',
            type: 'success'
          })
    }



    const onView = (id_tramite) => {
  
        
        selectedID = id_tramite;
        localStorage.setItem("id_tramite", id_tramite);
        console.log( 'Padre:  ' + id_tramite);
        setDetail(true);
        //this.forceUpdate();
          //tematramiteService.deleteTemaTramite(id_tramite);
        
   
    }

    /*Styles*/ 
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    const SubtitulosTable = { display: "flex" }

    return (
        <>
          <ContentHeader
            text="Gestionar Tema de Trámites"
            cbo={false}
          />  
         <Paper variant="outlined" sx={PaperStyle}>
         <Grid container
          spacing={2}
        >
        <Grid item xs={8} md={8} mb={8}>
            <Typography variant="h4" style={SubtitulosTable} >
            Tipo de Trámite
            </Typography>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
            {/* <Toolbar> */}
            <Controls.Input
                label="Buscar por tipo de trámite"
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                )
                }}
                sx={{ width: .75}}
                onChange={handleSearch}
                type="search"
            />
            <Controls.AddButton
                title="Nuevo Tema Trámite"
                variant="iconoTexto"
                onClick = {() => {setOpenPopup(true); setRecordForEdit(null)}}
            />
            </div>
            <BoxTbl>
          <TblContainer>
            <TblHead />
            <TableBody>
                {
                    console.log(recordsAfterPagingAndSorting())
                }
              {
                // API devuelve [].  map se cae.  Llamar 2 veces.
                // recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (

                  recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                    
                  <StyledTableRow key={item.id}>
                      {console.log(item)}
                    <StyledTableCell>{item.nombre}</StyledTableCell>
                    <StyledTableCell>{item.seccion.nombre}</StyledTableCell>
                    <StyledTableCell>
                      <Controls.ActionButton
                        color="warning"
                        onClick={ () => {openInPopup(item)}}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <IconButton aria-label="delete">
                        <DeleteIcon
                        color="warning"
                        onClick={() => {
                          onDelete(item.id)
                          setConfirmDialog({
                            isOpen: true,
                            title: '¿Eliminar tema permanentemente?',
                            subTitle: 'No es posible deshacer esta accion',
                            onConfirm: () => {onDelete(item.id)}
                          })
                        }}/>
                      </IconButton>
                      <IconButton aria-label="view">
                        <ViewHeadlineIcon
                        color="warning"
                        onClick={() => {
                          onView(item.id)
                        }}/>
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </TblContainer>
          <TblPagination />
        </BoxTbl>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
        <Grid item xs={3.5} md={3.5} mb={4}>
            <Typography variant="h4" style={SubtitulosTable} >
                    Detalles del Tema de Trámite
            </Typography>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}/>
            <GestionTemaTramiteDetails idTramite={selectedID} detail = {detail} setDetail = {setDetail}/>
 
        </Grid>
      </Grid>
      </Paper>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={recordForEdit ? "Editar Tema Trámite": "Registrar Tema Trámite"}
      >
        {/* <EmployeeForm /> */}
        <GestionTemaTramiteForm
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
