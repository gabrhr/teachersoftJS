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
import React, {useContext} from 'react'
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
import ProtectedRoute from '../pages/General/RouterProtected';
import { UserContext } from './UserContext';


function Button(){
  const history = useHistory();
  const clientId = "626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com";
  const {rol,user, setRol,setUser} = useContext(UserContext)
  const onLogoutSuccess = () => {
    /* setRol({}); */
    //setUser({}) 
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
      <Switch>
      <ProtectedRoute exact path="/admin"
        idRoles={[1,8]}
        component={Employees}
        />
      <ProtectedRoute exact path="/noRoles" idRoles={[8]} >
        <>
        <div>Espere a ser asignado     </div>
        <Button/>
        </>
      </ProtectedRoute>
      <ProtectedRoute exact path="/admin/showcase" idRoles={[2]} 
        componente ={ () => 
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
        }/>
       
      <Route exact path="/" >
        <Login/>
      </Route>
      </Switch>
    </Router>
  )
}
