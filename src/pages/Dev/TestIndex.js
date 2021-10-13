import {  Paper } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdown = `# Index of testing pages in TeacherSoft

- [Asistente De Seccion](${window.location.origin + '/AsistenteSeccion'})
- [Administrador](${window.location.origin + '/GestionUsuariosForm'})
- [employee](${window.location.origin + '/employee'})
- [login screen](${window.location.origin + '/login'})
- [DreamTeam components showcase](${window.location.origin + '/showcase'})
- [here](${window.location.href})
- [Gestion Usuarios](${window.location.origin + '/GestionDeUsuarios'})
- [Gestión carga cursos](${window.location.origin + '/GestionCargaCursos'})

~~~JS
console.log('hello world')
~~~

- [just a linnk](https://reactjs.com)
- [react-markdown](https://github.com/remarkjs/react-markdown)
`

/* Lists current testing pages */
export default function TestIndex() {
    return (
        <Paper sx={{p: 4}}>
            <ReactMarkdown children={markdown} />
        </Paper>
    )
}
