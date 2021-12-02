//link: http://localhost:3000/ai/publicacionesPorAutor

 
import React, {useState,useEffect, Component } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import InvestigacionService from '../../../services/investigacionService';
import BarChartAutores from '../../../components/PageComponents/BarCharts';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import BigStatistics from '../../../components/DreamTeam/BigStatistic';
import SemiDonutChart from '../../../components/PageComponents/SemiDonutChart';

let indicadores = [];

const autoresIndicadores = async () => {
    let indicadoresAutores = await InvestigacionService.getIndicadoresAutores();
    console.log(indicadoresAutores)
    return indicadoresAutores;
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
        totalCantiad += arr[i][1];
        if (maxCantidad < arr[i][1]){
            maxCantidad = arr[i][1];
            index = i;
        }
    }

    maxNombre =  arr[index][0].nombres + ' ' +  arr[index][0].apellidos;
    }
    catch{

    }

    indicadores[0] = maxNombre;
    indicadores[1] = maxCantidad;
    indicadores[2] = totalCantiad;

 
}

export default function CantidadTrabajosXAutor(){

    const [autoresInd, setAutoresInd] = useState([]);

    useEffect(() => {
        autoresIndicadores()
        .then(newAutorIndicador => {
            setAutoresInd(newAutorIndicador);
        });
    }, [])
    
    const SubtitulosTable = { display: "flex", align: 'center' }
    const PaperStyle = { borderRadius: '20px', pb: 2, pt:1, px: 2, color: "primary.light", elevatio: 0 }

    return(

        <>
            {maxAutor(autoresInd)}
            <ContentHeader
                text="Investigadores con mayor record de publicaciones"
                cbo={false}
            />
            <Grid container spacing={2} >
                <Grid item xs={7}>
                    <Paper variant="outlined" sx={PaperStyle}>
                        <Typography variant="h4" style={SubtitulosTable} >
                            TOP 10 Autores con la mayor cantidad de investigaciones
                        </Typography>
                        {BarChartAutores(estandarizarAutoresInd(autoresInd))}
                        <Grid align="center" justify="center">
                            Cantidad de Documentos
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={5}>
                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <BigStatistics  
                                    variantText="h4"
                                    title={"Autor(a) con más publicaciones"} 
                                    text={indicadores[0]}
                                    />
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <BigStatistics  
                                    title={"Cantidad Máxima de publicaciones de un Autor(a)"} 
                                    text={indicadores[1]}
                                />
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <BigStatistics  
                                    title={"Cantidad total de publicaciones "} 
                                    text={indicadores[2]}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                        <Paper variant="outlined" sx={PaperStyle}>
                            <Typography  align="center" variant={"h1"} fontWeight={"550"}  sx={{color:"primary.light"}} > {indicadores[1]/indicadores[2] * 100 + "%" } </Typography>
                                
                                <SemiDonutChart Cantidad={indicadores[1]} CantidadTotal={indicadores[2]}/>
                                <br/>
                                <Typography  align="center" variant={"h6"}  sx={{color:"primary.light"}} > 
                                    Es el porcentaje de documentos que le pertenece al autor con más documentos
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <br/>
                    
                    <br/>
                    
                </Grid>
            </Grid>
        </>

    )
    
  }