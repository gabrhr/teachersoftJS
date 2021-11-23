/* Author: Mitsuo
 */

/* - Drawer -> AsistenteSeccion/DeudaYDescarga/DrawerHorarioProfesor 
 */
import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import HeadNotificationMisSolicitudes from '../NuevoUsuario/HeadNotificationMisSolicitudes'
import RegistroForm from '../NuevoUsuario/RegistroForm'

export default function TestPage() {
    return (
        <>
            <HeadNotificationMisSolicitudes />
            <RegistroForm />
        </>
    )
}
