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
                <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                    {solicitador==false? "Atendido por: \xa0": "Enviado por:\xa0"}
                </Typography>
                <Typography variant="h4"   display="inline">
                    {solicitador==false? `${solicitud.delegado.fullName}`: `${solicitud.solicitador.fullName}`}
                </Typography>
                <div/>
                <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                    {"Para: \xa0"}
                </Typography>
                <Typography variant="body1"  display="inline">
                    {solicitador==false? `${solicitud.solicitador.fullName}`: "Mesa de Partes"}
                </Typography>
            </Grid>
        </Grid>
    )
}
