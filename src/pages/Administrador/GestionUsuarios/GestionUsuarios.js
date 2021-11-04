import React, { useState, useEffect } from 'react'
import { IconButton, InputAdornment, Toolbar } from '@mui/material';
import { Box, Paper, TableBody, TableRow, TableCell } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { useForm, Form } from '../../../components/useForm';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import GestionUsuariosForm from './GestionUsuariosForm'
import { StyledTableCell, StyledTableRow } from '../../../components/controls/StyledTable';
import Notification from '../../../components/util/Notification'
import ConfirmDialog from '../../../components/util/ConfirmDialog'
/* SERVICES */
import personaService from '../../../services/personaService'
import * as DTLocalServices from '../../../services/DTLocalServices';
import userService from '../../../services/userService';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const initialFieldValues = {
  seccionID: '',
}

const tableHeaders = [
  /*{
    id: 'fullName',
    label: 'Nombre Completo',
    numeric: false,
    sortable: true
  },*/
  {
    id: 'dni',
    label: 'DNI',
    numeric: false,
    sortable: true
  },
  {
    id: 'email',
    label: 'Correo',
    numeric: false,
    sortable: true
  },
  {
    id: 'rol',
    label: 'rol',
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
    id: 'departamento',
    label: 'Departamento',
    numeric: false,
    sortable: true
  },
  {
    id: 'actions',
    label: 'Actions',
    numeric: false,
    sortable: false
  }
]

const getUsuario = async () => {

  const usuario = await userService.getUsuarios();
  console.log(usuario)
  var str
  let roles = DTLocalServices.getAllRoles();
  const usuarios = [];
  usuario.map(usr => (
    str = usr.persona.apellidos.split(" "),
    usuarios.push({
      id: usr.id.toString(),
      idPersona: usr.persona.id.toString(),
      nombre: usr.persona.nombres,
      apellidoPaterno: str[0],
      apellidoMaterno: str[1],
      documento: usr.persona.numero_documento,
      correo: usr.persona.correo_pucp,
      rolName: roles.find(r => r.id === usr.persona.tipo_persona).nombre,
      rol: usr.persona.tipo_persona,
      departamento: {
        id: usr.persona.departamento ? usr.persona.departamento.id : '',
        nombre: usr.persona.departamento ? usr.persona.departamento.nombre : ''
      },
      seccion: {
        id: usr.persona.seccion ? usr.persona.seccion.id : '',
        nombre: usr.persona.seccion ? usr.persona.seccion.nombre : ''
      },
      foto_URL: usr.persona.foto_URL
    })
    ));
  console.log(usuarios)
  window.localStorage.setItem('listUsuarios', JSON.stringify(usuario));
  return usuarios;
}

