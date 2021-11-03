/* Author: Gabriela
 * 
 * Top level Router that routes all pages, sidebar and headers.
 * 
 * Cual es la diferencia entre Router y Switch?
 * 
 * "HeaderUser" es el componente que combina Drawer + Header(s) + (Content)Page
 */
import React from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import HeaderUser from '../components/PageComponents/HeaderUser';
// import ProtectedRoute from '../pages/General/RouterProtected';

/* (Content)Pages */
import Login from '../pages/Login/Login';
import Employees from '../pages/Employees/Employees';
import UserPage from '../pages/General/UserPage';
import Showcase from '../pages/Showcase/Showcase';

export default function Router1(props) {
    const { user, setUser, fotoUsuario } = props
    const history = useHistory();
    return (
        <BrowserRouter>
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
            <Route exact path="/admin/showcase">
                <HeaderUser
                    //   nombre={user.nombres}
                    //   idRol= {user.rol}
                    //   foto={fotoUsuario}
                    nombre="New Employee"
                    rol="Administrador"
                    idRol={1}      // admin: 0, as: 1
                    foto={fotoUsuario}
                    // pagina={Showcase}        // esta forma no funciona,
                                                // que raro
                    pagina={<Showcase/>}
                />  
            </Route>
          </Switch>
        </BrowserRouter>
    )
}
