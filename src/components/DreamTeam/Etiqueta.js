import { Box, Alert } from '@mui/material'
import React from 'react'

export default function Etiqueta(props) {
    const { text, type, ...other } = props
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
