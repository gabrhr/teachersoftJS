import { Avatar, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { DriveEtaRounded } from '@mui/icons-material';
moment.locale('es');

function formatoFecha(fecha,e) {
    if (fecha != null) {
        if(e>0){
            return (moment.utc(fecha).subtract(5, 'hours').format('DD MMM YYYY'))
        }
        return (moment.utc(fecha).format('DD MMM YYYY'))
    }
    return (" ")
}

function formatoHora(fecha,e) {
    if (fecha != null) {
        if(e>0){
            return (moment.utc(fecha).subtract(5, 'hours').format('h:mm a'))
        }
        return (moment.utc(fecha).format('h:mm a'))
    }
    return (" ")
}

export default function TrackinDescarga(props) {
    const {item}=props
    const  styleAvatar={width: 15, height: 15,bgcolor:"primary.main"}
    const styleBarra={
        width: "150px", 
        height:"1px", 
        marginLeft:"25px",
        marginTop:"10px",
        marginBottom:"5px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#3b4a81"
    }
    let fechaIniDocente =  item.fecha_inicio;
    let fechaFinDocente =  item.fecha_fin_docente;
    let fechaFinSeccion =  item.fecha_fin_seccion;
    let fechaFinProceso =   item.fecha_fin;

    return (
        <>
        <Grid container ml={"200px"}>
            <Grid item xs={12} >
                <Stack direction="row" spacing={2}>
                    <div style={{marginLeft:"10px"}}> </div>
                    <Avatar sx={styleAvatar}>
                        <> </>
                    </Avatar>   
                    <hr style={styleBarra}/>
                    <Avatar sx={styleAvatar}>
                        <> </>
                    </Avatar>   
                    <hr style={styleBarra}/>
                    <Avatar sx={styleAvatar}>
                        <> </>
                    </Avatar>   
                    <hr style={styleBarra}/>
                    <Avatar sx={styleAvatar}>
                        <> </>
                    </Avatar>   

                </Stack>
            </Grid>
            <Grid item xs={12} >
                <Stack direction="row" spacing={9.5} pr={0}>
                    <div>
                        <Typography variant="body1" align="center" style={{fontWeight: "bold"}}>
                            Inicio de <br/> Proceso
                        </Typography>
                        <Typography variant="body1" align="center" style={{color:"primary.light"}}>
                            {formatoFecha(fechaIniDocente)}
                        </Typography>
                        <Typography variant="body1" align="center" style={{color:"primary.light"}}>
                            {formatoHora(fechaIniDocente)}
                        </Typography>
                    </div>
                    <div >
                        <Typography variant="body1" align="center" style={{fontWeight: "bold"}}>
                            Envio de 
                            Descargas <br/> Docente
                        </Typography>
                        <Typography variant="body1" align="center" style={{color:"primary.light"}}>
                            Hasta {formatoFecha(fechaFinDocente)}
                        </Typography>
                        <Typography variant="body1" align="center" style={{color:"primary.light"}}>
                            {formatoHora(fechaFinDocente)}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body1" align="center" style={{fontWeight: "bold"}}>
                            Envio de 
                            Solicitud <br/>  de Sección
                        </Typography>
                        <Typography variant="body1" align="center" style={{color:"primary.light"}}>
                            Hasta {formatoFecha(fechaFinSeccion)}
                        </Typography>
                        <Typography variant="body1" align="center" style={{color:"primary.light"}}>
                            {formatoHora(fechaFinSeccion)}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="body1" align="center" style={{fontWeight: "bold"}}>
                            Fin de <br/> Proceso
                        </Typography>
                        <Typography variant="body1"  align="center" style={{color:"primary.light"}}>
                            {formatoFecha(fechaFinProceso)}
                        </Typography>
                        <Typography variant="body1" align="center" style={{color:"primary.light"}}>
                            {formatoHora(fechaFinProceso)}
                        </Typography>
                    </div>
                </Stack>
            </Grid>
            </Grid>
        </>
    )
}
