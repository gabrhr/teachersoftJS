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

/* para que seleccione seccion */
const initialFieldValues = {
  id: 0,
  text: '',
  gender: 'male',
  departmentID: '',
  date: new Date(),
  isPermanent: false
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
    departamento: seccion,
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

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
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
      {/* Solo es necesario 1 para seleccionar seccion, creo */}
      {/* <Grid container mb={2} sx={{ backgroundColor: 'white', width: '100%', gridTemplateColumns: "1fr 1fr" }}>
        <Grid item xs={3} mt={3}>
          <Stack direction='column' alignItems='left' px={0}>
            <Controls.Select
              name="deparmetID"
              label="Sección"
              value={values.departmentID}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
            />
          </Stack>
        </Grid>
        <Grid item sm />
        <Grid item xs={3} mt={3}>
          <Stack direction='column' alignItems='left' px={0}>
            <Controls.Select
              name="departmentID"
              label="Sección"
              value={values.departmentID}
              onChange={handleInputChange}
              options={employeeService.getDepartmentCollection()}
            />
          </Stack>
        </Grid>
      </Grid> */}
      <Form>
        <Box display="flex" width={.2}>
          <Controls.Select
            name="deparmetID"
            label="Sección"
            value={values.departmentID}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            size="medium"
          />
        </Box>
      </Form>
      {/* <Grid container sx={{width: '100%', paddingTop: '30px'}}> */}
      <Paper sx={{ borderRadius: '20px', p:2 }}>
        <div style={{display: "flex", padding: "5px"}}>
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
<<<<<<< Updated upstream
          <Box sx={{width: .25, display: "flex", justifyContent: 'flex-end'}}>
            <Controls.Button 
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon/>}
              sx={{justifySelf:"flex-end"}}
              /* NO FUNCA */
              // sx={{
              //   align:'right',
              //   // position: 'absolute',
              //   right: "10px",
              //   width: .1,
              //   m: 2
              // }}
              onClick = {() => setOpenPopup(true)}
            />
          </Box>
=======
          <Controls.AddButton 
            variant="iconoTexto"
            title = "Agregar Nuevo Usuario"
            onClick = {() => setOpenPopup(true)}
          />

          
>>>>>>> Stashed changes
        {/* </Toolbar> */}
        </div>
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
      </Paper>
      <Popup name="theForm"
         
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add an Employee"
      >
        {/* <EmployeeForm /> */}
         <GestionUsuariosForm />
      </Popup>
      {/* </Grid> */}
    </>
  )
}