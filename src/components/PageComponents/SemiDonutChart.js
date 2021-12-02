import React from 'react'
import {Doughnut} from 'react-chartjs-2'

/*  Colores pastel con transparencia
    Red: rgba(255, 99, 132, 0.2)
    Blue: rgba(54, 162, 235, 0.2)
    Yellow: rgba(255, 206, 86, 0.2)
    Green: rgba(75, 192, 192, 0.2)
    Purple: rgba(153, 102, 255, 0.2)
    Orange: rgba(255, 159, 64, 0.2)
*/

export default function SemiDonutChart(props) {
    
    const {Cantidad, CantidadTotal, text} = props;
    let percentage = (Cantidad/CantidadTotal * 100);
    let text2 = percentage.toString();
    const data = {
        labels: [],
        datasets: [{
            data: [Cantidad/CantidadTotal * 100, (1 - Cantidad/CantidadTotal)*100],
            backgroundColor: ["rgb(4, 35, 84)", "rgb(132, 132, 153)"],
            borderWidth: 1,
        }],
    }
    const options = {
        labels: {
            display: false,
        },
        circumference: 60 * Math.PI,
        rotation: -30 * Math.PI
        
    }
 
    return (
        <div>
            <Doughnut data={data} options={options} />
            
        </div>
    )
}