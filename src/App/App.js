/*
$ npm install
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/styles
$ npm install "@date-io/date-fns" "@mui/lab" "date-fns"
$ npm install react-router-dom react-markdown
 */

import React from 'react'
import './App.css';
import { makeStyles } from '@mui/styles';
import { CssBaseline } from '@mui/material';
/* PAGES */
import Employees from "../pages/Employees/Employees";
import Showcase from '../pages/Showcase/Showcase'
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme.js'
import HeaderUser from '../components/PageComponents/HeaderUser';
import fotoUsuario from '../assets/images/profile-photo.png'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
// import {MenuAdministrador} from '../components/PageComponents/MenuAdministrador';
import Login from '../pages/Login/Login';
import TestIndex from '../pages/Dev/TestIndex';
import AsistenteSeccion from '../pages/AsistenteSeccion/AsistenteSeccion';
//import ContentHeader from '../components/AppMain/ContentHeader';


const useStyles = makeStyles({
  appMain: {
    // FIX:  A veces se mueve, no se por que.
    paddingTop: '150px',
    paddingLeft: '84px',
    paddingRight: '10px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  

  /* PRUEBAS (solo util para probarl login screen) */
  if (false) {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/index">
              <TestIndex />
            </Route> 
          </Switch>
          
          <Switch>
            <Route path="/login">
              <Login />
            </Route> 
          </Switch>
        </Router>
        <CssBaseline />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HeaderUser
              nombre="New Employee"
              rol="Form design with validation"
              foto={fotoUsuario}
        />
        <CssBaseline />
        </Router>
    </ThemeProvider>
  );
}

export default App;
