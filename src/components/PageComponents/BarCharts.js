import React from 'react';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';

function separarAutores(arr){
    let autores=[]
    arr.forEach(element => autores.push(element[0]));
    return autores
}

function separarNombres(arr){
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

function BarChartGeneric(labels, dataset, colors) {
    Chart.register(CategoryScale);
    const data = {
        labels: labels,
        datasets: [{
            label: separarNombres(labels),
            data: dataset,
            backgroundColor: colors,
            borderWidth: 1,
        }],
    }
    const options = {
 
         yAxes: [
            {
              ticks: {
                precision: 0,
              },
            },
          ]
    }
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}

function BarChartAutores(arr){
    Chart.register(CategoryScale);
    console.log("Data para BarChart: ",arr);
    const data = {
        labels: separarAutores(arr),
        datasets: [{
            label: "Número de publicaciones emitidas",
            data: separarNumPublicaciones(arr),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderWidth: 1,
        }],
    }
    const options = {
        indexAxis: 'y',
        legend: {
            display: false
         },
         tooltips: {
            enabled: false
         },
         yAxes: [
            {
              ticks: {
                precision: 0,
              },
            },
          ]
    }
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
}
 
export default {BarChartGeneric, BarChartAutores}