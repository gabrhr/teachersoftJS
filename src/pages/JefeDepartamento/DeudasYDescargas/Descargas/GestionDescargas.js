import { Grid, Paper, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router';
import ContentHeader from '../../../../components/AppMain/ContentHeader';
import { Controls } from '../../../../components/controls/Controls';
import TrackinDescarga from '../../../../components/DreamTeam/TrackinDescarga';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GestionDescargas() {
    const location= useLocation()
    const {procesoinit}=location.state
    const PaperStyle = { borderRadius: '20px', pb: 4, pt: 2, px: 2, color: "primary.light", elevatio: 0 }
    function retornar(){
        window.history.back();
    }
    return (
        <>
            <ContentHeader
                text="Solicitudes de Descarga de las Secciones"
                cbo={false}
            />
            <Grid
                container
                ml={-1}
                mr={0}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item xs={6} mb={3}>
                        <Controls.Button
                            variant="outlined"
                            text="Regresar"
                            size="small"
                            startIcon={<ArrowBackIcon />}
                            onClick={retornar}
                        />
                </Grid>
            </Grid>
            <Grid container >
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Proceso: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {procesoinit.nombre} 
                    </Typography >
            </Grid>

            <Grid container direction="row" spacing={3} mb="40px" mt="5px">
                <Grid item xs={2}/>
                <Grid item xs={7} align="center">
                    <TrackinDescarga item={procesoinit}/>
                </Grid>
                <Grid item xs={2}/>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
            
            </Paper>

        </>
    )
}
