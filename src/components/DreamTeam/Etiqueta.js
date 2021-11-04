import { Box, Alert } from '@mui/material'
import React from 'react'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export default function Etiqueta(props) {
    let { text, type, ...other } = props

    if (type === "pendiente") {
        other.icon = (<AccessTimeOutlinedIcon/>)
        other.color= "pendiente"
    }

    return (
        <Box //display="flex"
            // transform="scale(0.5)"   // FIXME: No funciona :(
            alignItems="center" justifyContent="center"
            borderRadius="50px" overflow="hidden"
            m={1}
        >
            <Alert
                severity={type}
                {...other}
            >
                {text}
            </Alert>
        </Box>
    )
}
