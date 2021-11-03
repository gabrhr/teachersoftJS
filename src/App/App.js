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
import { CssBaseline, formLabelClasses } from '@mui/material';
/* PAGES */
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme.js'
import HeaderUser from '../components/PageComponents/HeaderUser';
import fotoUsuario from '../assets/images/profile-photo.png'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
// import {MenuAdministrador} from '../components/PageComponents/MenuAdministrador';
import Login from '../pages/Login/Login';
import { FamilyRestroomOutlined, FormatColorResetSharp } from '@mui/icons-material';
import Employees from '../pages/Employees/Employees';
import UserPage from '../pages/General/UserPage';
//import ContentHeader from '../components/AppMain/ContentHeader';

import ProtectedRoute from '../pages/General/ProtectedRoute';
import GestionUsuarios from '../pages/Administrador/GestionUsuarios/GestionUsuarios';
import PublicRoute from '../pages/General/PublicRoute';
import LoginPrueba from './prueba';

import TestHeaderUser from '../pages/Dev/TestHeaderUser'
import { useGoogleAuth } from '../pages/Login/googleAuth';

function App() {
  /* PRUEBAS */
  //if (true) {
  /* PRUEBAS (solo util para probarl login screen) */
  const [user, setUser] = React.useState({nombres: '', rol: ''});
  
  if (true) {
    return (
      <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              
              <ProtectedRoute exact path="/admin" idRoles={[1]} component={() => 
                <TestHeaderUser 
                  nombre= "hola"
                  rol="Administrador"
                  idRol= {1}      // admin: 0, as: 1
                  foto={fotoUsuario}              
                />} 
              />
              <ProtectedRoute exact path="/as" idRoles={[2]} component={() => 
                <TestHeaderUser 
                  nombre= "hola mundo"
                  rol="Administrador"
                  idRol= {2}      // admin: 0, as: 1
                  foto={fotoUsuario}              
                />} 
              />
              
              <PublicRoute exact path="/" component={LoginPrueba} />
            </Switch>
          </Router>
        <CssBaseline />
      </ThemeProvider>
    )
  }

  /* return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Route exact path="/" component={Login} />
        <Route exact path="/ok" component={Employees} /> */}
          {/* "HeaderderUser" (main)
              > {Hpucp, H2user, sidebar, "UserPage" (content)}  
                > {router (the thing that loads all other things)}
          }
          <HeaderUser
              nombre="Pedro Picapiedra"
              rol="Administrador"
              idRol= {1}      // admin: 0, as: 1
              foto={fotoUsuario}
        /> 
        <CssBaseline />
      </Router>
    </ThemeProvider>  
  ); */
}

export default App;
