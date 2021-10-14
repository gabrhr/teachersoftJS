import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
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
import * as personaService from '../../../services/personaService'
import * as DTLocalServices from '../../../services/DTLocalServices';
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

const initialFieldValues = {
  seccionID: '',
}

const tableHeaders = [
  {
    id: 'fullName',
    label: 'Nombre Completo',
    numeric: false,
    sortable: true
  },
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

export default function GestionUsuarios() {
  /* COSAS PARA LA TABLITA 
   * ===================== */

  const [records, setRecords] = useState(DTLocalServices.getAllPersonas())
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

  const addOrEdit = (usuario, resetForm) => {
    if (usuario.id == 0)
      DTLocalServices.insertPersona(usuario)
    else
      DTLocalServices.updatePersona(usuario)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(DTLocalServices.getAllPersonas())

    setNotify({
      isOpen: true,
      message: 'Usuario añadido',
      type: 'success'
    })
  }

  /* open object in a pop up (for edit) */
  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  const onDelete = id => {
    // if (!window.confirm('Are you sure to delete this record?'))
    //   return
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })

    DTLocalServices.deletePersona(id)
    setRecords(DTLocalServices.getAllPersonas())
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
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
            sx={{ width: .75 }}
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
                recordsAfterPagingAndSorting().map(item => (
                  <TableRow key={item.id}>
                    <StyledTableCell>{item.fullName}</StyledTableCell>
                    <StyledTableCell>{item.seccion}</StyledTableCell>
                    <StyledTableCell>{item.departamento}</StyledTableCell>
                    <StyledTableCell>{item.dni}</StyledTableCell>
                    <StyledTableCell>{item.email}</StyledTableCell>
                    <StyledTableCell>
                      <Controls.ActionButton 
                        color="warning"
                        onClick={ () => {openInPopup(item)}}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton 
                        color="error"
                        onClick={() => {
                          // onDelete(item.id)
                          setConfirmDialog({
                            isOpen: true,
                            title: '¿Eliminar usuario permanentemente?',
                            subTitle: 'No es posible deshacer esta accion',
                            onConfirm: () => {onDelete(item.id)}
                          })
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </StyledTableCell>
                  </TableRow>
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
        title="Registrar nuevo usuario"
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