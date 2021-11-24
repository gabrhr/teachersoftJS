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
import horarioService from '../../../services/horarioService';
import ModalCancelarHorarioCurso from './ModalCancelarHorarioCurso';
import ModalGuardarHorarioCurso from './ModalGuardarHorarioCurso';
import ModalSesionesLlenas from './ModalSesionesLlenas';
import ModalFaltaSesion from './ModalFaltaSesion';
import ModalRegistroExitoso from './ModalRegistroExitoso';
import cursoService from '../../../services/cursoService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom'

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

const actualizarCursoCiclo = async (curso_ciclo)=> {

  if(curso_ciclo.cantidad_horarios !== 1){
    const newCC = {
      "id": curso_ciclo.id,
      "ciclo": {
        "id": curso_ciclo.ciclo.id,
      },
      "curso": {
        "id": curso_ciclo.curso.id,
      },
      "cantidad_horarios": 1, //Se actualiza al nuevo estado - con horarios
      "estado_tracking": curso_ciclo.estado_tracking,
    }
    
    const request = await cursoService.updateCursoCiclo(newCC);

  }
}

export default function GestionCargaCursos() {

    const history = useHistory()
    
    const [openPopup, setOpenPopup] = useState(false)
    const [openCancelarPopup, setOpenCancelarPopup] = useState(false)
    const [openGuardarPopup, setOpenGuardarPopup] = useState(false)
    const [openSesionesFullPopup, setOpenSesionesFullPopup] = useState(false)
    const [openFaltaSesionPopup, setOpenFaltaSesionPopup] = useState(false)
    const [openRegistroExitoso, setOpenRegistroExitoso] = useState(false)

    const [vTipo, setVTipo] = useState('Clase')
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

    const [errorHorario, setErrorHorario] = useState(false)
    const [errorHoraSesion, setErrorHoraSesion] = useState(false)

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
            setOpenSesionesFullPopup(true);
        }
    }

    const changeHorario = e => {
        setHorario(e.target.value)
        if(e.target.value.length == 0){
            setErrorHorario(false)
            return
        }
        if(e.target.value.length != 4){
            setErrorHorario(true)
        }else{
            setErrorHorario(false)
        }
    }

    const changeHoraSesion = e => {
        setSesion(e.target.value)
        if(e.target.value.length == 0){
            setErrorHoraSesion(false)
            return
        }
        if(e.target.value == 0){
            setErrorHoraSesion(true)
        }else{
            setErrorHoraSesion(false)
        }
    }

    const validate = () =>{
        if(errorHorario || errorHoraSesion || cantSes === 0){
            console.log("Cagaste")
            return false
        }
        console.log("No cagaste")
        return true;
    }

    const regresarPantalla = (e) => history.push("/as/asignacionCarga/registroCursos");

    const guardarHorario = async () => {
      let arrayCadenas = dValuNombre.split(" ");
      const ciclo = await window.localStorage.getItem("ciclo");
      console.log(ciclo, arrayCadenas);
      if(validate()){
        await cursoService.getCursoCicloxCicloxCodigoNombre(ciclo, arrayCadenas[0])
        .then(request => {
          if(request[0]){          
              const postHorario = {
              "codigo": horario,
              "curso_ciclo": {
                "id": request[0].id,
                "ciclo": {
                  "id": request[0].ciclo.id,
                },
                "curso": {
                  "id": request[0].curso.id,
                },
                "cantidad_horarios": request[0].cantidad_horarios, 
                "estado_tracking": request[0].estado_tracking,
              },
              "sesiones":[{
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

            horarioService.registerHorario(postHorario)
            .then(requestHor  => {
              if(requestHor){
                actualizarCursoCiclo(postHorario.curso_ciclo)
              }
            })
            setOpenRegistroExitoso(true);
          }
          else{
            console.error("No se puede registrar un curso que no está asignado al ciclo");
          }
          resetPage();
          setOpenGuardarPopup(false);
        });
      }
      
    }

    return (
        <> 
            <ContentHeader 
                text="Gestión de la carga de cursos"
                cbo= {false}
            />
            <Controls.Button
            variant="outlined"
            text="Regresar"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => {(dValuNombre && dValuCreditos && dValuUnidad && dValuHorario) ?  setOpenCancelarPopup(true) : regresarPantalla()}}
          />
            <Grid container sx={{width:'100%', gridTemplateColumns: '1fr', paddingLeft: '0.31%', paddingTop: '1%'}}>
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
                            name="especialidad"
                            label="Unidad correspondiente"  
                            value={dValuUnidad} 
                            onChange = {handleInputChange}
                            size= 'small'
                        />
                        <Controls.Input 
                            name="horario"
                            label="Horario"  
                            value={horario} 
                            onChange = {changeHorario}
                            size= 'small'
                            error = {errorHorario}
                            helperText = {errorHorario && "El horario debe tener 4 dígitos"}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={7} sx={{paddingLeft:'20%'}}>
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
                            <Controls.Input
                            name="horaSesion"
                            label="Horas - Sesión"
                            value={sesion}
                            onChange={changeHoraSesion}
                            error = {errorHoraSesion}
                            helperText = {errorHoraSesion && "El valor no puede ser 0"}
                            />
                            <AddButton onClick = {() => addSession(vTipo, sesion)} title = "Agregar horario"/>  
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
                <Grid item align = "right" marginX = {32} marginY={0} >
                    <Controls.Button
                        text="guardar"
                        type="submit" 
                        endIcon={<SaveIcon/>} 
                        disabled = {(dValuNombre && dValuCreditos && dValuUnidad && dValuHorario) ? false : true}
                        onClick = {()=>setOpenGuardarPopup(true)}  
                        />
                </Grid>
            </Grid>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Buscar Curso"
                size = "md"
            >
               <BuscarCurso getRow = {getRow}/>
            </Popup>
            <Popup
                openPopup={openCancelarPopup}
                setOpenPopup={setOpenCancelarPopup}
                title="Regresar"
                size = "sm"
            >
               <ModalCancelarHorarioCurso regresar = {regresarPantalla} setOpenCancelarPopup={setOpenCancelarPopup}/>
            </Popup> 
            <Popup
                openPopup={openGuardarPopup}
                setOpenPopup={setOpenGuardarPopup}
                title="Guardar"
                size = "sm"
            >
               <ModalGuardarHorarioCurso setOpenGuardarPopup = {setOpenGuardarPopup} guardarHorario = {guardarHorario}/>
            </Popup>
            <Popup
                openPopup={openSesionesFullPopup}
                setOpenPopup={setOpenSesionesFullPopup}
                title="Atención"
                size = "sm"
            >
               <ModalSesionesLlenas setOpenSesionesFullPopup = {setOpenSesionesFullPopup}/>
            </Popup>
            <Popup
                openPopup={openFaltaSesionPopup}
                setOpenPopup={setOpenFaltaSesionPopup}
                title="Atención"
                size = "sm"
            >
               <ModalFaltaSesion setOpenFaltaClasePopup = {setOpenFaltaSesionPopup} sesionFaltante = {vTipo}/>
            </Popup>
            <Popup
                openPopup={openRegistroExitoso}
                setOpenPopup={setOpenRegistroExitoso}
                title="Atención"
                size = "sm"
            >
               <ModalRegistroExitoso setOpenRegistroExitoso = {setOpenRegistroExitoso}/>
            </Popup>    
        </>
    )
}