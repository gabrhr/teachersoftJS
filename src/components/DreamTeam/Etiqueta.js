import { Box, Alert } from '@mui/material'
import React from 'react'

export default function Etiqueta(props) {
    const { text, type } = props
    return (
        <Box //display="flex"
            // transform="scale(0.5)"   // FIXME: No funciona :(
            alignItems="center" justifyContent="center"
            borderRadius="50px" overflow="hidden"
        >
            <Alert
                severity={type}
            >
                {text}
            </Alert>
        </Box>
    )
}
