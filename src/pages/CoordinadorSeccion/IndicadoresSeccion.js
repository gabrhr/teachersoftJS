import React, {useState, useEffect} from 'react'
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Box, Paper, Divider, TableRow, TableCell, InputAdornment, Grid, Typography, TextField, Stack } from '@mui/material';
import { Controls } from '../../components/controls/Controls'
import IndicadoresService from '../../services/indicadoresService';
import PieCharts from '../../components/PageComponents/PieCharts';

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
    const [profesorTPC, setProfesorTPC] = useState([]);
    const [profesorTPA, setProfesorTPA] = useState([]);
    
    useEffect(() => {
        fillProfesorTC(user.persona.seccion.id,cicloAct)
        .then(newProfTC => {
            setProfesorTC(newProfTC);
            
        });
    }, [])

    useEffect(() => {
        fillProfesorTPC(user.persona.seccion.id,cicloAct)
        .then(newProfTPC => {
            setProfesorTPC(newProfTPC);
            
        });
    }, [])

    useEffect(() => {
        fillProfesorTPA(user.persona.seccion.id,cicloAct)
        .then(newProfTPA => {
            setProfesorTPA(newProfTPA);
            
        });
    }, [])

    console.log(user.persona.seccion.id)
    console.log(cicloAct)

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
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TC: {profesorTC.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={4}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPC: {profesorTPC.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Horas TPC: {profesorTPC.promedio_horas}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={4}>
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Número de Profesores TPA: {profesorTPA.cantidad_docentes}
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                        Promedio de Horas TPA: {profesorTPA.promedio_horas}
                    </Typography>
                </Grid>
                <Grid item xs={0.75}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Profesores con deuda:
                    </Typography>
                    <div>
                        {PieCharts.PieChartTipoDocente(1,2,3)}
                    </div>
                </Grid>
                <Grid item xs={0.5}/>
                <Divider orientation="vertical" flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Investigadores:
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
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Numero de Profesores del Ciclo:
                    </Typography>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Promedio de horas de Dictado:
                    </Typography>
                </Grid>
            </Grid>
            <Divider flexItem sx={{marginTop : '20px', mr:"10px", ml:"20px"}} />
            <Typography variant="body1" color={"#00008B"} my={.5}>
            
            </Typography>
            <Grid container spacing={1} ml={".3px"} style={{border: "1px solid grey"}}>
                <Grid item xs={3}>
                    <Typography variant="body1" color={"#00008B"} my={.5}>
                    Número de Investigadores:
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
