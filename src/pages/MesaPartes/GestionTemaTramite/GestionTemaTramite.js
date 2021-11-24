// URL: http://localhost:3000/secretaria/mantenimiento/temaTramite

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
import { makeStyles } from '@mui/styles';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

/*SERVICES*/ 
import temaTramiteService from '../../../services/tematramiteService';
import tipoTramiteService from '../../../services/tipotramiteService';
import * as DTLocalServices from '../../../services/DTLocalServices';
import GestionTemaTramiteForm from './GestionTemaTramiteForm';
import GestionTipoTramite from './GestionTipoTramite';
import { render } from '@testing-library/react';
import { WindowSharp } from '@mui/icons-material';


let selectedID = 1;

const useStyles = makeStyles(theme => ({
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  visible: {
    transitionDuration: "0.0s",
    display: "none"
  },
  hidden: {
    transitionDuration: "0.0s"
  },
  collapsible: { transitionDuration: "0.0s" }
}));

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
    },
    {
      id: 'acciones',
      label: '',
      numeric: false,
      sortable: false
    }
]


const getTemaTramites = async () => {

    let auxTemas = await temaTramiteService.getTemaTramites();  
    auxTemas = auxTemas ?? [];
    //console.log(auxTemas);
    var str,std,stl,ape1,ape2
    let roles = DTLocalServices.getAllRoles();
    const temas = [];
    if(auxTemas){
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
    }else {
      console.log("No existen Temas")
    }
    //Probando Funciones
    //let var1= await temaTramiteService.getTemaTramite(2);
    //console.log(var1);
    //let var2 = await temaTramiteService.getTemaTramitexSeccion(3);
    //console.log(var2);
    //let var3 = await tipoTramiteService.getTipoTramites();
    //console.log(var3);
    //let var4 = await tipoTramiteService.getTipoTramite(2);
    //console.log(var4);
    //let var5 = await tipoTramiteService.getTipoTramitexTemaTramite(2);
    //console.log(var5);
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
    const [detail, setDetail] = useState(false);
    const [isViewActivityMode, setIsViewActivityMode] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedRow, setSelectedRow] = useState(50) //Se tiene que cambiar

    const classes = {
      ...useStyles()
    };
    
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
        getTemaTramites()
        .then (newTema =>{
          setRecords(newTema);
          setDeleteData(false);
          setChangeData(false);
        });
        
      }, [recordForEdit,changeData, deleteData])

      useEffect(() => {
        setIsViewActivityMode(prev => !prev);
      }, [isVisible]);
 

      const handleChange = (id_tramite) => {
        if (isVisible){
          setIsVisible(prev => !prev);
        }
        else if (id_tramite == localStorage.getItem("id_tramite")){
          setIsVisible(prev => !prev);
        }
        
      };
      
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
            ? temaTramiteService.updateTemaTramite(dataTemaTramite, temaTramite.id)
            : temaTramiteService.registerTemaTramite(dataTemaTramite)

                
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
          let pos = records.map(function(e) { return e.id; }).indexOf(id_tramite);
          records.splice(pos,1);
          temaTramiteService.deleteTemaTramite(id_tramite);
      
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
        //let auxTema = await temaTramiteService.getTemaTramites();  
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
         
        <Grid item xs={isViewActivityMode ? 6 : 12} className={classes.collapsible} >
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
                    
                  <StyledTableRow key={item.id}
                  backCl = {(selectedRow === records.indexOf(item))?'#FFF':'#FFF' } 
                  sx={(selectedRow === records.indexOf(item))?{backgroundColor: '#E9ECF8', '&:hover': {
                    backgroundColor: '#E9ECF8',}}:{'&:hover': {backgroundColor: '#E9ECF8',}}}
                  >
              
                      
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
                          //Se borra después de Confirmar
                          //onDelete(item.id)
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
                          handleChange(item.id);
                          onView(item.id);
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
        <Grid item xs={5.5} className={isVisible ? classes.visible : classes.hidden} >
            <Typography variant="h4" style={SubtitulosTable} >
                    Detalles del Tema de Trámite
            </Typography>
            <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}/>
            <GestionTipoTramite idTramite={selectedID} detail = {detail} setDetail = {setDetail}/>
 
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
