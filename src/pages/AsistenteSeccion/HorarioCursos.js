import React from 'react'
import { Typography } from '@mui/material';
import { DT } from '../../components/DreamTeam/DT'
import { Controls } from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';

export default function HorarioCursos() {
    return (
        <Form>
            <Typography variant="h4"
                color="primary"
            >
                Horario de Cursos
            </Typography>
        </Form>
    )
}
