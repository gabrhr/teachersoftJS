import { Box, Alert } from '@mui/material'
import React from 'react'

//Iconos Mesa de Partes
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';


export default function Etiqueta(props) {
    let { text, type, sx, ...other } = props

    /* Carga Docente */
    if (type === "pendiente") {
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
    }

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
                    pt: 0,
                    pb: 0,
                    minWidth: "140px",
                    maxWidth: "180px",
                    height: "40px",
                    borderRadius: "20px",

                    transform: "scale(.90)"
                }}
                {...other}
            >
                {text}
            </Alert>
       /*  </Box> */
    )
}
