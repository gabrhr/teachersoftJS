import React from 'react'
import {Chart, ArcElement} from 'chart.js'
import {Pie} from 'react-chartjs-2'

/*  Colores pastel con transparencia
    Red: rgba(255, 99, 132, 0.2)
    Blue: rgba(54, 162, 235, 0.2)
    Yellow: rgba(255, 206, 86, 0.2)
    Green: rgba(75, 192, 192, 0.2)
    Purple: rgba(153, 102, 255, 0.2)
    Orange: rgba(255, 159, 64, 0.2)
*/

function PieChartTipoDocente(cantidadTC, cantidadTPC, cantidadTPA) {
    Chart.register(ArcElement);
    const data = {
        labels: ["Tiempo completo", "Tiempo parcial convencional", "Tiempo parcial por asignaturas"],
        datasets: [{
            data: [cantidadTC, cantidadTPC, cantidadTPA],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
            borderWidth: 1,
        }],
    }
    return (
        <div>
            <Pie data={data}/>
        </div>
    )
}

function PieChartDeuda(cantidadDocentes, cantidadDeudores) {
    Chart.register(ArcElement);
    const data = {
        labels: ["Deudores","Sin deuda"],
        datasets: [{
            data: [cantidadDeudores, cantidadDocentes-cantidadDeudores],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
            borderWidth: 1,
        }],
    }
    return (
        <div>
            <Pie data={data}/>
        </div>
    )
}

function PieChartInvestigadores(cantidadDocentes, cantidadInvestigadores) {
    Chart.register(ArcElement);
    const data = {
        labels: ["Investigadores", "No investigadores"],
        datasets: [{
            data: [cantidadInvestigadores, cantidadDocentes-cantidadInvestigadores],
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
            borderWidth: 1,
        }],
    }
    return (
        <div>
            <Pie data={data}/>
        </div>
    )
}

export default {PieChartTipoDocente, PieChartDeuda, PieChartInvestigadores}
