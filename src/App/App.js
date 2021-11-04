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
import { UserProvider } from '../constants/UserContext';

// const usuarioInit = {
//   fullName: "Abel Ackermann",
//   roleName: "Administrador",
//   roleID: 2,    // 0: admin, 2: AS
//   fotoUsuario: fotoUsuario,

//   isAuthenticated: false    // true if token como cookie disponible ?
// }

function App() {

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>  
        <Router1 />
      </UserProvider>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
