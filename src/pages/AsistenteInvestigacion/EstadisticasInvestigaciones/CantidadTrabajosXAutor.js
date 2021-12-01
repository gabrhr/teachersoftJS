//link: http://localhost:3000/ai/publicacionesPorAutor

 
import React, {useState,useEffect, Component } from 'react';
import { Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import BarraDocumentosXAutor from '../../../components/PageComponents/BarCharts';
import InvestigacionService from '../../../services/investigacionService';

const autoresIndicadores = async () => {
    let indicadoresAutores = await InvestigacionService.getIndicadoresAutores();
    console.log(indicadoresAutores)
    return indicadoresAutores;
}

const estandarizarAutoresInd = arr => {
    let arrEstandarizado=[];
    arr.forEach(element => {
        arrEstandarizado.push([element[0].nombres+element[0].apellidos,element[1]]);
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
        setAutoresInd(estandarizarAutoresInd(autoresInd));
    }, [])

    /* {BarraDocumentosXAutor.BarChartAutores()} */

    return(

        <div>
           {console.log(autoresInd)}
        </div>

    )
    
  }