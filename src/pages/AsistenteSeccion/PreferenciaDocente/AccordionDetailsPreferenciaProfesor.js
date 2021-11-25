import React, { useState } from 'react'
import { Typography, Box, Paper } from '@mui/material'
import { Grid, Divider, Avatar } from '@mui/material'

const headers = [
    { id: '1', title: 'Clave' },
    {id: '2', title: 'Nombre'}
]

function HeaderBoxs(props) {
    const { headers } = props
    return (
        headers.map(x => (
            <Box
                width="25%"
                fontSize="15px" fontWeight="500"    // table header style
                color="#042354"
            >
                {x.title}
            </Box>
        ))
    )
}

function generateRow(curso) {
    return (
        <Grid >
            <Grid container>
                <Grid item xs={3}>
                    <Typography>
                        {curso.clave}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography >
                        {curso.nombre_curso}
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
                <Grid container>
                    <Grid item xs={10}>
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
