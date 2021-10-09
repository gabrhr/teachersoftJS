/*
$ npm install
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/styles
 */

import React from 'react'
import './App.css';
import SideMenu from '../components/SideMenu';
import { makeStyles } from '@mui/styles';
import Header from '../components/PageComponents/Header';
import { CssBaseline } from '@mui/material';
import Employees from "../pages/Employees/Employees";
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme.js'
import { AppBar, Grid, IconButton, Button, Toolbar, Badge } from '@mui/material'
import HeaderUser from '../components/PageComponents/HeaderUser';
import fotoUsuario from '../assets/images/profile-photo.png'


const useStyles = makeStyles({
  appMain: {
    paddingTop: '200px',
    paddingLeft: '200px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  return (
    //<React.Fragment>
    <ThemeProvider theme={theme}>
      <HeaderUser
            nombre="New Employee"
            rol="Form design with validation"
            foto={fotoUsuario}
      />
      <div className={classes.appMain}>
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
