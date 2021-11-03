/* Author: Mitsuo
 * Date: 2021-11-27
 */
import React from 'react'
import ControlForm from './ControlForm'
import { Paper, Typography, Box, Alert } from '@mui/material';
import TypographyPage from "./TypographyPage";
import ButtonsPage from "./ButtonsPage";
import TablePage from "./TablePage";
import UtilPage from "./UtilPage";
import DTPage from "./DTPage";
import TestPage from "./TestPage";
import { useGoogleAuth } from '../Login/googleAuth';

/* static MUI CSS (export it if it's going to be used a lot) */
const paperCSS = {
    m: 5, p: 3
}

/* extra components to don't evolve return into mess */
function CenteredTitle(props) {
    const { text } = props
    return (
        /* <Box display="flex" width={1} alignItems="center"> */
        <Box textAlign="center">
            <Typography>{text}</Typography>
        </Box>
    )
}

export default function Employees() {
            
    return (
        <>
        
            <Typography variant="h1"  component="div">
                Showcasing DreamTeam Components
            </Typography>

            <Paper sx={{...paperCSS}} elevation={2}>
                <CenteredTitle text="Typography"/>
                <TypographyPage/>
            </Paper>

            <Paper sx={{...paperCSS}} elevation={4}>
                <CenteredTitle text="Form Controls"/>
                <Alert sx={{ m: 2 }} variant="outlined" severity="info">
                    Utiliza Hooks,  que se obtienen de {"useForm()"}
                </Alert>
                <Alert sx={{m: 2}} variant="outlined" severity="info">
                    Todo debe estar dentro de {"<Form\>"}
                </Alert>
                <ControlForm />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={6}>
                <CenteredTitle text="Buttons"/>
                <ButtonsPage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={8}>
                <CenteredTitle text="Table"/>
                <TablePage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={12}>
                <CenteredTitle text="util"/>
                <UtilPage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={14}>
                <CenteredTitle text="DT (DreamTeam)"/>
                <DTPage />
            </Paper>

            <Paper sx={{...paperCSS}} elevation={24}>
                <CenteredTitle text="test"/>
                <TestPage/>
            </Paper>
        </>
    )
}
