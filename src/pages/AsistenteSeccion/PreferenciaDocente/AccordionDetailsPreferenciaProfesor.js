import React, { useState } from 'react'
import { Typography, Box, Paper } from '@mui/material'
import { Grid, Divider, Avatar } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'

const headers = [
    { id: '1', title: 'Clave' },
    {id: '2', title: 'Nombre'},
    { id: '1', title: 'Créditos' },
    {id: '2', title: 'Horario'},
    { id: '1', title: 'Sesión' },
    { id: '1', title: 'Horas' }
]

function HeaderBoxs(props) {
    const { headers } = props
    return (
      <>
            <Box
                width="2%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            />
            <Box
                width="10%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            >
                {headers[0].title}
            </Box>
            <Box
                width="30%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            >
                {headers[1].title}
            </Box>
            <Box
                width="10%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            >
                {headers[2].title}
            </Box>
            <Box
                width="10%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            >
                {headers[3].title}
            </Box>
            <Box
                width="15%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            >
                {headers[4].title}
            </Box>
            <Box
                width="15%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            >
                {headers[5].title}
            </Box>
      </>
    )
}

function generateRow(curso) {
    return (
      <Grid >
            <Grid container>
            <Controls.Divider style = {{color: "#636e9a"}}/>
                <Grid item xs = {0.25}/>
                <Grid item xs={1.2}>
                    <Typography>
                        {curso.clave}
                    </Typography>
                </Grid>
                <Grid item xs={3.8}>
                    <Typography >
                        {curso.nombre_curso}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography >
                        {curso.carga}
                    </Typography>
                </Grid>
                <Grid item xs={1.2}>
                    <Typography >
                        {curso.horario}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography >
                        {curso.Sesion}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography >
                        {curso.horas}
                    </Typography>
                </Grid>
              </Grid>
      </Grid>
    )
}

export default function AccordionDetailsHorarioProfesor({preferencia}) {

    return (
        <>
            <Paper elevation={1} sx={{p: 1}}>
                <Grid container >
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            py="4px"
                            color="primary"
                        >
                            Lista de Horarios
                        </Typography>
                    </Grid>
                    <HeaderBoxs headers={headers} />
                </Grid>
                {preferencia.map(curso => generateRow(curso))}
            </Paper>
        </>
    )
}
