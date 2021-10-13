/*
$ npm install
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/styles
$ npm install "@date-io/date-fns" "@mui/lab" "date-fns"
$ npm install react-router-dom react-markdown
 */

import React from 'react'
import './App.css';
import { CssBaseline } from '@mui/material';
/* PAGES */
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme.js'
import HeaderUser from '../components/PageComponents/HeaderUser';
import fotoUsuario from '../assets/images/profile-photo.png'
import { BrowserRouter as Router } from 'react-router-dom';
// import {MenuAdministrador} from '../components/PageComponents/MenuAdministrador';
import Login from '../pages/Login/Login';
//import ContentHeader from '../components/AppMain/ContentHeader';

function App() {
  /* PRUEBAS (solo util para probarl login screen) */
  if (false) {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Login />
        </Router>
        <CssBaseline />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Router >
        <HeaderUser
              nombre="New Employee"
              rol="Administrador"
              idRol= {1}
              foto={fotoUsuario}
        />
        <CssBaseline />
        </Router>
    </ThemeProvider>
  );
}

export default App;
