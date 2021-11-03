/* Author: Gabriela
 * 
 * Top level Router that routes all pages, sidebar and headers.
 * 
 * "HeaderUser" es el componente que combina Drawer + Header(s) + (Content)Page
 * 
 * Q: Cual es la diferencia entre Router y Switch?
 * A: Switch hace que solo se seleccione 1 Route.
 * 
 * Usar Link para los redireccionamientos.  Utilizar href hace que se
 * descargue de nuevo toda la pagina.  (`Link` enables client side routing)
 * Ref: https://www.youtube.com/watch?v=yQf1KbGiwiI
 */
import React from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory, Link } from 'react-router-dom';
import HeaderUser from '../components/PageComponents/HeaderUser';
// import ProtectedRoute from '../pages/General/RouterProtected';

/* 
<Link to="/admin/showcase">
  aldkfjasldf
</Link> 
*/

/* (Content)Pages */
import Login from '../pages/Login/Login';
import Employees from '../pages/Employees/Employees';
import UserPage from '../pages/General/UserPage';
import Showcase from '../pages/Showcase/Showcase';

export default function Router1(props) {
  const { user, setUser, fotoUsuario } = props
  const history = useHistory();
  return (
    <Router>
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
          pagina={<Showcase />}
        />
      </Route>
    </Router>
  )
}
