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
import BigStatistics from '../../../components/DreamTeam/BigStatistic';


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

export default function IndicadoresADepartamento4() {

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
            {maxAutor(profesores)}
            <Grid container xs spacing = {4}>
            {/* <Stack direction="row" spacing = {4}> */}
                <Grid item xs={6} sx = {{paddingLeft: 3}}>
                <ContentHeader
                 text="Profesores con mayor Deuda por Sección"
                cbo={false}
            />
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
            <br/>
      
            <Grid container spacing={2} >
                <Grid item xs={7}>
                    <Paper variant="outlined" sx={PaperStyle}>
                        <Typography variant="body1" color={"#00008B"} my={.5}>
                            TOP 5 Profesores con mayor deuda
                        </Typography>
                        {BarCharts.BarChartGeneric(getLabels(profesores), getQuantities(profesores), listColors, "Docentes")}
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