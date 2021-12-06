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

const maxAutor = (arr) => {
    

    let maxNombre = '*NO DETERMINADO*'
    let index = 0;
    let maxCantidad = 0;
    let totalCantiad = 0;
    
    indicadores[0] = maxNombre;
    indicadores[1] = maxCantidad;
    indicadores[2] = totalCantiad;
    try{
    for (let i = 0; i < arr.length; i++){
        totalCantiad += arr[i].deuda_docente;
        if (maxCantidad < arr[i].deuda_docente){
            maxCantidad = arr[i].deuda_docente;
            index = i;
        }
    }

    maxNombre =  arr[index].nombres + ' ' +  arr[index].apellidos;
    }
    catch{

    }

    indicadores[0] = maxNombre;
    indicadores[1] = maxCantidad;
    indicadores[2] = totalCantiad;

 
}

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

export default function IndicadoresSeccion3() {

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
            {maxAutor(profesores)}
            <ContentHeader
                text="Sobrecarga de los Docentes en la Sección"
                cbo={false}
            />
            <Grid container spacing={2} >
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
                <Grid item xs={5}>
                  
                        
                            <Paper variant="outlined" sx={PaperStyle}>
                        
                                <BigStatistics  
                                    variantText="h4"
                                    title={"Profesor con mayor deuda"} 
                                    text={indicadores[0]}
                                    />
                                <br/>
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                      
                  
                                <BigStatistics  
                                    title={"Máxima cantidad de deuda"} 
                                    text={indicadores[1]}
                                    />
                         
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                        
                                 <BigStatistics  
                                    title={"Cantidad Profesores Evaluados"} 
                                    text={indicadores[2]}
                                    />
                                <br/>
                     
                            </Paper>
                        </Grid>
                       
                       
              
            </Grid>
        </>);
}