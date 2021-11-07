/* Author: Mitsuo
 * 
 * Page to display Input elements (aka. Form Controls)
 */
import React from 'react'
import { Alert } from '@mui/material';
import ControlForm from './ControlForm'

export default function FormControlsPage() {
    return (
        <>
            <Alert sx={{ m: 2 }} variant="outlined" severity="info">
                Utiliza Hooks,  que se obtienen de {"useForm()"}
            </Alert>
            <Alert sx={{m: 2}} variant="outlined" severity="info">
                Todo debe estar dentro de {"<Form\>"}
            </Alert>
            <ControlForm />
        </>
    )
}
