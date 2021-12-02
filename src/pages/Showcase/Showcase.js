/* Author: Mitsuo
 * Date: 2021-11-27
 * 
 * Si crean algun componente por favor listarlo aqui para agregarlo cuando
 * tenga tiempo:
 * - 
 */
import React from 'react'
import { Paper, Typography } from '@mui/material';

import TypographyPage from "./TypographyPage";
import ButtonsPage from "./ButtonsPage";
import TablePage from "./TablePage";
import UtilPage from "./UtilPage";
import DTPage from "./DTPage";
import TestPage from "./TestPage";
import TestPage3 from "./TestPage3";
import TimePickerPage from './TimePickerPage';
import FormControlsPage from './FormControlsPage';

/* static MUI CSS (export it if it's going to be used a lot) */
const paperCSS = {
    m: 5, p: 3,
    minHeight: "400px"
}

export default function Employees() {
    return (
        <>
            <Typography variant="h1">
                Showcasing DreamTeam Components
            </Typography>

            <Paper sx={{...paperCSS}} elevation={2}>
                <Typography align="center" children="Typography" />
                <TypographyPage/>
            </Paper>

            <Paper sx={{...paperCSS}} elevation={4}>
                <Typography align="center" children="Form Controls" />
                <FormControlsPage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={6}>
                <Typography align="center" children="Buttons" />
                <ButtonsPage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={8}>
                <Typography align="center" children="Table" />
                <TablePage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={12}>
                <Typography align="center" children="util" />
                <UtilPage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={14}>
                <Typography align="center" children="DT (DreamTeam)" />
                <DTPage />
            </Paper>

            {/* TESTS Mitsuo */}
            <Paper sx={{...paperCSS}} elevation={24}>
                <Typography align="center" children="test zone Mitsuo" />
                <TestPage/>
            </Paper>

            {/* TESTS Gabriela */}
            <Paper sx={{...paperCSS}} elevation={24}>
                <Typography align="center" children="test zone Gabriela" />
                <Typography children="Picker en un rango determinado"/>
                {/* <TimePickerPage/> */}
            </Paper>

            {/* TESTS Manuel */}
            <Paper sx={{...paperCSS}} elevation={24}>
                <Typography align="center" children="test zone Manuel" />
                <TestPage3/>
            </Paper>
        </>
    )
}
