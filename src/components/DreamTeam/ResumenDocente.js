import React from 'react'
import { Alert, Avatar, Grid, Typography, typographyClasses } from '@mui/material'
import { UserContext } from '../../constants/UserContext';

export default function ResumenDocente(props) {
    let {docente} = props

    console.log("docente",docente)
    function getTipoDocente (tipo){
        if(tipo===0) return "Sin asignar"
        else if(tipo===1) return "Tiempo Completo (TC)"
        else if(tipo===2) return "Tiempo Parcial Completo (TPC)"
        else if(tipo===3) return "Tiempo Parcial por Asignaturas (TPA)"
    }
    function getHoras (tipo){
        if(tipo===0) return "0 horas"
        else if(tipo===1) return "10 horas"
        else if(tipo===2) return "6 horas"
        else if(tipo===3) return "6 horas"
    }
    return (
        <>
            <Grid container direction="column">
                <Grid  item align="center" mx={.2}>
                    <Avatar  sx={{ width: 250, height: 250, mb: 2, mx:0 }} src={docente.persona.foto_URL}/>
                </Grid>
                <Grid item pl={6}>
                    <Typography display="inline" fontWeight="550" my={3}  sx={{color:"primary.light"}}>
                        Nombre: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {/* Nombre del docente */}
                        {docente.persona.nombres}
                    </Typography>
                    <div style={{marginTop:"8px"}}/>
                    <Typography display="inline" fontWeight="550" mt={3} sx={{color:"primary.light"}}>
                        Apellidos: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {docente.persona.apellidos}
                    </Typography>
                    <div style={{marginTop:"8px"}}/>
                    <Typography display="inline" fontWeight="550" sx={{mt:3,color:"primary.light"}}>
                        Tipo de profesor: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" mt={3}  sx={{color:"primary.light"}}>
                        {/* Nombre del docente */}
                        {getTipoDocente(docente.persona.tipo_docente)}
                    </Typography>
                    <div style={{marginTop:"8px"}}/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Email: {'\u00A0'}
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {/* Nombre del docente */}
                        {docente.persona.correo_pucp}
                    </Typography>
                    <div style={{marginTop:"8px"}}/>
                    <Typography display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        Bonos que corresponde: {'\u00A0'} 
                    </Typography>
                    <Typography display="inline" sx={{color:"primary.light"}}>
                        {docente.persona.tipo_bono===0? "Sin bonos": ""}
                    </Typography>
                    <div style={{marginTop:"8px"}}/>
                    {docente.persona.tipo_bono===0? <> </>:
                        <Alert icon={false} variant="outlined" severity="info">
                            {docente.persona.tipo_bono===1? "Bono de Investigación":
                                "Bono de Docencia"}
                        </Alert>
                    }
                    <div style={{marginTop:"8px"}}/>
                    <Typography fontWeight="550"  sx={{color:"#8B6EFE"}}>
                        Carga Total Requerida: {'\u00A0'} {getHoras(docente.persona.tipo_docente)}
                    </Typography>
                    <div style={{marginTop:"8px"}}/>
                    <Typography  fontWeight="550" sx={{color:"#8B6EFE"}}>
                        Carga Horaria del Ciclo: {docente.persona.cargaDocente}  horas
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

