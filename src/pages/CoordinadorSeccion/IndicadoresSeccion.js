import React, {useState, useEffect} from 'react'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell, InputAdornment, Grid, Typography, TextField, Stack } from '@mui/material';
import { Controls } from '../../components/controls/Controls'
import IndicadoresService from '../../services/indicadoresService';
import PieCharts from '../../components/PageComponents/PieCharts';
import InvestigacionService from '../../services/investigacionService';
import BarChartAutores from '../../components/PageComponents/BarCharts';

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

const deudaProfesores = async () => {
    let profesorDeuda = await IndicadoresService.getDataProfesoresDeuda();
    
    return profesorDeuda;
}

const sobrecargaProfesores = async () => {
    let profesorSobrecarga = await IndicadoresService.getDataProfesoresSobrecarga();
    
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

export default function IndicadoresSeccion() {

    const [ciclo, setCiclo] = useState();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [cicloAct, setCicloAct] = useState(window.localStorage.getItem("ciclo"));
    const [records, setRecords] = useState([])
    
    
    const [profesorTC, setProfesorTC] = useState([]);

    useEffect(() => {
        fillProfesorTC(user.persona.seccion.id,cicloAct)
        .then(newProfTC => {
            setProfesorTC(newProfTC);
            
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
        deudaProfesores()
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
        sobrecargaProfesores()
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
                text="Dashboard"
                cbo={false}
            />
            <Typography variant="body1" color={"#00008B"} my={2}>
                DATA ACTUAL DEL CICLO
            </Typography>
            <Grid container spacing={1} ml={".3px"} style={{border: "1px solid grey"}}>
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
                        {PieCharts.PieChartTipoDocente(1,2,3)}
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
                        {PieCharts.PieChartTipoDocente(1,2,3)}
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
                        {PieCharts.PieChartTipoDocente(1,2,3)}
                    </div>
                </Grid>
            </Grid>
            <Divider flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
            <Typography variant="body1" color={"#00008B"} my={.5}>
            
            </Typography>
            <Grid container spacing={1} ml={".3px"} style={{border: "1px solid grey"}}>
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
            <Divider flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
            <Typography variant="body1" color={"#00008B"} my={.5}>
            
            </Typography>
            <Grid container spacing={1} ml={".3px"} style={{border: "1px solid grey"}}>
                <Grid item xs={12}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Investigadores: {autores.length}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Top 10 Investigadores con mayor record de publicaciones
                    </Typography>
                    <Paper variant="outlined" sx={PaperStyle}>
                        <Grid item xs={8}>
                        {BarChartAutores(estandarizarAutoresInd(autoresInd))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
