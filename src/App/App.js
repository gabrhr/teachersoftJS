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
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
// import {MenuAdministrador} from '../components/PageComponents/MenuAdministrador';
import Login from '../pages/Login/Login';
import { FamilyRestroomOutlined, FormatColorResetSharp } from '@mui/icons-material';
import Employees from '../pages/Employees/Employees';
import UserPage from '../pages/General/UserPage';
//import ContentHeader from '../components/AppMain/ContentHeader';
// import ProtectedRoute from './RouterProtected';

function App() {
  //const classes = useStyles();
  // const Hola = [
  //   {
  //     MenuAdministrador
  //   }
  // ];

  /* PRUEBAS */
  //if (true) {
  /* PRUEBAS (solo util para probarl login screen) */
  const [user, setUser] = React.useState({nombres: '', rol: ''});
  const history = useHistory();

  useEffect(() => {
    //console.log('App: UseEffect:')
    //console.log(user)
    // console.log(localStorage.getItem('loggedUser'))
  }, [user])
  
  if (false) {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login 
                setUser={setUser}
              />
              </Route>
            <Route exact path="/login">
              <Login 
                setUser={setUser}
              />
              </Route>
            <Route exact path="/:thing?">
              <Login 
                setUser={setUser}
            />
            </Route>
          </Switch>
          
          <HeaderUser
              nombre={user.nombres}
              idRol= {user.rol}
              foto={fotoUsuario}
          />  
        </Router>
        <CssBaseline />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Route exact path="/" component={Login} />
        <Route exact path="/ok" component={Employees} /> */}
          {/* "HeaderderUser" (main)
              > {Hpucp, H2user, sidebar, "UserPage" (content)}  
                > {router (the thing that loads all other things)}
          */}
          <HeaderUser
              nombre="New Employee"
              rol="Administrador"
              idRol= {0}
              foto={fotoUsuario}
        /> 
        <CssBaseline />
      </Router>
    </ThemeProvider>  
  );
}

export default App;
