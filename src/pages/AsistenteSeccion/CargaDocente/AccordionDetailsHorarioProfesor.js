/* Author: Mitsuo
 * 
 * Desc.:  Lista de profesores que va dentro del AccordionDetails
 */
import React, { useState } from 'react'
import { Typography, Box, Paper } from '@mui/material'
import { Grid, Divider, Avatar } from '@mui/material'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import { styled } from '@mui/material/styles';
import { Controls } from '../../../components/controls/Controls'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Popup from '../../../components/util/Popup'
import ModalBusquedaDocente from './ModalBusquedaDocente'
import ModalDocenteClases from './ModalDocenteClases'

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
    const { sesiones } = props
    const [openEditarClasesPopup, setOpenEditarClasesPopup] = useState(false)
    const [openEditarPracticasPopup, setOpenEditarPracticasPopup] = useState(false)
    const seleccionarDocentesP = seleccionadosP => {
        console.log(seleccionadosP)
    }
    const clase = sesiones.filter((ses)=>ses.secuencia==='Clase')
    const laboratorio = sesiones.filter((ses)=>ses.secuencia==='Laboratorio')
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
                    <Controls.Button
                        variant="outlined"
                        text="Editar"
                        size="small"
                        endIcon={<EditOutlinedIcon />}
                        onClick={() => {setOpenEditarClasesPopup(true)}}
                    />
                </Grid>
                {clase[0].sesiones_dictado.map(sesion_dic => generateRow(sesion_dic.persona))}
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
                    <Controls.Button
                        variant="outlined"
                        text="Editar"
                        size="small"
                        endIcon={<EditOutlinedIcon />}
                        onClick={() => {setOpenEditarPracticasPopup(true)}}
                    />
                </Grid>
                {laboratorio[0].sesiones_dictado.map(sesion_dic => generateRow(sesion_dic.persona))}
            </Paper>
            <Popup
            openPopup={openEditarClasesPopup}
            setOpenPopup={setOpenEditarClasesPopup}
            title="Búsqueda de docentes para clases"
            >
                <ModalDocenteClases docentesAsig={clase[0].sesiones_dictado.map(sesion_dic => sesion_dic.persona)}/>
            </Popup>
            <Popup
            openPopup={openEditarPracticasPopup}
            setOpenPopup={setOpenEditarPracticasPopup}
            title="Búsqueda de docentes para prácticas"
            >
                <ModalDocenteClases docentesAsig={laboratorio[0].sesiones_dictado.map(sesion_dic => sesion_dic.persona)}/>
            </Popup>
        </>
    )
}
