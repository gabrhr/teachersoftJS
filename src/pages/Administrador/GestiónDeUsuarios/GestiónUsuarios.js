import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton} from '@mui/material';
import { Paper, TableBody, TableRow, TableCell } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { useForm, Form } from '../../../components/useForm';
import  ContentHeader from '../../../components/AppMain/ContentHeader';
import useTable from "../../../components/useTable"
import * as employeeService from '../../../services/employeeService';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'

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
function createData(id, fullName, seccion, departamento, dni, email, ) {
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
    createData('Nombre1', '1', '1', '12345678', 'asdf@example.com'),
    createData('Nombre2', '2', '1', '12345678', 'asdf@example.com'),
    createData('Nombre3', '3', '2', '12345678', 'asdf@example.com'),
    createData('Nombre4', '1', '2', '12345678', 'asdf@example.com'),
    createData('Nombre5', '2', '2', '12345678', 'asdf@example.com'),
]

export default function GestionUsuarios() {
    const [records, setRecords] = useState(usuarios2)
    const [filterFn, setFilterFn] = useState({fn: items => { return items; }})
    const [openPopup, setOpenPopup] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, tableHeaders);

    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    return (
        <> 
            <ContentHeader 
                text="Gestión de usuarios"
                cbo= {false}
            />
            <Grid container sx={{backgroundColor: 'white', width: '100%', gridTemplateColumns: "1fr 1fr"}}>
                <Grid item xs={3} mt={3}>
                    <Stack direction = 'column' alignItems = 'left' px = {0}>
                        <Controls.Select
                        name="deparmetId"
                        label="Sección"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        />
                    </Stack>
                </Grid>
                <Grid sm/>
                <Grid item xs={3} mt={3}>
                    <Stack direction = 'column' alignItems = 'left' px = {0}>
                        <Controls.Select
                        name="deparmetId"
                        label="Sección"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <Grid container sx={{width: '100%', paddingTop: '30px'}}>
                <Grid item xs={12}>
                    <DT.BorderBox>
                        {/* <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.Nombre}</TableCell>
                                                <TableCell>{item.seccion}</TableCell>
                                                <TableCell>{item.DNI}</TableCell>
                                                <TableCell>{item.correo}</TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </TblContainer> */}
                        <TblPagination />
                    </DT.BorderBox>
                </Grid>
            </Grid>
        </>
    )
}