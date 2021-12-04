import { Alert, Avatar, Grid, Typography, Stack, TextField } from '@mui/material'
import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { DT } from '../../../components/DreamTeam/DT';
moment.locale('es');

export default function SolicitudDescargaForm(props) {
    const {recordForView} = props
    console.log("Esto se debe mostrar en la pantalla", recordForView)
    return (
        <div>
            <Grid container spacing={{ xs: "10px" }} >
                <Grid item sx={{mt:"10px", mb:"10px", ml:1}}>
                    <Avatar sx={{ width: 50, height: 50}} src={recordForView.solicitador.foto_URL}/>
                </Grid>
                <Grid item sx={{mt:"9px"}}>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"De: "}
                    </Typography>
                    <Typography variant="h4"   display="inline">
                        {/* Nombre del docente solicitador */}
                        {recordForView.solicitador.apellidos + ", " + recordForView.solicitador.nombres + 
                        "(" + recordForView.solicitador.correo_pucp + ")"}
                    </Typography>
                    <div/>
                    <Typography variant="h4" display="inline" fontWeight="550"  sx={{color:"primary.light"}}>
                        {"Para: \xa0"}
                    </Typography>
                    <Typography variant="body1"  display="inline">
                        {/* Seccion que pertenece */}
                        {"Coordinador de Sección de " + recordForView.solicitador.seccion.nombre}
                    </Typography>
                    <Typography variant="body1">
                        Fecha de envio: {'\u00A0'}
                        { (moment.utc(recordForView.fecha_creacion).format('DD MMM YYYY')) + " - " +
                            (moment.utc(recordForView.fecha_creacion).subtract(5, 'hours').format('h:mm a'))
                        }
                    </Typography>
                </Grid>
            </Grid>
            <Stack direction="row" spacing={2} ml={"66px"} my={"5px"}> 
                <Typography display="inline" fontWeight="550" pt={2} sx={{color:"primary.light"}}>
                            Bonos solicitado: {'\u00A0'} 
                </Typography>
                <div style={{marginTop:"8px"}}/>
                <DT.Etiqueta type="bono"
                    text= {recordForView.tipo_bono===1? "Bono de Investigación":"Bono de Docencia"}
                    />
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
                defaultValue={recordForView.observacion}
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
