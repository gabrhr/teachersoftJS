import React from 'react'
import { Paper } from '@mui/material'
import Header1 from '../../constants/Header1'
import RegistroForm from './RegistroForm'
import HeadNotificationMisSolicitudes from './HeadNotificationMisSolicitudes'
import Header2 from '../../constants/Header2'

export default function Registro() {
    return (
        <>
            <Header1/>
            <Header2/>
            <Paper sx={{m: 16, p: 5}}>
                <HeadNotificationMisSolicitudes/>
                <RegistroForm/>
            </Paper>
        </>
    )
}
