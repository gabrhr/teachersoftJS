/* Author: Mitsuo
 */

/* - Drawer -> AsistenteSeccion/DeudaYDescarga/DrawerHorarioProfesor 
 */
import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import HeadNotificationMisSolicitudes from '../NuevoUsuario/HeadNotificationMisSolicitudes'
import RegistroForm from '../NuevoUsuario/RegistroForm'

function _(s) {
    var alphabets =
        [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
            " ", "-", "_", ".", "&", 
            "?", "!", "@", "#", "/",
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
            "1", "2", "3", "4", "5", "6", 
            "7", "8", "9", "0", "=", ":",
        ];
    var alphabets13 =
        [
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
            "?", "!", "@", "#", "/",
            " ", "-", "_", ".", "&", 
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            "7", "8", "9", "0", "=", ":",
            "1", "2", "3", "4", "5", "6", 
        ];

    var resultStr = [];
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < alphabets.length; j++) {
            if (s[i] === alphabets[j]) {
                resultStr.push(alphabets13[j]);
            }
        }
    }
    return resultStr.join("");
};

export default function TestPage() {
    // let data = "http://front.teachersoft.solutions/invitado/atender/103&roberto_mitsuo@hotmail.com"
    let data = "103&roberto_mitsuo@hotmail.com"

    let params = data.split('&')

    if (data === _(_(data)) && parseInt(params[0]) === 103)
        window.alert('yay')

    return (
        <>
            {/* <HeadNotificationMisSolicitudes />
            <RegistroForm /> */}
            <Typography children={data} />
            <Typography children={_(data)} />
            <Typography children={_(_(data))} />
            <Typography children={parseInt(params[0])} />
            <Typography children={params[1]} />
        </>
    )
}
