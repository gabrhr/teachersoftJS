import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton} from '@mui/material';
import {TableBody, TableRow, TableCell } from '@mui/material';
import { Controls } from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';
import  ContentHeader from '../../components/AppMain/ContentHeader';
import useTable from "../../components/useTable"
import * as employeeService from '../../services/employeeService';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles(theme => ({
    pageContent: {
        // margin: theme.spacing(10),
        // padding: theme.spacing(3),
    }
}))

const initialFieldValues = {
    id: 0,
    text: '',
    gender: 'male',
    departmentID: '',
    date: new Date(),
    isPermanent: false
}

const tableHeaders = [
    {id: 'nombre', label: 'Nombre'},
    {id: 'seccion', label: 'Sección'},
    {id: 'DNI', label: 'Documento de Identidad'},
    {id: 'correo', label: 'Correo'}
]

const usuarios = [
    {Nombre: 'Hoddddla', seccion: '2', DNI: '424243', correo: 'arroba@mailg.com'},
    {Nombre: 'Hosdfsdfdla', seccion: '2', DNI: '424243', correo: 'arroba@mailg.com'},
    {Nombre: 'Hoppppla', seccion: '2', DNI: '424243', correo: 'arroba@mailg.com'},
    {Nombre: 'H22222ola', seccion: '2', DNI: '424243', correo: 'arroba@mailg.com'}
]

export default function GestionUsuarios() {

    const classes = useStyles()

    const [records, setRecords] = useState(usuarios)

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
                <Grid item xs={3}>
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
                <Grid item xs={8}>
                    <Typography alignContent= 'right' sx={{color: '#000000', paddingLeft: '86%', paddingTop: '1.3%', 
                                fontWeight: 'bold'}}>
                        Agregar usuario
                    </Typography>
                </Grid>
                <Grid item xs={1} alignContent = 'right'>
                    <IconButton 
                        aria-label="add"
                        color="secondary"
                        size="large"
                        >
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container sx={{width: '100%', paddingTop: '30px'}}>
                <Grid item xs={12}>
                    <DT.BorderBox>
                        <TblContainer>
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
                        </TblContainer>
                        <TblPagination />
                    </DT.BorderBox>
                </Grid>
            </Grid>
        </>
    )
}