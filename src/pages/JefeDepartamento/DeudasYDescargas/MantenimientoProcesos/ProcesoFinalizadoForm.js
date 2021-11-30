import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TrackinDescarga from '../../../../components/DreamTeam/TrackinDescarga'

export default function ProcesoFinalizadoForm(props) {
    const {item}=props
    return (
        <>
            <Grid container >
                <Grid item xs={12}> 
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Proceso: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {item.nombre} 
                    </Typography >
                </Grid>
                <Grid item xs={12}> 
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Estado: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"red"}}>
                        Finalizado 
                    </Typography >
                </Grid>
            </Grid>
            <Grid container direction="row" spacing={3} mb="40px" mt="5px">
                <Grid item xs={7} align="center">
                    <TrackinDescarga item={item}/>
                </Grid>
                <Grid item xs={2}/>
            </Grid>  
        </>
    )
}
