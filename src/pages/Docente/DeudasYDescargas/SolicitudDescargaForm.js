import { Alert, Avatar, Grid, Typography, Stack, TextField } from '@mui/material'
import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es');

export default function SolicitudDescargaForm(props) {
    //const {soli} = props
    return (
        <div>
            <Grid container spacing={{ xs: "10px" }} >
                <Grid item sx={{mt:"10px", mb:"10px", ml:1}}>
                    {/* <Avatar sx={{ width: 50, height: 50}} src={soli}/> */}
                    <Avatar sx={{ width: 50, height: 50}}/>
                </Grid>
                <Grid item sx={{mt:"9px"}}>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"De: "}
                    </Typography>
                    <Typography variant="h4"   display="inline">
                        {/* Nombre del docente solicitador */}
                        Docente PUCP (correo)
                    </Typography>
                    <div/>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"Para: \xa0"}
                    </Typography>
                    <Typography variant="body1"  display="inline">
                        {/* Seccion que pertenece */}
                        Seccion
                    </Typography>
                    <Typography variant="body1">
                        Fecha de envio
                        {//moment.utc(solicitud.tracking.fecha_atendido).format('DD MMM YYYY [-] h:mm a')
                        }
                    </Typography>
                </Grid>
            </Grid>
            <Stack direction="row" spacing={2} ml={"66px"} my={"5px"}> 
                <Typography display="inline" fontWeight="550" pt={2} sx={{color:"primary.light"}}>
                            Bonos solicitado: {'\u00A0'} 
                </Typography>
                <div style={{marginTop:"8px"}}/>
                <Alert icon={false} variant="outlined" severity="info" sx={{borderRadius:"25px"}}>
                    {
                        //docente.persona.tipo_bono===1? "Bono de Investigación":"Bono de Docencia";
                        "Bono de Investigación"
                    }
                </Alert>
                <div style={{marginTop:"8px"}}/>
            </Stack> 
            <Typography display="inline" fontWeight="550"  ml={"66px"} mt={2} sx={{color:"primary.light"}}>
                            Justificacion: {'\u00A0'} 
            </Typography>
            <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={6}
                disabled
                defaultValue={"Justificacion de la solicitud ..."}
                sx={{
                    pl: "66px",
                    mt: "5px",
                    /* magia negra de gabs */
                    ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled": {
                        WebkitTextFillColor: "black"
                    }
                }}
            />
        </div>
    )
}
