import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton} from '@mui/material';
import {TableBody, TableRow, TableCell } from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { useForm, Form } from '../../../components/useForm';
import  ContentHeader from '../../../components/AppMain/ContentHeader';
import useTable from "../../../components/useTable"
import * as employeeService from '../../../services/employeeService';
import { Avatar, Divider, Grid, Stack, Typography } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import BuscarCurso from './BuscarCurso'
import Popup from '../../../components/util/Popup'

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
    {id: 'tipo', label: 'Tipo'},
    {id: 'diaSesion', label: 'Día - Sesión'},
    {id: 'horaSesion', label: 'Hora - Sesión'}
]

const sesiones = [
    {tipo: 'clase', diaSesion: 'Lunes', horaSesion: '15:00 - 17:00'},
    {tipo: 'laboratorio', diaSesion: 'Miércoles', horaSesion: '15:00 - 17:00'}
]

export default function GestionCargaCursos() {

    const [openPopup, setOpenPopup] = useState(false)

    const classes = useStyles()

    const [records, setRecords] = useState(sesiones)
    const [filterFn, setFilterFn] = useState({fn: items => { return items; }})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, tableHeaders, filterFn);

    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    return (
        <> 
            <ContentHeader 
                text="Gestión de la carga de cursos"
                cbo= {true}
            />
            <Grid container sx={{width:'100%', gridTemplateColumns: '1fr', paddingLeft: '1%'}}>
                <Grid item xs={5}>
                    <Stack>
                        <Controls.Input 
                        name="curso"
                        label="Curso"  
                        value={values.text} 
                        onChange = {handleInputChange}
                        size= 'small'
                        disabled
                        />
                    </Stack>
                </Grid>
                <Controls.Button
                    type="submit"
                    text={<SearchIcon />}
                    onClick = {() => setOpenPopup(true)}
                />
            </Grid>
            <Grid container sx={{gridTemplateColumns: '1fr 1fr', width: '100%'}} marginY={3}>
                <Grid item xs={3}>
                    <Stack direction="column" alignItems="top" spacing={3} px={2}>
                        <Controls.Input 
                            name="creditos"
                            label="Cantidad de créditos"  
                            value={values.text} 
                            onChange = {handleInputChange}
                            size= 'small'
                            disabled
                            /*variant = 'contained'*/
                        />
                        <Controls.Input 
                            name="horasLec"
                            label="Cantidad de horas lectivas"  
                            value={values.text} 
                            onChange = {handleInputChange}
                            size= 'small'
                            disabled
                        />
                        <Controls.Input 
                            name="especialidad"
                            label="Especialidad del curso"  
                            value={values.text} 
                            onChange = {handleInputChange}
                            size= 'small'
                            disabled
                        />
                        <Controls.Input 
                            name="horario"
                            label="Horario"  
                            value={values.text} 
                            onChange = {handleInputChange}
                            size= 'small'
                            disabled
                        />
                    </Stack>
                </Grid>
                <Grid item xs={7} sx={{paddingLeft:'20%'}}>
                    <Stack direction="column" alignItems="top" spacing={3} px = {9}>
                        <Controls.Select
                        name="tipo"
                        label="Tipo"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        /> 
                        <Controls.Select
                        name="diaSesion"
                        label="Día - Sesión"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        /> 
                        <Controls.Select
                        name="horaSesion"
                        label="Hora - Sesión"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        />    
                    </Stack>
                    <DT.BorderBox marginY={3}>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.tipo}</TableCell>
                                                <TableCell>{item.diaSesion}</TableCell>
                                                <TableCell>{item.horaSesion}</TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </DT.BorderBox>
                </Grid>
            </Grid>
            <Grid conteiner >
                <Grid item align="right" marginY={3} >
                    <Controls.Button
                        variant="outlined"
                        text="cancelar"
                        endIcon={<CloseIcon/>}
                        />
                        
                    <Controls.Button
                        text="guardar"
                        type="submit" 
                        endIcon={<SaveIcon/>}  
                        />
                </Grid>
            </Grid>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Buscar Curso"
            >
               <BuscarCurso />
            </Popup>  
        </>
    )
}