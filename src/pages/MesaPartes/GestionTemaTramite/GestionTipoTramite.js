import React, { useEffect, useState } from 'react'
// import ContentHeader from '../../../components/AppMain/ContentHeader'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { IconButton, Box, Divider, Paper, TableBody, Grid, TableRow, TableCell,Typography, InputAdornment } from '@mui/material';
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import { useForm, Form } from '../../../components/useForm';
import useTable from "../../../components/useTable";
import { useTheme } from '@mui/material/styles'
import Notification from '../../../components/util/Notification'
import Popup from '../../../components/util/Popup'
import ConfirmDialog from '../../../components/util/ConfirmDialog'
/* fake BackEnd */
 
import DepartamentoService from '../../../services/departamentoService';
import SeccionService from '../../../services/seccionService.js';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 /* ICONS */
 
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
 

/*SERVICES*/ 
import tematramiteService from '../../../services/tematramiteService'; 
import GestionTipoTramiteForm from './GestionTipoTramiteForm';
import tipotramiteService from '../../../services/tipotramiteService'; 
import * as DTLocalServices from '../../../services/DTLocalServices';

import { render } from '@testing-library/react';
import { WindowSharp } from '@mui/icons-material';


const initialFieldValues = {
  temaID: '',
  //nombreTipo:''
}

const tableHeaders = [
   {
        id: 'name',
        label: 'Tipo de Trámite',
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

const getTipoTramite = async (id_tema) => {

  //SE DEBE CAMBIAR ESTA FUNCIÓN. SOLAMENTE ES PARA LA PRUEBA DEL FORMULARIO
  //ESTO DEBIDO A QUE SE CARGA AUTOMÁTICAMENTE CON EL PRIMER ID
  // DE TEMA TRÁMITE
  
  let auxTipos = await tipotramiteService.getTipoTramitexTemaTramite(id_tema);  
  let auxTema = await tematramiteService.getTemaTramite(id_tema);
  
  localStorage.setItem('nombreTema', auxTema? auxTema.nombre:"No seleccionado")
  auxTipos = auxTipos ?? [];
  console.log(auxTipos);
 
  let roles = DTLocalServices.getAllRoles();
  const tipos = [];
  if(auxTipos){
    for (let i = 0; i < auxTipos.length; i++){
      /* console.log(auxTipos[i]);
      console.log(auxTipos[i].id);
      console.log(auxTipos[i].nombre);
      console.log(auxTipos[i].temaID);
      console.log(auxTipos[i].id_tema);
      console.log("id");
      console.log(auxTipos[i].temaTramiteMesaDePartes.id);
      console.log(auxTipos[i].temaTramiteMesaDePartes.nombre);   */
      tipos.push({
            id: auxTipos[i].id.toString(),
            nombre: auxTipos[i].nombre,
            temaTramiteMesaDePartes:{
              id:auxTipos[i].temaTramiteMesaDePartes.id,
              nombre:auxTipos[i].temaTramiteMesaDePartes.nombre
            },
            id_tema: auxTipos[i].temaTramiteMesaDePartes.id
        })
    }
  }else{
    console.log("No existen Tipos");
  }
  /*
  auxTipos.map( tema => (

  tipos.push({
      id: tema.id.toString(),
      nombre: tema.nombre,
      seccion: tema.seccion
  })
  ));
  */
  window.localStorage.setItem('listTipos', JSON.stringify(auxTipos));
  console.log(tipos);
  return tipos;
  
}

  export default function GestionTemaTramiteDetails(props){

    const id_tramite = localStorage.getItem("id_tramite");
    const { idTramite, detail, setDetail} = props;
    const [records, setRecords] = useState([])
    const [deleteData, setDeleteData] = useState(false);
    const [changeData, setChangeData] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })
 

    const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting,
      BoxTbl
    } = useTable(records, tableHeaders, filterFn);
    
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



    useEffect(() => {
      getTipoTramite(id_tramite)
      .then (newTipo =>{
        setRecords(newTipo);
        setDeleteData(false);
        setChangeData(false);
      });
      if (detail != null) {
        // object is not empty
        setDetail(localStorage.getItem("id_tramite"));
        getTipoTramite(idTramite);
        }
      
    }, [recordForEdit,changeData, deleteData, detail])

    const addOrEdit = (tipoTramite, resetForm) => {

      const dataTipoTramite = {
          id: tipoTramite.id,
          nombre: tipoTramite.nombre,
          temaTramiteMesaDePartes: {
            id:tipoTramite.temaTramiteMesaDePartes.id
          },
          id_tema: tipoTramite.id_tema
      }

      //PUede que esta parte sea necesario modificarla
      recordForEdit
          ? tipotramiteService.updateTipoTramite(dataTipoTramite, tipoTramite.id)
          : tipotramiteService.registerTipoTramite(dataTipoTramite)

              
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

    const onDelete = (id_tipo) => {
      setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })

        console.log(id_tipo);
    
        tipotramiteService.deleteTipoTramite(id_tipo);
    
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

    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }

    
    useEffect(() => {
        if (detail != null) {
        // object is not empty
        setDetail(localStorage.getItem("id_tramite"));
        getTipoTramite(idTramite);
        }
    }, [detail])
 
    return(
        <>
         <Paper variant="outlined" sx={PaperStyle}>
            Tema del Trámite: {localStorage.getItem('nombreTema')}
            <Controls.AddButton
              title="Nuevo Tipo de Trámite"
              variant="iconoTexto"
              onClick = {() => {setOpenPopup(true); setRecordForEdit(null)}}
            />
            <BoxTbl>
              <TblContainer>
              <TblHead />
              <TableBody>
                {
                  // API devuelve [].  map se cae.  Llamar 2 veces.
                  // recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (

                    recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                      
                    <StyledTableRow key={item.id}>
                        {console.log(item)}
                      <StyledTableCell>{item.nombre}</StyledTableCell>
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
                            //onDelete(item.id)
                            setConfirmDialog({
                              isOpen: true,
                              title: '¿Eliminar tipo permanentemente?',
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
            <TblPagination />
            </BoxTbl>
          </Paper>
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title={recordForEdit ? "Editar Tipo de Trámite": "Registrar Tipo de Trámite"}
          >
            <GestionTipoTramiteForm
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
