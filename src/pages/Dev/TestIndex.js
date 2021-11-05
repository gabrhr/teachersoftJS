import {  Paper } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdown = `# Index of testing pages in TeacherSoft

Dev:

- [Employees.js](${window.location.origin + '/admin/employees'})
- [Showcase.js](${window.location.origin + '/admin/showcase'})
- [Login.js](${window.location.origin + '/login'})
- [TestIndex.js](${window.location.href})

Admin:

- [GestionUsuarios.js](${window.location.origin + '/admin/mantenimiento/usr'})
- [GestionDepartamento.js](${window.location.origin + '/admin/mantenimiento/dep'})
- [GestionSeccion.js](${window.location.origin + '/admin/mantenimiento/sec'})

Asistente de Seccion (as):

> [react-markdown](https://github.com/remarkjs/react-markdown)
`

/* Index page for pages being develop */
export default function TestIndex() {
    return (
        <Paper sx={{p: 4}}>
            <ReactMarkdown children={markdown} />
        </Paper>
    )
}
