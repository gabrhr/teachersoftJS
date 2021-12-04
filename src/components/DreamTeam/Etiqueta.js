import { Box, Alert } from '@mui/material'
import React from 'react'

//Iconos Mesa de Partes
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function Etiqueta(props) {
    let { text, type, sx, ...other } = props

    /* Carga Docente */
    if (type === "pendiente") {
        text="Pendiente"
        other.icon = (<AccessTimeOutlinedIcon/>)
        other.color= "pendiente"
    }
    /* Mesa de Partes */
    else if (type === "enviado") { //Para los usuarios que envian solicitud
        text="Enviado"
        other.icon = (<NearMeOutlinedIcon/>)
        other.color= "enviado"
    }else if (type === "enRevision") { 
        text="En revisión"
        other.icon = (<AccessTimeOutlinedIcon/>)
        other.color= "pendiente"
    }else if(type === "delegado") { 
        text="Delegado"
        other.icon = (<HowToRegOutlinedIcon/>)
        other.color= "delegado"
    }else if (type === "atendido") {
        text="Atendido" 
        other.icon = (<TaskAltOutlinedIcon/>)
        other.color= "atendido"
    }else if(type==="aprobado"){ //Para descarga
        text="Aprobado"
        other.icon = (<TaskAltOutlinedIcon/>)
        other.color= "atendido"
    }
    else if(type==="desaprobado"){ //Para descarga
        text="Desaprobado"
        other.icon = (<CancelOutlinedIcon/>)
        other.color= "rechazado"
    }
    else if(type==="noSeleccionado"){ //Para descarga
        text="No seleccionado"
        other.icon = (<CancelOutlinedIcon/>)
        other.color= "rechazado"
    }else if(type==="seleccionado"){ //Para descarga
        text="Seleccionado"
        other.icon = (<TaskAltOutlinedIcon/>)
        other.color= "atendido"
    }else if(type==="bono"){ //Para descarga
        other.icon = false
        other.color= "info"
        other.variant="outlined"
    }


    if (! ["error","info","success","warning"].includes(type)) type = "info"

    return (
       // <Box //display="flex"
            // transform="scale(0.5)"   // FIXME: No funciona :(
         //   alignItems="center" justifyContent="center"
           // borderRadius="50px" overflow="hidden"
          //  m={0.5}
        //> 
            <Alert
                severity={type}
                sx={{
                    ...sx,
                    pt: 0,
                    pb: 0,
                    minWidth: "140px",
                    maxWidth: "180px",
                    height: "40px",
                    borderRadius: "20px",

                    transform: "scale(.93)"
                }}
                {...other}
            >
                {text}
            </Alert>
       /*  </Box> */
    )
}
