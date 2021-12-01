//link: http://localhost:3000/ai/publicacionesPorAutor

 
import React, {useState,useEffect, Component } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import InvestigacionService from '../../../services/investigacionService';
import BarChartAutores from '../../../components/PageComponents/BarCharts';

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

export default function CantidadTrabajosXAutor(){

    const [autoresInd, setAutoresInd] = useState([]);

    useEffect(() => {
        autoresIndicadores()
        .then(newAutorIndicador => {
            setAutoresInd(newAutorIndicador);
        });
    }, [])
    
    const SubtitulosTable = { display: "flex" }
    const PaperStyle = { borderRadius: '20px', pb: 1, pt: 1, px: 1, color: "primary.light", elevatio: 0 }

    return(

        <div>
            <Typography variant="body1" color={"#00008B"} my={.5}>
                Investigadores con mayor record de publicaciones
            </Typography>
            <Paper variant="outlined" sx={PaperStyle}>
                <Grid item xs={8}>
                {BarChartAutores(estandarizarAutoresInd(autoresInd))}
                </Grid>
            </Paper>
        </div>

    )
    
  }