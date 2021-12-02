//link: http://localhost:3000/ai/publicacionesPorIdioma

 
import React, {useState,useEffect, Component } from 'react';
import { Grid, Typography,Box, Paper, Divider } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import InvestigacionService from '../../../services/investigacionService';
import BarChartIdiomas from '../../../components/PageComponents/BarCharts';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import BigStatistics from '../../../components/DreamTeam/BigStatistic';
import SemiDonutChart from '../../../components/PageComponents/SemiDonutChart';
import  PieCharts from '../../../components/PageComponents/PieCharts';
import StyleDictionary from '../../../components/DreamTeam/StyleDictionary';
import BarCharts from '../../../components/PageComponents/BarCharts';

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

let indicadoresIdiomas =[];

const idiomasIndicadores = async () => {
    let dataindicadoresIdiomas = await InvestigacionService.documentsByLang();
    indicadoresIdiomas = dataindicadoresIdiomas;
    return dataindicadoresIdiomas;
}


const getLabels = (arr) => {
    let arrEstandarizado=[];
    arr.forEach(element => {
        arrEstandarizado.push(element[0]);
    });
    return arrEstandarizado;
}

const getQuantities = (arr) => {
    let arrEstandarizado=[];
    arr.forEach(element => {
        arrEstandarizado.push(element[1]);
    });
    return arrEstandarizado;
}

const maxIdioma = (arr) => {
    

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

    maxNombre =  arr[index][0];
    }
    catch{

    }

    indicadores[0] = maxNombre;
    indicadores[1] = maxCantidad;
    indicadores[2] = totalCantiad;

 
}

export default function CantidadTrabajosXIdioma(){

    const [idiomasInd, setIdiomasInd] = useState([]);

    useEffect(() => {
        idiomasIndicadores()
        .then(newIdiomaIndicador => {
            setIdiomasInd(newIdiomaIndicador);
        });
    }, [])
    
    const SubtitulosTable = { display: "flex", align: 'center' }
    const PaperStyle = { borderRadius: '20px', pb: 2, pt:1, px: 2, color: "primary.light", elevatio: 0 }

    return(

        <>
            {maxIdioma(idiomasInd)}
            <ContentHeader
                text="Idiomas con mayor récord de publicaciones"
                cbo={false}
            />
            <Grid container spacing={2} >
                <Grid item xs={7}>
                    <Paper variant="outlined" sx={PaperStyle}>
                        <Typography variant="h4" style={SubtitulosTable} >
                            TOP 5 Idiomas con la mayor cantidad de investigaciones
                        </Typography>
                        {BarCharts.BarChartGeneric(getLabels(idiomasInd), getQuantities(idiomasInd), listColors)}
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
                                    variantText="h2"
                                    title={"Idioma con más publicaciones"} 
                                    text={indicadores[0]}
                                    />
                            </Paper>
                            <br/>
                            <Paper variant="outlined" sx={PaperStyle}>
                                <BigStatistics  
                                    title={"Cantidad Máxima de publicaciones de un Idioma"} 
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
                            <Typography  align="center" variant={"h1"} fontWeight={"550"}  sx={{color:"primary.light"}} > {(indicadores[1]/indicadores[2] * 100).toFixed(2) + "%" } </Typography>
                                
                                <SemiDonutChart Cantidad={indicadores[1]} CantidadTotal={indicadores[2]}/>
                                <br/>
                                <Typography  align="center" variant={"h6"}  sx={{color:"primary.light"}} > 
                                    Es el porcentaje de documentos que le pertenece al idioma con más documentos
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