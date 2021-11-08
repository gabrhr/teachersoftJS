/* Author: Gabriela, Mitsuo
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
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import DTRoute from './DTRoute'
import PrivateRoute from './PrivateRoute'

/* Pages */
import Login from '../pages/Login/Login';
import Employees from '../pages/Employees/Employees';
import Showcase from '../pages/Showcase/Showcase'
import TestIndex from '../pages/Dev/TestIndex';
import AsistenteSeccion from '../pages/AsistenteSeccion/GestionAsignacionCarga/AsistenteSeccion';
import GestionCargaCursos from '../pages/AsistenteSeccion/GestionAsignacionCarga/GestiónCargaCursos';
import GestionDepartamento from '../pages/Administrador/MantenimientoDepartamento/GestionDepartamento'
import GestionSeccion from '../pages/Administrador/MantenimientoSeccion/GestionSeccion'
import CargaDocente from '../pages/AsistenteSeccion/CargaDocente/CargaDocente';
import Vacio from '../pages/Dev/Vacio'
import GestionUsuarios from '../pages/Administrador/GestionUsuarios/GestionUsuarios';
import DeudaYDescarga from '../pages/AsistenteSeccion/DeudaYDescarga/DeudaYDescarga';
import { RouterSharp } from '@mui/icons-material';
import HeaderUser from '../components/PageComponents/HeaderUser';
import { UserContext } from './UserContext';
import MisSolicitudes from '../pages/MesaPartes/MisSolicitudes';
import SolicitudDetalle from '../pages/MesaPartes/SolicitudDetalle';
import NuevaSolicitudForm from '../pages/MesaPartes/NuevaSolicitudForm';

/* Todos menos el login que es especial porque settea al usuario */
const privateroutes = [
  /* Admin */
  { requireRoles: [0,8], path: "/admin", page: GestionUsuarios },
  { requireRoles: [0,8], path: "/admin/mantenimiento", page: GestionUsuarios },
  { requireRoles: [0,8], path: "/admin/mantenimiento/usr", page: GestionUsuarios },
  { requireRoles: [0,8], path: "/admin/mantenimiento/dep", page: GestionDepartamento },
  { requireRoles: [0,8], path: "/admin/mantenimiento/sec", page: GestionSeccion },
  { requireRoles: [0,8], path: "/admin/mantenimiento/per", page: Vacio },
  { requireRoles: [0,1,2,3,4,5,6,7,8], path: "/admin/showcase", page: Showcase },
  { requireRoles: [0,8], path: "/admin/index", page: TestIndex },
  { requireRoles: [0,8], path: "/admin/employees", page: Employees },
  /* Docente */
  /* TODO: Remover rol 8 (acceso temporal) */
  { requireRoles: [0,1,8], path: "/doc/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [0,1,8], path: "/doc/solicitudDetalle", page: SolicitudDetalle },
  { requireRoles: [0,1,8], path: "/doc/NuevaSolicitudForm", page: NuevaSolicitudForm },
  /* AS */
  { requireRoles: [2, 8], path: "/as", page: AsistenteSeccion },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCursos", page: AsistenteSeccion },
  // { requireRoles: [2], path: "/as/asignacionCarga/registroCursos", page: GestionCargaCursos },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCarga", page: CargaDocente },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/deudaYDescarga", page: DeudaYDescarga },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/cursos", page: GestionCargaCursos },
  { requireRoles: [2], path: "/as/solicitudDocencia", page: Vacio },
  { requireRoles: [2], path: "/as/docentes", page: Vacio },
  { requireRoles: [2], path: "/as/mesaPartes", page: Vacio },
  /* CS */
  /* AD */
  /* CD */
  /* Secretario de D */
  /* Externo */
  /* rol sin asignar */
]


const publicroutes = [
  { requireRoles: [], path: "/noRoles", page: Vacio },
]

export default function Router1(props) {
  return (
    <Router>
      <Switch>
        {/* Rutas protegidas */}
        {privateroutes.map(r =>
          <PrivateRoute exact path={r.path} 
          requireRoles={r.requireRoles}
          component={() =>
            <HeaderUser
            pagina={r.page}
            />
          }
          >
          </PrivateRoute>
        )}
        {/* Rutas no protegidas */}
        {/* {publicroutes.map(r =>
          <Route exact path={r.path} 
          render={({location}) =>
          <HeaderUser
          pagina={r.page}
          />
        }
        >
          </Route>
        )} */}
        {/* Login */}
        <Route exact path="/login" children={Login} />
        <Route exact path="/" children={Login} />
      </Switch>
    </Router>
  )
}
