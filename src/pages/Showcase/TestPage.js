/* Author: Mitsuo
 */

/* - Drawer -> AsistenteSeccion/DeudaYDescarga/DrawerHorarioProfesor 
 */
import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import AccordionHorarioProfesor from '../AsistenteSeccion/CargaDocente/AccordionHorarioProfesor'

export default function TestPage() {
    return (
        <>
            <Typography>
                Accordion
            </Typography>
            <AccordionHorarioProfesor/>

            <Typography>
                Que seguira??
            </Typography>
        </>
    )
}
