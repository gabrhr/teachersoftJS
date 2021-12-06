import React, {useState, useEffect} from 'react'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell, InputAdornment, Grid, Typography, TextField, Stack } from '@mui/material';
import { Controls } from '../../components/controls/Controls'
import IndicadoresService from '../../services/indicadoresService';
import PieCharts from '../../components/PageComponents/PieCharts';
import InvestigacionService from '../../services/investigacionService';
import BarCharts from '../../components/PageComponents/BarCharts';
import CantidadTrabajosXAutor from '../AsistenteInvestigacion/EstadisticasInvestigaciones/CantidadTrabajosXAutor';
import BarChartAutores from '../../components/PageComponents/BarCharts';
import BigStatistics from '../../components/DreamTeam/BigStatistic';


let indicadores = [];
/*  Colores pastel con transparencia
    Red: rgba(255, 99, 132, 0.8)
    Blue: rgba(54, 162, 235, 0.8)
    Yellow: rgba(255, 206, 86, 0.8)
    Green: rgba(75, 192, 192, 0.8)
    Purple: rgba(153, 102, 255, 0.8)
    Orange: rgba(255, 159, 64, 0.8)
*/
const listColors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(153, 102, 255, 0.8)"
]



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

export default function IndicadoresASeccion() {

    const [ciclo, setCiclo] = useState();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [cicloAct, setCicloAct] = useState(window.localStorage.getItem("ciclo"));
    const [records, setRecords] = useState([])
    const [profesores, setProfesores] = useState([]);
    
    const [profesorTC, setProfesorTC] = useState([]);

    useEffect(() => {
        fillProfesorTC(user.persona.seccion.id,cicloAct)
        .then(newProfTC => {
            setProfesorTC(newProfTC);
            
        });
        fillProfesoresConDeuda(user.persona.seccion.id)
        .then (newProf => {
            setProfesores(newProf);
            
        });
    }, [])

    const [profesorTPC, setProfesorTPC] = useState([]);

    useEffect(() => {
        fillProfesorTPC(user.persona.seccion.id,cicloAct)
        .then(newProfTPC => {
            setProfesorTPC(newProfTPC);
            
        });
    }, [])

    const [profesorTPA, setProfesorTPA] = useState([]);

    useEffect(() => {
        fillProfesorTPA(user.persona.seccion.id,cicloAct)
        .then(newProfTPA => {
            setProfesorTPA(newProfTPA);
            
        });
    }, [])

    const [profesorDeudaTC, setProfesorDeudaTC] = useState([]);
    const [profesorDeudaTPC, setProfesorDeudaTPC] = useState([]);
    const [profesorDeudaTPA, setProfesorDeudaTPA] = useState([]);

    useEffect(() => {
        deudaProfesores(user.persona.seccion.id)
        .then(newProfDeuda => {
            setProfesorDeudaTC(newProfDeuda.TC);
            setProfesorDeudaTPC(newProfDeuda.TPC);
            setProfesorDeudaTPA(newProfDeuda.TPA);
        });
    }, [])

    const [profesorSobrecargaTC, setProfesorSobrecargaTC] = useState([]);
    const [profesorSobrecargaTPC, setProfesorSobrecargaTPC] = useState([]);
    const [profesorSobrecargaTPA, setProfesorSobrecargaTPA] = useState([]);

    useEffect(() => {
        sobrecargaProfesores(user.persona.seccion.id)
        .then(newProfSobrecarga => {
            setProfesorSobrecargaTC(newProfSobrecarga.TC);
            setProfesorSobrecargaTPC(newProfSobrecarga.TPC);
            setProfesorSobrecargaTPA(newProfSobrecarga.TPA);
        });
    }, [])

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

    

    return (
        <>
            <ContentHeader
                text="Cantidad de Docentes en la Sección"
                cbo={false}
            />
            <Grid container spacing={2} >
                <Grid item xs={7}>
                    <Paper variant="outlined" sx={PaperStyle}>
                        <Typography variant="body1" color={"#00008B"} my={.5}>
                            Cantidad de Profesores según su tipo
                        </Typography>

       
                            {PieCharts.PieChartTipoDocente(profesorTC.cantidad_docentes,profesorTPC.cantidad_docentes,profesorTPA.cantidad_docentes)}
               
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <br/>
                                <br/>
                                <BigStatistics  
                                    title={"Número de Profesores TC"} 
                                    text={profesorTC.cantidad_docentes}
                                    />
                                <br/>
                                <br/>
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <br/>
                                <br/>
                                <BigStatistics  
                                    title={"Número de Profesores TPC"} 
                                    text={profesorTPC.cantidad_docentes}
                                    />
                                <br/>
                                <br/>
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <br/>
                                <br/>
                                 <BigStatistics  
                                    title={"Número de Profesores TPA"} 
                                    text={profesorTPA.cantidad_docentes}
                                    />
                                <br/>
                                <br/>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <br/>
                                <br/>
                                <BigStatistics  
                                    title={"Promedio de Horas TC "} 
                                    text={profesorTC.promedio_horas}
                                    />
                                <br/>
                                <br/>
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <br/>
                                <br/>
                                <BigStatistics  
                                    title={"Promedio de Horas TC"} 
                                    text={profesorTPC.promedio_horas}
                                    />
                                <br/>
                                <br/>
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <br/>
                                <br/>
                                 <BigStatistics  
                                    title={"Promedio de Horas TA"} 
                                    text={profesorTPA.promedio_horas}
                                    />
                                <br/>
                                <br/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


            <Paper variant="outlined" sx={PaperStyle}>
            <Grid container spacing={1} ml={".3px"} >
            
                <Grid item xs={3.5}>
                <Paper variant="outlined" sx={PaperStyle}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Cantidad de Profesores según su tipo
                    </Typography>

                    <div>
                        {PieCharts.PieChartTipoDocente(profesorTC.cantidad_docentes,profesorTPC.cantidad_docentes,profesorTPA.cantidad_docentes)}
                    </div>
                    </Paper>
                </Grid>
                <Grid item xs={0.25}/>
            
                <Grid item xs={3.5}>
                <Paper variant="outlined" sx={PaperStyle}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Deuda por Tipo de Docente
                    </Typography>

                    <div>
                        {PieCharts.PieChartTipoDocente(profesorDeudaTC.cantidad_deudores,profesorDeudaTPC.cantidad_deudores,profesorDeudaTPA.cantidad_deudores)}
                    </div>
                    </Paper >
                </Grid>
                <Grid item xs={0.25}/>
                
                <Grid item xs={3.5}>
                    <Paper variant="outlined" sx={PaperStyle}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Sobrecarga por Tipo de Docente
                    </Typography>
 
                    <div>
                        {PieCharts.PieChartTipoDocente(profesorSobrecargaTC.cantidad_deudores,profesorSobrecargaTPC.cantidad_deudores,profesorSobrecargaTPA.cantidad_deudores)}
                    </div>
                    </Paper >
                </Grid>
                
            </Grid>
            </Paper>
            <Grid item xs={7}>
                    <Paper variant="outlined" sx={PaperStyle}>
                        <Typography variant="h4" >
                            TOP 5 Profesores con mayor deuda
                        </Typography>
                        {BarCharts.BarChartGeneric(getLabels(profesores), getQuantities(profesores), listColors)}
                        <Grid align="center" justify="center">
                            Cantidad de Deudas
                        </Grid>
                    </Paper>
                </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
            <Grid container spacing={1} ml={".3px"} >
            
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Profesores: {profesorTC.cantidad_docentes+profesorTPC.cantidad_docentes+profesorTPA.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de horas de Dictado: {profesorTC.promedio_horas+profesorTPC.promedio_horas+profesorTPA.promedio_horas}
                    </Typography>
                </Grid>
                <Grid item xs={0.25}/>
                
                <Grid item xs={3.5}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Profesores con Deuda: {profesorDeudaTC.cantidad_deudores+profesorDeudaTPC.cantidad_deudores+profesorDeudaTPA.cantidad_deudores}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de Deuda: {profesorDeudaTC.promedio_deuda+profesorDeudaTPC.promedio_deuda+profesorDeudaTPA.promedio_deuda}
                    </Typography>
                </Grid>
                <Grid item xs={0.25}/>
                
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

        </>
    )
}