export default function GestionUsuarios() {
  /* COSAS PARA LA TABLITA
   * ===================== */

  const [records, setRecords] = useState([])
  /* no filter function initially */
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false)
  /* stores values of record to then edit in the Dialog/Popup */
  const [recordForEdit, setRecordForEdit] = useState(null)
  /* notification snackbar */
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  /* confirm dialog */
  const [confirmDialog, setConfirmDialog] = useState(
    { isOpen: false, title: '', subtitle: '' })

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl
  } = useTable(records, tableHeaders, filterFn);

  /* updates filter function inside `filterFn` object.  Which is used in
   * `useTable`'s `recordsAfterPagingAndSorting()`.  Because  */
  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value === "")
          /* no search text */
          return items
        else
          return items
            .filter(x => x.fullName.toLowerCase()
            .includes(target.value.toLowerCase()))
      }
    })
  }

  useEffect(() => {
    getUsuario()
    .then (newUsr =>{
      setRecords(newUsr);

    });
  }, [recordForEdit])

  const addOrEdit = (usuario, resetForm) => {

    const dataUsr = {
      id: usuario.id,
      fecha_creacion: null,
      fecha_modificacion: null,
      password: null,
      usuario: usuario.correo,
      persona: {
        id: usuario.idPersona,
        nombres: usuario.nombre,
        apellidos: usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno,
        correo_pucp: usuario.correo,
        numero_documento: usuario.DNI,
        tipo_persona: usuario.rol,
        seccion: {
          id: usuario.seccion.id,
          nombre: usuario.seccion.nombre
        },
        departamento: {
          id: usuario.departamento.id,
          nombre: usuario.departamento.nombre
        },
        foto_url: null
      }

    }

    const dataPer = {
      id: usuario.idPersona,
      nombres: usuario.nombre,
      apellidos: usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno,
      correo_pucp: usuario.correo,
      numero_documento: usuario.DNI,
      tipo_persona: usuario.rol,
      seccion: {
        id: usuario.seccion.id,
        nombre: usuario.seccion.nombre
      },
      departamento: {
        id: usuario.departamento.id,
        nombre: usuario.departamento.nombre
      },
      foto_url: null
    }

    recordForEdit
        ? personaService.updatePersona(dataPer, usuario.idPersona)
        : userService.registerUsuario(dataUsr)
          .then(idUsuario => {
            if(recordForEdit)
              setRecordForEdit(null);
            
        })
    window.location.replace('')
    setOpenPopup(false)
    resetForm()
    //window.location.replace('');
    /*if (usuario.id == 0){
      //DTLocalServices.postUser(dataUsr)
      //DTLocalServices.postPersona(dataPer)
      userService.registerUsuario(dataUsr)
    }
    else{
      userService.updateUsuario(dataUsr,usuario.id)
    }
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(prevRecords => prevRecords.concat(usuario))
    //setRecords(DTLocalServices.getAllPersonas())*/
    setNotify({
      isOpen: true,
      message: 'Cambios añadidos',
      type: 'success'
    })

  }

  /* open object in a pop up (for edit) */
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const onDelete = (idPersona,id) => {
    // if (!window.confirm('Are you sure to delete this record?'))
    //   return
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    console.log(idPersona)
    console.log(id)

    userService.borrarUsuario(id);
    
    window.location.replace('');
    /*DTLocalServices.getUsers().then((response) => {
      setRecords(response.data)
      console.log(response.data);
    });*/
    //setRecords(DTLocalServices.getAllPersonas())

    setNotify({
      isOpen: true,
      message: 'Borrado Exitoso',
      type: 'error'
    })
  }

  /* STYLES
   * ====== */
  const SubtitulosTable = { display: "flex" }
  const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }

  /* FORM
   * ==== */
  /* para seleccion de seccion */
  const {
    values,
    // setValues,
    handleInputChange
  } = useForm(initialFieldValues);



  /*useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {

    userService.getUsuarios().then((response) => {
          setRecords(response.data)
          console.log(response.data);
      });
  };*/

  return (
    <>
      <ContentHeader
        text="Gestión de usuarios"
        cbo={false}
      />
      <Form>
        <Box display="flex" width={.2} mb={4}>
          <Controls.Select
            name="seccionID"
            label="Sección"
            value={values.seccionID}
            onChange={handleInputChange}
            options={DTLocalServices.getAllSecciones()}
            size="medium"
          />
        </Box>
      </Form>
      {/* TABLA */}
      <Paper variant="outlined" sx={PaperStyle}>
        <Typography variant="h4" style={SubtitulosTable} >
          Usuarios del Sistema
        </Typography>
        <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
          {/* <Toolbar> */}
          <Controls.Input
            label="Buscar usuarios por nombre"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ width: .75, visibility: "hidden" }}
            onChange={handleSearch}
            type="search"
          />
          <Controls.AddButton
            title="Agregar Nuevo Usuario"
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
                // API devuelve [].  map se cae.  Llamar 2 veces.
                // recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                recordsAfterPagingAndSorting().map(item => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell>{item.nombre} {item.apellidoPaterno} {item.apellidoMaterno}</StyledTableCell>
                    <StyledTableCell>{item.documento}</StyledTableCell>
                    <StyledTableCell>{item.correo}</StyledTableCell>
                    <StyledTableCell>{item.rolName}</StyledTableCell>
                    <StyledTableCell>{item.seccion.nombre}</StyledTableCell>
                    <StyledTableCell>{item.departamento.nombre}</StyledTableCell>
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
                          // onDelete(item.id)
                          setConfirmDialog({
                            isOpen: true,
                            title: '¿Eliminar usuario permanentemente?',
                            subTitle: 'No es posible deshacer esta accion',
                            onConfirm: () => {onDelete(item.idPersona,item.id)}
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
        title={recordForEdit ? "Editar Usuario": "Registrar Usuario"}
      >
        {/* <EmployeeForm /> */}
        <GestionUsuariosForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit}
        />
      </Popup>
      {/* </Grid> */}
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
