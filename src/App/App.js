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

function App() {
  const [user, setUser] = React.useState({ nombres: '', rol: '' });

  useEffect(() => {
    //console.log('App: UseEffect:')
    //console.log(user)
    // console.log(localStorage.getItem('loggedUser'))
  }, [user])
<<<<<<< HEAD
  
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
=======
>>>>>>> gabrhr

  return (
    <ThemeProvider theme={theme}>
      <Router1 user={user} setUser={setUser} fotoUsuario={fotoUsuario} />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
