import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

function separarAutores(arr){
    let autores=[]
    arr.forEach(element => autores.push(element[0]));
    return autores
}

function separarNumPublicaciones(arr){
    let numPublicaciones=[]
    arr.forEach(element => numPublicaciones.push(element[1]));
    return numPublicaciones
}

/*  Colores pastel con transparencia
    Red: rgba(255, 99, 132, 0.2)
    Blue: rgba(54, 162, 235, 0.2)
    Yellow: rgba(255, 206, 86, 0.2)
    Green: rgba(75, 192, 192, 0.2)
    Purple: rgba(153, 102, 255, 0.2)
    Orange: rgba(255, 159, 64, 0.2)
*/

function BarChartAutores(cabecera, arr){
    const data = {
        labels: separarAutores(arr),
        datasets: [{
            label: cabecera,
            data: separarAutores(arr),
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)"],
            borderWidth: 1,
        }],
    }
    return (
        <div>
            <HorizontalBar data={data}/>
        </div>
    );
    
}

export default {BarChartAutores}
 