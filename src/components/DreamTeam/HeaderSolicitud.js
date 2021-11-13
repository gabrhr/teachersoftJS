import { Avatar, Grid, Typography } from '@mui/material'
import React from 'react'

export default function HeaderSolicitud(props) {
    const {solicitud, solicitador} = props
    return (
        <Grid container spacing={{ xs: "10px" }} >
            <Grid item sx={{mt:"10px", mb:"10px", ml:2}}>
                <Avatar sx={{ width: 50, height: 50}} src={solicitador==true? 
                    solicitud.solicitador.foto_URL: solicitud.delegado.foto_URL }/>
            </Grid>
            <Grid item sx={{mt:"9px"}}>
                <Typography variant="h4">
                    {solicitador==false? "Atendido por: \xa0" + `${solicitud.delegado.fullName}`:
                        "Enviado por:\xa0" + `${solicitud.solicitador.fullName}`}
                </Typography>
                <Typography variant="body1">
                    {solicitador==false? "Para: \xa0" + `${solicitud.solicitador.fullName}`:
                        "Para: Mesa de Partes"}
                </Typography>
            </Grid>
        </Grid>
    )
}
