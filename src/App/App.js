/*
$ npm install
$ npm install @mui/material @emotion/react @emotion/styled
$ npm install @mui/styles
$ npm install "@date-io/date-fns" "@mui/lab" "date-fns"
$ npm install react-router-dom
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
import {MenuAdministrador} from '../components/PageComponents/MenuAdministrador';
import Login from '../pages/Login/Login';


const useStyles = makeStyles({
  appMain: {
    // FIX:  A veces se mueve, no se por que.
    paddingTop: '150px',
    paddingLeft: '100px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  const Hola = [
    {
      MenuAdministrador
    }
  ];

  /* PRUEBAS */
  if (false) {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/test">
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
        {/* PRUEBAS */}
        <Switch>
        </Switch>
        <HeaderUser
              nombre="New Employee"
              rol="Form design with validation"
              foto={fotoUsuario}
        />
        <div className={classes.appMain}>
          <Switch>
              <Route exact path="/">
                <Showcase />
              </Route>
              <Route path="/administrador/mantenimiento/employee">
                <Employees />
              </Route>
              <Route path="/administrador/mantenimiento/departamento">
              </Route> 
              <Route path="/showcase">
                <Showcase />
              </Route> 
              <Route path="/login">
                <Login />
              </Route> 
          </Switch>
        </div>        
        <CssBaseline />
        </Router>
    </ThemeProvider>
  );
}

export default App;
