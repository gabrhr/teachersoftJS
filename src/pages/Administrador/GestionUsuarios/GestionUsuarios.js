import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton, InputAdornment, Toolbar } from '@mui/material';
import { Box, Paper, TableBody, TableRow, TableCell } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { useForm, Form } from '../../../components/useForm';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import * as employeeService from '../../../services/employeeService';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import Popup from '../../../components/util/Popup'
import useTable from "../../../components/useTable"
import GestionUsuariosForm from './GestionUsuariosForm'
/* ICONS */
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

/* secciones hardcodeadas */
const getSecciones = () => ([
  { id: 1, title: 'Informatica'},
  { id: 2, title: 'Telecomunicaciones'},
  { id: 3, title: 'Industrial'},
  { id: 4, title: 'Civil'},
  { id: 5, title: 'Mecanica'},
  { id: 6, title: 'Fisica'}
])

/* para que seleccione seccion */
const initialFieldValues = {
  seccionID: '',
}

const tableHeaders = [
  {
    id: 'id',
    label: 'EmployeeID',
    numeric: true,
    sortable: true
  },
  {
    id: 'fullName',
    label: 'Nombre Completo',
    numeric: false,
    sortable: true
  },
  {
    id: 'seccion',
    label: 'Sección',
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
    id: 'dni',
    label: 'DNI',
    numeric: false,
    sortable: true
  },
  {
    id: 'email',
    label: 'Correo Electrónico',
    numeric: false,
    sortable: true
  }
]

/* create labeled data */
function createData(id, fullName, seccion, departamento, dni, email,) {
  return {
    id,
    fullName,
    seccion,
    departamento: departamento + ' ' + seccion,
    dni,
    email
  }
}

const usuarios2 = [
  createData('0', 'Nombre1', 'Ing. Informatica', 'FCI', '12345678', 'asdf@example.com'),
  createData('1', 'Nombre2', 'Ing. Informatica', 'FCI', '12345678', 'asdf@example.com'),
  createData('2', 'Nombre3', 'Ing. Informatica', 'FCI', '12345678', 'asdf@example.com'),
  createData('3', 'Nombre4', 'Ing. Informatica', 'FCI', '12345678', 'asdf@example.com'),
  createData('4', 'Nombre5', 'Ing. Informatica', 'FCI', '12345678', 'asdf@example.com'),
  createData('5', 'Nombre6', 'Ing. Informatica', 'FCI', '12345678', 'asdf@example.com'),
  createData('6', 'Nombre7', 'Ing. Informatica', 'FCI', '12345678', 'asdf@example.com'),
]

export default function GestionUsuarios() {
  const [records, setRecords] = useState(usuarios2)
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false)
  const SubtitulosTable={display:"flex"}
  const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, color:"primary.light", elevatio:0}

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
          return items.filter(x => x.fullName.toLowerCase()
              .includes(target.value))
      }
    })
  }

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
            options={getSecciones()}
            size="medium"
          />
        </Box>
      </Form>
      {/* TABLA */}
      <Paper variant="outlined" sx={PaperStyle}>
        <Typography variant="h4" style={SubtitulosTable}> 
          Usuarios del Sistema
        </Typography>
        <div style={{display: "flex", paddingRight: "5px", marginTop:20}}>
        {/* <Toolbar> */}
          <Controls.Input
            label="Search Employees by Name"
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
          <Box sx={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
          <Controls.Button 
              text="Nuevo Usuario"
              variant="iconoTexto"
              startIcon={<AddIcon/>}
              onClick = {() => setOpenPopup(true)}
            />
          </Box>
        {/* </Toolbar> */}
        </div>
        <BoxTbl>
          <TblContainer>
            <TblHead />
            <TableBody>
              {
                recordsAfterPagingAndSorting().map(item => (
                  <TableRow key={item.id}>
                    <TableCell
                      align="right"
                    >
                      {item.id}
                    </TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.seccion}</TableCell>
                    <TableCell>{item.departamento}</TableCell>
                    <TableCell>{item.dni}</TableCell>
                    <TableCell>{item.email}</TableCell>
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
        <GestionUsuariosForm />
      </Popup>
      {/* </Grid> */}
    </>
  )
}