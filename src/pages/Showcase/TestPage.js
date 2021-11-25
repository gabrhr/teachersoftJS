/* Author: Mitsuo
 */

/* - Drawer -> AsistenteSeccion/DeudaYDescarga/DrawerHorarioProfesor 
 */
import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';

/* SERVICES */
import * as MesaPartesService from '../../services/mesaPartesService'


export default function TestPage() {
    const { user, setUser, rol, setRol, setToken } = React.useContext(UserContext)

    function handleClick() {
        MesaPartesService.lue("roberto_mitsuo@hotmail.com")
            .then(data => {
                setUser(data.user)
                setRol(data.user.persona.tipo_persona)
                setToken(data.token)
            })
    }

    return (
        <>
            <Controls.Button
                variant="outlined"
                text="lue"
                onClick={() => handleClick()}
            />
        </>
    )
}
