/* Author: Mitsuo
 */
import React from 'react'
import { Typography, Box } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import { Controls } from '../../components/controls/Controls'

export default function DTPage() {
    return (
        <div>
            <Typography>
                Etiqueta.  Hay que hacerla mas pequeña
            </Typography>
            <DT.Etiqueta
                type="pendiente"       // error | info | success | warning | pendiente
                text="Pendiente"
            />

            <Typography>
                BorderBox.  Rodeando un cuadrado.
            </Typography>
            <DT.BorderBox>
                <Box bgcolor="cyan" width="100px" height="100px">
                </Box>
            </DT.BorderBox>

            <Typography>
                {"Simple Divider.  OJO que esta en `Controls` y no en `DT`"}
            </Typography>
            <Controls.Divider/>

            <Typography>
                Title.  El mismo de "ContentHeader.js"
            </Typography>
            <DT.Title text="Ejemplo Titulo DreamTeam" />
        </div>
    )
}
