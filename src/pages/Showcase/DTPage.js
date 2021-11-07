/* Author: Mitsuo
 */
import React from 'react'
import { Typography, Box, Stack, Divider } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import { Controls } from '../../components/controls/Controls'

function EjemploBorderBox() {
    return (
        <>
            <Typography>
                BorderBox.  Rodeando un cuadrado.
            </Typography>
            <DT.BorderBox>
                <Box bgcolor="cyan" width="100px" height="100px">
                </Box>
            </DT.BorderBox>
        </>
    )
}

function EjemploEtiqueta() {
    return (
        <>
            <Typography children="Etiqueta.  Hay que hacerla mas pequeña" />

            <Typography children="MUI" />
            <Stack direction="row" spacing={1}>
                <DT.Etiqueta type="error" text="error"/>
                <DT.Etiqueta type="info" text="info"/>
                <DT.Etiqueta type="success" text="success"/>
                <DT.Etiqueta type="warning" text="warning"/>
            </Stack>

            <Typography children="Carga Docente" />
            <Stack direction="row" spacing={1}>
                <DT.Etiqueta type="pendiente" text="pendiente"/>
            </Stack>

            <Typography children="Mesa Partes" />
            <Stack direction="row" spacing={1}>
                <DT.Etiqueta type="enviado"/>
                <DT.Etiqueta type="enRevision"/>
                <DT.Etiqueta type="delegado"/>
                <DT.Etiqueta type="atendido"/>
            </Stack>
        </>
    )
}

function EjemploDivider() {
    const s = "`Controls.Divider`.  Un divider horizontal mas delgadito."
    return (
        <>
            <Typography children={s}/>
            <div style={{
                padding: "10px", 
                width: "100%",
                border: "1px solid"
            }}>
                <Controls.Divider/>
            </div>

            <Typography children="vs. MuiDivider horizontal flexItem"/>
            <div style={{
                padding: "10px", 
                width: "100%",
                border: "1px solid"
            }}>
                <Divider orientation="horizontal" flexItem />
            </div>

            <Typography children="vs. MuiDivider"/>
            <div style={{
                padding: "10px", 
                width: "100%",
                border: "1px solid"
            }}>
                <Divider/>
            </div>

            <Typography children="*Todos dentro de una cajita con 10px de padding" />
        </>
    )
}

function EjemploTitle() {
    return (
        <>
            <Typography children="Titulos de DreamTeam (Figma, pero sans-serif)"/>
            <DT.Title size="big" text="Titulo (size='big')"/>
            <DT.Title size="medium" text="Subtitulo (size='medium')"/>
            <DT.Title size="small" text="SubSubtitulo (size='small')"/>
        </>
    )
}

function EjemploFileButton() {
    return (
        <>
            <Typography children="FileButton" />
            <DT.FileButton />
        </>
    )
}

export default function DTPage() {
    const importstmt = "import { DT } from '../../components/DreamTeam/DT'"

    return (
        <>
            <Typography 
                sx={{
                    fontFamily: "monospace",
                    whiteSpace: "pre"
                }}
                children={importstmt}
            />
            <Stack
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
                spacing={2}
            >
                <EjemploEtiqueta />
                <EjemploBorderBox />
                <EjemploDivider />
                <EjemploTitle />
                <EjemploFileButton />
            </Stack>
        </>
    )
}
