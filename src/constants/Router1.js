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
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
import LoginPrueba from '../App/prueba';
import { useGoogleLogout } from 'react-google-login';
import { Controls } from '../components/controls/Controls';
import { useHistory, Redirect } from "react-router"


function Button(){
  const history = useHistory();
  const clientId = "626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com";
  const onLogoutSuccess = () => {
    // setRole({});
    localStorage.clear();
      history.push("/")
  }
  const onLogoutFailure = (response) => {
      console.log(response)
            
  }
  const {signOut} = useGoogleLogout({
      clientId,
      onLogoutSuccess,
      onLogoutFailure,
  })

  return (
      <div>
          <Controls.Button
              variant="outlined"
              size='small'
              fullWidth
              text="Cerrar"
              onClick={signOut} 
            /> 
      </div>
  )

}

export default function Router1(props) {
  const { user, setUser, fotoUsuario } = props
  return (
    <Router>
      <Route exact path="/admin">
        <div>No rol hola soy admin  </div>
      </Route>
      <Route exact path="/noRoles">
        <>
        <div>Espere a ser asignado     </div>
        <Button/>
        </>
      </Route>
      <Route exact path="/">
        <Login/>
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
    </Router>
  )
}
