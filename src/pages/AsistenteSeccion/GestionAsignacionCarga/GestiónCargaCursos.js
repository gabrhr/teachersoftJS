import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { IconButton, Paper} from '@mui/material';
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
import horarioService from '../../../services/horarioService';
import ModalCancelarHorarioCurso from './ModalCancelarHorarioCurso';
import ModalGuardarHorarioCurso from './ModalGuardarHorarioCurso';
import ModalSesionesLlenas from './ModalSesionesLlenas';
import ModalFaltaSesion from './ModalFaltaSesion';
import ModalRegistroExitoso from './ModalRegistroExitoso';
import cursoService from '../../../services/cursoService';
import ConfirmDialog from '../../../components/util/ConfirmDialog';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Notification from '../../../components/util/Notification';

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
    {id: 'diaSesion', label: 'Horas - Sesión'}
]

const tipo = [
    { id: 'Clase', title: 'Clase' },
    { id: 'Laboratorio', title: 'Laboratorio' }
]

export default function GestionCargaCursos() {

    
    const [openPopup, setOpenPopup] = useState(false)
    const [openCancelarPopup, setOpenCancelarPopup] = useState(false)
    const [openGuardarPopup, setOpenGuardarPopup] = useState(false)
    const [openSesionesFullPopup, setOpenSesionesFullPopup] = useState(false)
    const [openFaltaSesionPopup, setOpenFaltaSesionPopup] = useState(false)
    const [openRegistroExitoso, setOpenRegistroExitoso] = useState(false)

    const [vTipo, setVTipo] = useState('')
    const [dataSes, setDataSes] = useState([])

    const [cantSes, setCantSes] = useState(0);

    const [dValuNombre, setDefValueNombre] = useState('')
    const [dValuCreditos, setDefValueCreditos] = useState('')
    const [dValuUnidad, setDefValueUnidad] = useState('')
    const [dValuHorario, setDefValueHorario] = useState('')
    const [valueTipo, setValueTipo] = useState('')
    const [horario, setHorario] = useState('')
    const [sesion, setSesion] = useState('')
    const classes = useStyles()

    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({fn: items => { return items; }})

    const SubtitulosTable={display:"flex", paddingLeft:"15px", marginBottom:"10px"}
    const PaperStyle={ borderRadius: '20px', mt: .3,pb:4,pt:2, px:2, color:"primary.light", elevation:0}
    

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

    function getRow (props){
        console.log(props)
        setOpenPopup(false)
        setDefValueNombre(`${props.codigo} - ${props.nombre}`)
        setDefValueCreditos(`${props.creditos}`)
        setDefValueUnidad(`${props.seccion.nombre}`)
        setDefValueHorario(`${props.horario}`)
    }

    function resetPage(){
        setDefValueNombre(``)
        setDefValueCreditos(``)
        setDefValueUnidad(``)
        setDefValueHorario(``)
        setValueTipo('')
        setRecords([])
        setHorario('')
        setSesion('')
        setCantSes(0)
        setOpenCancelarPopup(false)
    }

    

    function addSession(vTipo, sesion){
        if(sesion === '')return
        if(cantSes < 2){
            if(cantSes === 1 && records[0].tipo === vTipo){
                    setOpenFaltaSesionPopup(true);
            }else{
                records.push({
                    "tipo": vTipo,
                    "sesion": sesion,
                });
                setCantSes(cantSes + 1);
            }
        }else{
            handleShowNotification1();
        }
    }

    const changeHorario = e => {setHorario(e.target.value)}

    const guardarHorario = async() => {
        let arrayCadenas = dValuNombre.split(" ");
        const request = await cursoService.getCursosxCodigoNombre(arrayCadenas[0]);
        console.log(request);
        const postHorario = {
            "codigo": horario,
            ciclo:{
              "id": parseInt(window.localStorage.getItem('ciclo')),
            },
            curso:{
              "id": request[0].id,
            },
            sesiones:[{
              "secuencia": (records[0].tipo === "Laboratorio") ? 1 : 0, 
              "horas": parseFloat(records[0].sesion),
            }]
        }
        if(records[1]){
            postHorario.sesiones.push({
                    "secuencia": (records[1].tipo === "Laboratorio") ? 1 : 0,
                    "horas": parseFloat(records[1].sesion),
            })
        }
        console.log(postHorario);
        horarioService.registerHorario(postHorario);
        resetPage();
        setOpenGuardarPopup(false);
        handleShowNotification2();
    }
    const history = useHistory()
    const [confirmDialog, setConfirmDialog] = React.useState({ 
        isOpen: false, 
        title: '', 
        subTitle: '',
        onConfirm: () => onConfirm()
    })

    /* Executes after Confirm button is pressed,  just before the popup closes */
    const onConfirm = () => {
        resetPage()
    }

    /* abrir modal */
    function onClickButtonConfirmDialog() {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: 'Mensaje de Advertencia',
            subTitle: '¿Desea cancelar los cambios realizados?',
        })
    }
    const [confirmGuardar, setConfirmGuardar] = React.useState({ 
        isOpen: false, 
        title: '', 
        subTitle: '',
        onConfirm: () => onConfirmGuardar()
    })
    const onConfirmGuardar = () => {
        guardarHorario();
    }
    /* abrir modal */
    function onClickGuardarConfirmDialog() {
        setConfirmGuardar({
            ...confirmGuardar,
            isOpen: true,
            title: 'Mensaje de Confirmación',
            subTitle: '¿Está seguro de guardar el horario para el curso?',
        })
    }

    const [notify, setNotify] = React.useState({
        isOpen: false, 
        message: '', 
        type: ''
    })

    function handleShowNotification1(e) {
        setNotify({
            isOpen: true,
            message: 'No se pueden ingresar más de dos sesiones',
            type: "warning",
        })
    }
    function handleShowNotification2(e) {
        setNotify({
            isOpen: true,
            message: 'Se ha registrado exitosamente el horario',
            type: "success",
        })
    }

    return (
        <> 
            <ContentHeader 
                text="Nuevo Horario de Curso"
                cbo= {false}
            />
            <Grid item xs={6} md={1} mb={3}>
                <Link to={'/as/asignacionCarga/registroCursos'}  style={{ textDecoration: 'none' }}> 
                    <Controls.Button
                        variant="outlined"
                        text="Regresar"
                        size="small"
                        startIcon={<ArrowBackIcon />}
                    />
                </Link>
          </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
                <Typography variant="h4" style={SubtitulosTable}>
                    Seleccione el Curso
                </Typography>
                <Grid container sx={{width:'100%', gridTemplateColumns: '1fr', paddingLeft: '1%'}}>
                    <Grid item xs={5}>
                        <Stack>
                            <Controls.Input 
                            name="curso"
                            label="Curso"
                            onChange = {handleInputChange}
                            size= 'small'
                            value = {dValuNombre}
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
                            <Typography variant="h4">
                                Información del Curso
                            </Typography>
                            <Controls.Input 
                                name="creditos"
                                label="Cantidad de créditos"  
                                value = {dValuCreditos}
                                onChange = {handleInputChange}
                                size= 'small'
                                disabled
                                /*variant = 'contained'*/
                            />
                            <Controls.Input 
                                name="especialidad"
                                label="Unidad correspondiente"  
                                value={dValuUnidad} 
                                onChange = {handleInputChange}
                                disabled
                                size= 'small'
                            />
                            <Typography variant="h4">
                                Horario del Curso
                            </Typography>

                            <Controls.Input 
                                name="horario"
                                label="Horario"  
                                value={horario} 
                                onChange = {changeHorario}
                                size= 'small'
                            />
                        </Stack>
                    </Grid>
                    <Grid containter xs={7} sx={{paddingLeft:'20%'}}>
                        <Typography variant="h4" style={{marginBottom:"10px"}}>
                            Información del Horario
                        </Typography>

                        <DT.BorderBox>
                            <Stack direction="column" alignItems="top" spacing={3} px = {9}>
                                
                                <Controls.Select
                                name="tipo"
                                label="Tipo"
                                value={vTipo}
                                onChange={(e) => {setVTipo(e.target.value);
                                console.log(e.target.value)}}
                                options={tipo}
                                displayEmpty
                                /> 
                            <Grid container >
                                <Grid item xs={3}>
                                    <Controls.InfoHelper text="Ingrese el número de horas &#10; del tipo de clases"/>
                                </Grid>
                                <Grid item xs={9}>
                                    <Stack direction="column" alignItems="top" justifyContent= 'flex-end' spacing={3} pl = {1}>
                                        <Controls.Input
                                        name="horaSesion"
                                        label="Horas - Sesión"
                                        value={sesion}
                                        onChange={(e)=>{
                                            setSesion(e.target.value)
                                        }}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Controls.AddButton
                                title="Agregar Horario"
                                variant="iconoTexto"
                                onClick = {() => addSession(vTipo, sesion)}
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
                                                    <TableCell  >{item.sesion}</TableCell>
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
                            onClick = {onClickButtonConfirmDialog}
                            />
                            
                        <Controls.Button
                            text="guardar"
                            type="submit" 
                            endIcon={<SaveIcon/>}
                            onClick = {onClickGuardarConfirmDialog}  
                            />
                    </Grid>
                </Grid>
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Buscar Curso"
            >
               <BuscarCurso getRow = {getRow}/>
            </Popup>
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <ConfirmDialog 
                confirmDialog={confirmGuardar}
                setConfirmDialog={setConfirmGuardar}
            />

            <Notification
                notify={notify}
                setNotify={setNotify}
            />   
        </>
    )
}