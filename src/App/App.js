/*
$ npm install
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/styles
$ npm install "@date-io/date-fns" "@mui/lab" "date-fns"
$ npm install react-router-dom react-markdown
$ npm install xlsx
 */

import React, { useEffect } from 'react'
import './App.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js'
import Router1 from '../constants/Router1'

import fotoUsuario from '../assets/images/profile-photo.png'

const usuarioInit = {
  fullName: "Abel Ackermann",
  roleName: "Administrador",
  roleID: 2,    // 0: admin, 2: AS
  fotoUsuario: fotoUsuario,

  isAuthenticated: false    // true if token como cookie disponible ?
}

function App() {
  const [usuario, setUsuario] = React.useState(usuarioInit)

  return (
    <ThemeProvider theme={theme}>
      <Router1 usuario={usuario} setUsuario={setUsuario}/>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
