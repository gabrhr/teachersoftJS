import React, { useState } from 'react'
import { Typography, Box, Paper } from '@mui/material'
import { Grid, Divider, Avatar } from '@mui/material'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import { styled } from '@mui/material/styles';
import { Controls } from '../../components/controls/Controls'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
                        {docente.apellidos + ", " + docente.nombres}
                    </Typography>
                    <Typography variant="body2" color="darkGray">
                        {docente.codigo_pucp}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography >
                        {docente.seccion.nombre}
                    </Typography>
                    <Typography variant="body2" color="darkGray">
                        {docente.tipo_persona}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography display="inline">
                        Carga del ciclo: {"\n"}
                    </Typography>
                    <Typography display="inline" color="#41B9E4">
                        {docente.cargaDocente} horas
                    </Typography>
                    <Typography color="red">
                        Deuda horaria: {docente.deuda_docente} horas
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default function AccordionDetailsHorarioProfesor(props) {
    const { sesiones } = props
    const clase = sesiones.filter((ses)=>ses.secuencia===0)
    if(!clase.sesion_docentes) clase.sesion_docentes = []
    const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)
    if(!laboratorio.sesion_docentes) laboratorio.sesion_docentes = []
      console.log("clase: ", clase, "laboratorio: ", laboratorio);
    return (
        <>
            <Paper elevation={1} sx={{p: 1}}>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography
                            variant="h4"
                            py="4px"
                            color="primary"
                        >
                            Lista de Docentes de Clases
                        </Typography>
                    </Grid>
                </Grid>
                {clase[0].sesion_docentes.map(sesion_dic => generateRow(sesion_dic.docente))}
                <Grid container>
                    <Grid item xs={10}>
                        <Typography
                            variant="h4"
                            py="4px"
                            color="primary"
                        >
                            Lista de Docentes de Prácticas
                        </Typography>
                    </Grid>
                </Grid>
                {laboratorio[0].sesion_docentes.map(sesion_dic => generateRow(sesion_dic.docente))}
            </Paper>
        </>
    )
}