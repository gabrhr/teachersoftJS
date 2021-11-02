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
import AddButton from '../../../components/controls/AddButton';

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

const tipo = [
    { id: 'Clase', title: 'Clase' },
    { id: 'Laboratorio', title: 'Laboratorio' },
    { id: 'Práctica', title: 'Práctica' }
]

const diaSes = [
    { id: 'Lunes', title: 'Lunes' },
    { id: 'Martes', title: 'Martes' },
    { id: 'Miércoles', title: 'Miércoles' }    
]

const horaSes = [
    { id: '15:00 - 17:00', title: '15:00 - 17:00' },
    { id: '17:00 - 19:00', title: '17:00 - 19:00' },
    { id: '19:00 - 21:00', title: '19:00 - 21:00' }
]

export default function GestionCargaCursos() {

    
    const [openPopup, setOpenPopup] = useState(false)

    const [vTipo, setVTipo] = useState('')
    const [vDiaSesion, setVDiaSesion] = useState('')
    const [vHoraSesion, setVHoraSesion] = useState('')

    const [dValuNombre, setDefValueNombre] = useState('')
    const [dValuCreditos, setDefValueCreditos] = useState('')
    const [dValuHLectivas, setDefValueHLectivas] = useState('')
    const [dValuUnidad, setDefValueUnidad] = useState('')
    const [dValuHorario, setDefValueHorario] = useState('')
    const [valueTipo, setValueTipo] = useState('')

    const classes = useStyles()

    const [records, setRecords] = useState([])
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

    function getRow ({...props}){
        setOpenPopup(false)
        setDefValueNombre(`${props.codigo} - ${props.nombre}`)
        setDefValueCreditos(`${props.creditos}`)
        setDefValueHLectivas(`${props.horasLec}`)
        setDefValueUnidad(`${props.especialidad}`)
        setDefValueHorario(`${props.horario}`)
    }

    function resetPage(){
        setDefValueNombre(``)
        setDefValueCreditos(``)
        setDefValueHLectivas(``)
        setDefValueUnidad(``)
        setDefValueHorario(``)
        setValueTipo('')
    }

    function addSession(){
        setRecords(records => [...records, {
                tipo: `${vTipo}`,
                diaSesion: `${vDiaSesion}`,
                horaSesion: `${vHoraSesion}`
        }]);
    }

    const changeTipo = e => {setVTipo(e.target.value)}
    const changeDiaSesion = e => {setVDiaSesion(e.target.value)}
    const changeHoraSesion = e => {setVHoraSesion(e.target.value)}

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
                        onChange = {handleInputChange}
                        size= 'small'
                        value = {dValuNombre}
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
                            value = {dValuCreditos}
                            onChange = {handleInputChange}
                            size= 'small'
                            /*variant = 'contained'*/
                        />
                        <Controls.Input 
                            name="horasLec"
                            label="Cantidad de horas lectivas"  
                            value={dValuHLectivas} 
                            onChange = {handleInputChange}
                            size= 'small'
                        />
                        <Controls.Input 
                            name="especialidad"
                            label="Unidad correspondiente"  
                            value={dValuUnidad} 
                            onChange = {handleInputChange}
                            size= 'small'
                        />
                        <Controls.Input 
                            name="horario"
                            label="Horario"  
                            value={dValuHorario} 
                            onChange = {handleInputChange}
                            size= 'small'
                        />
                    </Stack>
                </Grid>
                <Grid item xs={7} sx={{paddingLeft:'20%'}}>
                    <DT.BorderBox>
                        <Stack direction="column" alignItems="top" spacing={3} px = {9}>
                            <AddButton onClick = {addSession}/>
                            <Controls.Select
                            name="tipo"
                            label="Tipo"
                            value={values.tipo}
                            onChange={changeTipo}
                            options={tipo}
                            displayEmpty
                            /> 
                            <Controls.Select
                            name="diaSesion"
                            label="Día - Sesión"
                            value={values.diaSesion}
                            onChange={changeDiaSesion}
                            options={diaSes}
                            /> 
                            <Controls.Select
                            name="horaSesion"
                            label="Hora - Sesión"
                            value={values.horaSesion}
                            onChange={changeHoraSesion}
                            options={horaSes}
                            />    
                        </Stack>
                    </DT.BorderBox>
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
                        onClick = {resetPage}
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
               <BuscarCurso getRow = {getRow}/>
            </Popup>  
        </>
    )
}