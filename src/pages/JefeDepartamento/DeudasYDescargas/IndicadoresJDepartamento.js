import React, {useState, useEffect} from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell, InputAdornment, Grid, Typography, TextField, Stack } from '@mui/material';
import { Controls } from '../../../components/controls/Controls'
import IndicadoresService from '../../../services/indicadoresService';
import PieCharts from '../../../components/PageComponents/PieCharts';
import InvestigacionService from '../../../services/investigacionService';
import SeccionService from "../../../services/seccionService";
import BarCharts from '../../../components/PageComponents/BarCharts';
import { useForm, Form } from "../../../components/useForm" 
import CantidadTrabajosXAutor from '../../AsistenteInvestigacion/EstadisticasInvestigaciones/CantidadTrabajosXAutor';



const getLabels = (arr) => {
    let arrEstandarizado=[];
    try{
        arr.forEach(element => {
            arrEstandarizado.push(element.nombres + ' ' + element.apellidos);
        });
        }
    catch{

    }
    return arrEstandarizado;
}

const listColors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(153, 102, 255, 0.8)"
]

const getQuantities = (arr) => {
    let arrEstandarizado=[];
    try{
        arr.forEach(element => {
            arrEstandarizado.push(element.deuda_docente);
        });
    }
    catch {}
    return arrEstandarizado;
}


const fillProfesoresConDeuda = async (id_seccion) => {
    let profesorConDeuda = await IndicadoresService.getTopProfesoresDeuda(id_seccion);
    
    return profesorConDeuda;
}


const getSeccionCollection =  async () => {
    //{ id: '1', title: 'Todas las Secciones' },
    const user = JSON.parse(localStorage.getItem("user"))
    let dataSecc = await SeccionService.getSeccionxDepartamento(user.persona.departamento.id);
    
    if(!dataSecc) dataSecc = [];
  
    const secciones = [];
  
    for(let sec of dataSecc) {
      //Hacemos la creación y verificación de los estados
      secciones.push({
        "id": sec.id,
        "nombre": sec.nombre,
      })
    }
  
    return secciones;
}

const fillProfesorTC = async (id_ciclo, id_seccion) => {
    let profesorTC = await IndicadoresService.getDataProfesoresTCPorSeccion(id_ciclo, id_seccion);
    
    return profesorTC;
}

const fillProfesorTPC = async (id_ciclo, id_seccion) => {
    let profesorTPC = await IndicadoresService.getDataProfesoresTPCPorSeccion(id_ciclo, id_seccion);
    
    return profesorTPC;
}

const fillProfesorTPA = async (id_ciclo, id_seccion) => {
    let profesorTPA = await IndicadoresService.getDataProfesoresTPAPorSeccion(id_ciclo, id_seccion);
    
    return profesorTPA;
}

const deudaProfesores = async (id_seccion) => {
    let profesorDeuda = await IndicadoresService.getDataProfesoresDeudaSeccion(id_seccion);
    
    return profesorDeuda;
}

const sobrecargaProfesores = async (id_seccion) => {
    let profesorSobrecarga = await IndicadoresService.getDataProfesoresSobrecargaSeccion(id_seccion);
    
    return profesorSobrecarga;
}

const autoresIndicadores = async () => {
    let indicadoresAutores = await InvestigacionService.getIndicadoresAutores();
    
    return indicadoresAutores;
}

const getAutores = async () => {
    let autores = await InvestigacionService.getAutores();
    console.log(autores)
    return autores;
}

const estandarizarAutoresInd = (arr) => {
    let arrEstandarizado=[];
    arr.forEach(element => {
        let primerNombre=(element[0].nombres.split(" "))[0];
        primerNombre=primerNombre[0].toUpperCase() + primerNombre.slice(1).toLowerCase();
        let primerApellido=(element[0].apellidos.split(" "))[0];
        primerApellido=primerApellido[0].toUpperCase() + primerApellido.slice(1).toLowerCase();
        arrEstandarizado.push([primerNombre+" "+primerApellido,element[1]]);
    });
    return arrEstandarizado;
}

/*
    cantidad: ...,
    promedio_horas: ...,
*/

