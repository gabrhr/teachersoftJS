/* Author: Mitsuo
 * 
 * Desc.:  Lista de profesores que va dentro del AccordionDetails
 */
import React from 'react'
import { Typography, Box, Paper } from '@mui/material'
import { Grid, Divider, Avatar } from '@mui/material'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import { styled } from '@mui/material/styles';

function generateRow(docente) {
    return (
        <>
            <Grid container>
                <Grid item xs={1}>
                    <Avatar>
                        <img src={`/static/images/avatar/1.jpg`} alt=""></img>
                    </Avatar>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        {docente.nombre}
                    </Typography>
                    <Typography variant="body2" color="darkGray">
                        {docente.id}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography >
                        {docente.seccion}
                    </Typography>
                    <Typography variant="body2" color="darkGray">
                        {docente.tipo}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography display="inline">
                        Carga del ciclo: {"\n"}
                    </Typography>
                    <Typography display="inline" color="#41B9E4">
                        {docente.cargaHoraria} horas
                    </Typography>
                    <Typography color="red">
                        Deuda horaria: {docente.deudaHoraria} horas
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default function AccordionDetailsHorarioProfesor(props) {
    const { docentes } = props
    return (
        <Paper elevation={1} sx={{p: 1}}>
            <Typography
                variant="h4"
                py="4px"
                color="primary"
            >
                Lista de Docentes de Clases
            </Typography>
            {docentes.clase.map(docente => generateRow(docente))}
            <Typography
                variant="h4"
                py="4px"
                color="primary"
            >
                Lista de Docentes de Practicas
            </Typography>
            {docentes.lab.map(docente => generateRow(docente))}
        </Paper>
    )
}
