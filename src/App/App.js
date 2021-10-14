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
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
// import {MenuAdministrador} from '../components/PageComponents/MenuAdministrador';
import Login from '../pages/Login/Login';
//import ContentHeader from '../components/AppMain/ContentHeader';

function App() {
  /* PRUEBAS (solo util para probarl login screen) */
  if (true){
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
      <Router forceRefresh={false}>
        <div clasName = "classes.root" >
          <Switch>
            <Route
              exact
              path = "/"
              idRoles = {[2, 5]}
            />
            <Route
              exact
              path = "/Administrador/mantenimiento"
              idRoles = {[1, 3]}
              //component = { (props) => gestionar({
              //...props.location.state,
              //}) }
            />
            <Route
              exact
              path = "activate/:token"
              //component = {ActivateLogin}
            />
            <Router
              exact
              path = "/resetPassword/:email/:token"
              //component = {ResetPassword}
            />
            <Route
              exact
              path = "/NoRoles"
              //component = {NoRoles}
            />
            <Route exact path = "/" component = {Login}/>
            <Route exact path = "/login/:thing?" component = {Login} />
            <Route exact path = "/prueba/1"/>
            <Route default component = {Login} />
          </Switch>
          /*
          <HeaderUser
            nombre="New Employee"
            rol="Administrador"
            idRol= {1}
            foto={fotoUsuario}
          />
          */
          <CssBaseline />
        </div>
        </Router>
      </ThemeProvider>
      );
}

export default App;
