//link: http://localhost:3000/ai/publicacionesPorAutor

 
import React, {useState,useEffect, Component } from 'react';
import { Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import BarraDocumentosXAutor from './BarraDocumentosXAutor';
import InvestigacionService from '../../../services/investigacionService';

const autoresIndicadores = async () => {
    let indicadoresAutores = await InvestigacionService.getIndicadoresAutores();
    console.log(indicadoresAutores)
    return indicadoresAutores;
}

export default function CantidadTrabajosXAutor(){

    const [autoresInd, setAutoresInd] = useState([]);

    useEffect(() => {
        autoresIndicadores()
        .then(newAutorIndicador => {
            setAutoresInd(newAutorIndicador);
        });
    }, [])

    return(

        <div>

            {console.log(autoresInd)}

        </div>

    )
    
  }