export default function IndicadoresADepartamento() {
    
    const [ciclo, setCiclo] = useState();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [cicloAct, setCicloAct] = useState(window.localStorage.getItem("ciclo"));
    const [records, setRecords] = useState([])
    const [changeTC, setChangeTC] = useState(false)
    const [changeTPC, setChangeTPC] = useState(false)
    const [changeTPA, setChangeTPA] = useState(false)
    const [changeDeuda, setChangeDeuda] = useState(false)
    const [changeSobrecarga, setChangeSobrecarga] = useState(false)
    const [secciones, setSecciones] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [seccion, setSeccion] = useState(0);


    const initialFieldValues = {
        id: '',
        nombre: ''
    }

    const {
        values,
        setValues,
        handleInputChange
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useForm(initialFieldValues);

    const [profesorTC, setProfesorTC] = useState([]);


    useEffect(() => {
        fillProfesoresConDeuda(seccion)
        .then (newProf => {
            setProfesores(newProf);
            
        });
    }, [seccion])

    useEffect(() => {
        setChangeTC(false)
        fillProfesorTC(seccion,cicloAct)
        .then(newProfTC => {
            if(newProfTC){
                setProfesorTC(newProfTC);
                setChangeTC(true)
            }
            
        });
    }, [seccion])

    const [profesorTPC, setProfesorTPC] = useState([]);

    useEffect(() => {
        setChangeTPC(false)
        fillProfesorTPC(seccion,cicloAct)
        .then(newProfTPC => {
            if(newProfTPC){
                setProfesorTPC(newProfTPC);
                setChangeTPC(true)
            }
            
        });
    }, [seccion])

    const [profesorTPA, setProfesorTPA] = useState([]);

    useEffect(() => {
        setChangeTPA(false)
        fillProfesorTPA(seccion,cicloAct)
        .then(newProfTPA => {
            if(newProfTPA){
                setProfesorTPA(newProfTPA);
                setChangeTPA(true)
            }
        });
    }, [seccion])

    const [profesorDeudaTC, setProfesorDeudaTC] = useState([]);
    const [profesorDeudaTPC, setProfesorDeudaTPC] = useState([]);
    const [profesorDeudaTPA, setProfesorDeudaTPA] = useState([]);

    useEffect(() => {
        setChangeDeuda(false)
        deudaProfesores(seccion)
        .then(newProfDeuda => {
            if(newProfDeuda){
                setProfesorDeudaTC(newProfDeuda.TC);
                setProfesorDeudaTPC(newProfDeuda.TPC);
                setProfesorDeudaTPA(newProfDeuda.TPA);
                setChangeDeuda(true)
            }
        });
    }, [seccion])

    const [profesorSobrecargaTC, setProfesorSobrecargaTC] = useState([]);
    const [profesorSobrecargaTPC, setProfesorSobrecargaTPC] = useState([]);
    const [profesorSobrecargaTPA, setProfesorSobrecargaTPA] = useState([]);

    useEffect(() => {
        setChangeSobrecarga(false)
        sobrecargaProfesores(seccion)
        .then(newProfSobrecarga => {
            if(newProfSobrecarga){
                setProfesorSobrecargaTC(newProfSobrecarga.TC);
                setProfesorSobrecargaTPC(newProfSobrecarga.TPC);
                setProfesorSobrecargaTPA(newProfSobrecarga.TPA);
                setChangeSobrecarga(true)
            }
        });
    }, [seccion])

    const [autoresInd, setAutoresInd] = useState([]);

    useEffect(() => {
        autoresIndicadores()
        .then(newAutorIndicador => {
            setAutoresInd(newAutorIndicador);
        });
    }, [])

    const PaperStyle = { borderRadius: '20px', pb: 1, pt: 1, px: 1, color: "primary.light", elevation: 0 }

    const [autores, setAutores] = useState([])

    useEffect(() => {
        getAutores()
        .then(newAutor => {
            setAutores(newAutor);
        });
    }, [])

    

    useEffect(() => {
        getSeccionCollection()
        .then (newSecc =>{
          if(newSecc){
            setSecciones(newSecc);
            setValues(newSecc[0]);  //Para que se coja predeterminado dicho valor
          }
        });
      }, [] )//Solo al inicio para la carga de secciones

    useEffect(()=>{
        if(values)  setSeccion(values.id);
        else{
            if (setValues) setSeccion(0) 
            //Para indicar que se señalan a todas las secciones que le pertencen al departamento
        }  
    },[values]) //Cada que cambia los values para la seccion

    console.log(seccion)

    return (
        <>
            <ContentHeader
                text="Dashboard"
                cbo={false}
            />
            <Grid container xs spacing = {4} pr={2}>
            {/* <Stack direction="row" spacing = {4}> */}
                <Grid item xs={6} sx = {{paddingLeft: 3}}>
                    <Typography variant="body1" color={"#00008B"} my={2}>
                        DATA ACTUAL DEL CICLO
                    </Typography>
                </Grid>
                <Grid item xs={4}/>
                <Grid item xs={2}>
                    <Controls.Select
                    name="id"
                    label="Secciones"
                    value={values.id}
                    onChange={handleInputChange}
                    options={secciones}
                    type="contained"
                    // displayNoneOpt
                    />
                </Grid>
            </Grid>
            <Typography variant="body1" color={"#00008B"} my={2}>
            
            </Typography>
            <Paper variant="outlined" sx={PaperStyle}>
            <Grid container spacing={1} ml={".3px"} >
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TC: {profesorTC.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Horas TC: {profesorTC.promedio_horas}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={2}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPC: {profesorTPC.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Horas TPC: {profesorTPC.promedio_horas}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={2}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPA: {profesorTPA.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Horas TPA: {profesorTPA.promedio_horas}
                    </Typography>
                    <div>
                        {PieCharts.PieChartTipoDocente(profesorTC.cantidad_docentes,profesorTPC.cantidad_docentes,profesorTPA.cantidad_docentes)}
                    </div>
                </Grid>
                <Grid item xs={0.25}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TC con Deuda: {profesorDeudaTC.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Deuda TC: {profesorDeudaTC.promedio_deuda}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={2}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPC con Deuda: {profesorDeudaTPC.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Deuda TPC: {profesorDeudaTPC.promedio_deuda}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={2}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPA con Deuda: {profesorDeudaTPA.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Deuda TPA: {profesorDeudaTPA.promedio_deuda}
                    </Typography>
                    <div>
                        {PieCharts.PieChartTipoDocente(profesorDeudaTC.cantidad_deudores,profesorDeudaTPC.cantidad_deudores,profesorDeudaTPA.cantidad_deudores)}
                    </div>
                </Grid>
                <Grid item xs={0.25}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TC con Sobrecarga: {profesorSobrecargaTC.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Sobrecarga TC: {profesorSobrecargaTC.promedio_deuda*-1}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={2}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPC con Sobrecarga: {profesorSobrecargaTPC.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Sobrecarga TPC: {profesorSobrecargaTPC.promedio_deuda*-1}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={2}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPA con Sobrecarga: {profesorSobrecargaTPA.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Sobrecarga TPA: {profesorSobrecargaTPA.promedio_deuda*-1}
                    </Typography>
                    <div>
                        {PieCharts.PieChartTipoDocente(profesorSobrecargaTC.cantidad_deudores,profesorSobrecargaTPC.cantidad_deudores,profesorSobrecargaTPA.cantidad_deudores)}
                    </div>
                </Grid>
            </Grid>
            </Paper>
            <Box display="flex" width="100%" my={2} justifyContent="center">
                <Paper variant="outlined" width="50%" sx={PaperStyle}>
                    <Typography variant="h4" >
                        TOP 5 Profesores con mayor deuda
                    </Typography>
                    {BarCharts.BarChartGeneric(getLabels(profesores), getQuantities(profesores), listColors)}
                    <Grid align="center" justify="center">
                        Cantidad de Deudas
                    </Grid>
                </Paper>
            </Box>
            <Paper variant="outlined" sx={PaperStyle}>
            <Grid container spacing={1} ml={".3px"}  >
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Profesores: {profesorTC.cantidad_docentes+profesorTPC.cantidad_docentes+profesorTPA.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de horas de Dictado: {profesorTC.promedio_horas+profesorTPC.promedio_horas+profesorTPA.promedio_horas}
                    </Typography>
                </Grid>
                <Grid item xs={0.25}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Profesores con Deuda: {profesorDeudaTC.cantidad_deudores+profesorDeudaTPC.cantidad_deudores+profesorDeudaTPA.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de Deuda: {profesorDeudaTC.promedio_deuda+profesorDeudaTPC.promedio_deuda+profesorDeudaTPA.promedio_deuda}
                    </Typography>
                </Grid>
                <Grid item xs={0.25}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Profesores con Sobrecarga: {profesorSobrecargaTC.cantidad_deudores+profesorSobrecargaTPC.cantidad_deudores+profesorSobrecargaTPA.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de Sobrecarga: {profesorSobrecargaTC.promedio_deuda*-1+profesorSobrecargaTPC.promedio_deuda*-1+profesorSobrecargaTPA.promedio_deuda*-1}
                    </Typography>
                </Grid>
            </Grid>
            </Paper>
            <Divider flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
            <Typography variant="body1" color={"#00008B"} my={.5}>
            
            </Typography>
            <Typography variant="body1" color={"#00008B"} my={2}>
                        INVESTIGACIONES REALIZADAS
            </Typography>
            <Paper variant="outlined" sx={PaperStyle}>
            <Grid container spacing={1} ml={".3px"} >
                <Grid item xs={12}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Investigadores: {autores.length}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Top 10 Investigadores con mayor record de publicaciones
                    </Typography>
                    <Paper variant="outlined" sx={PaperStyle}>
                        <CantidadTrabajosXAutor/>
                    </Paper>
                </Grid>
            </Grid>
            </Paper>
        </>
    )
}