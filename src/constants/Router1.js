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
import CargaDocenteHorarios from '../pages/AsistenteSeccion/CargaDocente/CargaDocenteHorarios';
import Vacio from '../pages/Dev/Vacio'
import GestionUsuarios from '../pages/Administrador/GestionUsuarios/GestionUsuarios';
import DeudaYDescarga from '../pages/AsistenteSeccion/DeudaYDescarga/DeudaYDescarga';
import CursosForm from '../pages/AsistenteSeccion/MantenimientoCursos/CursosForm';
import DocentesForm from '../pages/AsistenteSeccion/MantenimientoDocentes/DocentesForm';
import { RouterSharp } from '@mui/icons-material';
import HeaderUser from '../components/PageComponents/HeaderUser';
import { UserContext } from './UserContext';
import NoAsignado from './NoAsignado'
import MisSolicitudes from '../pages/MesaPartes/MisSolicitudes';
import RecepcionSolicitud from '../pages/MesaPartes/RecepcionSolicitud'
import SolicitudesDelegadasAMi from '../pages/MesaPartes/SolicitudesDelegadasAMi'
import SolicitudDetalle from '../pages/MesaPartes/SolicitudDetalle';
import RecepcionDetalleSolicitud from '../pages/MesaPartes/RecepcionDetalleSolicitud';
import DelegadoSolicitudDetalle from '../pages/MesaPartes/DelegadoSolicitudDetalle';
import NuevaSolicitudForm from '../pages/MesaPartes/NuevaSolicitudForm';
import CargaDocenteCursos from '../pages/AsistenteDepartamento/cargaDocenteCursos';
import CargaArchivos from '../pages/MesaPartes/CargaArchivos';
import GestionTemaTramite from '../pages/MesaPartes/GestionTemaTramite/GestionTemaTramite';
import CargaDocenteCoord from '../pages/CoordinadorSeccion/CargaDocente/CargaDocente';
//import NoAsignado from './NoAsignado'
import DragDropArchivos from '../pages/MesaPartes/DragDropArchivos';
import ErrorDireccionamiento from '../pages/Dev/Error404';
import Registro from '../pages/NuevoUsuario/Registro';
import LandingPage from '../constants/LandingPage'
/* Todos menos el login que es especial porque settea al usuario */
const privateroutes = [
  /* Admin */
  { requireRoles: [0], path: "/admin/mantenimiento/usr", page: GestionUsuarios },
  { requireRoles: [0], path: "/admin/mantenimiento/dep", page: GestionDepartamento },
  { requireRoles: [0], path: "/admin/mantenimiento/sec", page: GestionSeccion },
  { requireRoles: [0], path: "/admin/mantenimiento/per", page: Vacio },
  { requireRoles: [0,1,2,3,4,5,6,7,8], path: "/admin/showcase", page: Showcase },
  { requireRoles: [0], path: "/admin/index", page: TestIndex },
  { requireRoles: [0], path: "/admin/employees", page: Employees },
  /* Docente */
  /* TODO: Remover rol 8 (acceso temporal) */
  { requireRoles: [0,1,8], path: "/doc/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [0,1,8], path: "/doc/solicitudDetalle", page: SolicitudDetalle },
  { requireRoles: [0,1,8], path: "/doc/NuevaSolicitudForm", page: NuevaSolicitudForm },
  { requireRoles: [0,1,8], path: "/doc/misDelegados", page: SolicitudesDelegadasAMi },
  { requireRoles: [0,1,8], path: "/doc/misDelegados/solicitudDetalle", page:  DelegadoSolicitudDetalle},
  
  // PRUEBA DRAG DROP MULTIPLE FILES //
  { requireRoles: [0,8], path: "/dragdrop", page: DragDropArchivos},
  
  /* AS */
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCursos", page: AsistenteSeccion },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCarga", page: CargaDocente },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/deudaYDescarga", page: DeudaYDescarga },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/cursos", page: GestionCargaCursos },
  { requireRoles: [2, 8], path: "/as/docentes", page: DocentesForm },
  { requireRoles: [2, 8], path: "/as/cursos", page: CursosForm  },
  { requireRoles: [2], path: "/as/mesaPartes/misSolicitudes", page: Vacio },
  { requireRoles: [2], path: "/as/mesaPartes/misDelegados", page: Vacio },
  { requireRoles: [0,8], path: "/aea", page: CargaArchivos },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCarga/horarios", page: CargaDocenteHorarios},
  /* CS*/
  { requireRoles: [3, 8, 2], path: "/cord/asignacionCarga/registroCursos", page: AsistenteSeccion },
  { requireRoles: [3, 8, 2], path: "/cord/asignacionCarga/registroCarga", page: CargaDocenteCoord },
  { requireRoles: [3], path: "/cord/asignacionCarga/deudaYDescarga", page: DeudaYDescarga },
  { requireRoles: [3], path: "/cord/asignacionCarga/cursos", page: GestionCargaCursos },
  { requireRoles: [3], path: "/cord/solicitudDocencia", page: Vacio },
  { requireRoles: [3], path: "/cord/docentes", page: Vacio },
  { requireRoles: [3], path: "/cord/mesaPartes/misSolicitudes", page: Vacio },
  { requireRoles: [3], path: "/cord/mesaPartes/misDelegados", page: Vacio },  

  /* AD */
  { requireRoles: [0, 1, 2, 4, 8], path: "/ad", page: CargaDocenteCursos },
  { requireRoles: [0, 1, 2, 4, 8], path: "/ad/asignacionCarga", page: CargaDocenteCursos },
  { requireRoles: [4], path: "/ad/docentes", page: Vacio },
  { requireRoles: [4], path: "/ad/panelIndicadores", page: Vacio },
  { requireRoles: [4], path: "/ad/mesaPartes/misSolicitudes", page: Vacio },
  { requireRoles: [4], path: "/ad/mesaPartes/misDelegados", page: Vacio },  
  /* JD */
  { requireRoles: [5], path: "/jd/asignacionCarga", page: Vacio },
  { requireRoles: [5], path: "/jd/docentes", page: Vacio },
  { requireRoles: [5], path: "/jd/panelIndicadores", page: Vacio },
  { requireRoles: [5], path: "/jd/mesaPartes/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [5], path: "/jd/mesaPartes/misDelegados", page: SolicitudesDelegadasAMi },  
  { requireRoles: [5], path: "/jd/mesaPartes/solicitudDetalle", page: DelegadoSolicitudDetalle },  
  /* Secretario de D */
  { requireRoles: [6], path: "/secretaria/mesaPartes/solicitudesGenerales", page: RecepcionSolicitud },
  { requireRoles: [6], path: "/secretaria/mesaPartes/solicitudDetalle", page: RecepcionDetalleSolicitud },
  { requireRoles: [6], path: "/secretaria/mantenimiento/temaTramite", page: GestionTemaTramite },  
  /* Externo */
  { requireRoles: [7], path: "/invitado/mesaPartes/misSolicitudes", page: MisSolicitudes},  
  { requireRoles: [7], path: "/invitado/mesaPartes/solicitudDetalle", page: SolicitudDetalle },  
]


const publicroutes = [
  { requireRoles: [], path: "/noRoles", page: Vacio },
]

export default function Router1(props) {
  const  user = JSON.parse(localStorage.getItem("user"))
  const  rol = JSON.parse(localStorage.getItem("rol"))

  function generateRouteRol(rol){
    switch (rol) {
    case 0:
          return "/admin"
      case 1:
          return "/doc"
      case 2:
          return "/as"
      case 3:
          return "/cord"
      case 4:
          return "/ad"
      case 5:
          return "/jd"
      case 6:
          return "/secretaria"
      case 6:
        return "/invitado"
    default:
        //return "/noRoles"
        return "/registro"
    }
  }

  return (
    <Router>
      <Switch>
        {/* Rutas protegidas */}
        <PrivateRoute exact path="/admin" requireRoles={[0]}>
             <Redirect to="/admin/mantenimiento/usr" />
        </PrivateRoute>
        <PrivateRoute exact path="/doc" requireRoles={[1]}>
             <Redirect to="/doc/misSolicitudes" />
        </PrivateRoute>
        <PrivateRoute exact path="/as" requireRoles={[2]}>
             <Redirect to="/as/asignacionCarga/registroCursos" />
        </PrivateRoute>
        <PrivateRoute exact path="/cord" requireRoles={[3]}>
             <Redirect to="/cord/asignacionCarga/registroCursos" />
        </PrivateRoute>
        <PrivateRoute exact path="/ad" requireRoles={[4]}>
             <Redirect to="/ad/asignacionCarga" />
        </PrivateRoute>
        <PrivateRoute exact path="/jd" requireRoles={[5]}>
             <Redirect to="/jd/asignacionCarga" />
        </PrivateRoute>
        <PrivateRoute exact path="/secretaria" requireRoles={[6]}>
             <Redirect to="/secretaria/mesaPartes/solicitudesGenerales" />
        </PrivateRoute>
        <PrivateRoute exact path="/invitado" requireRoles={[7]}>
             <Redirect to="/invitado/mesaPartes/misSolicitudes" />
        </PrivateRoute>
        {privateroutes.map((r,index) =>
          <PrivateRoute 
            key={index}
            exact path={r.path} 
            requireRoles={r.requireRoles}
            component={() =>
              <HeaderUser pagina={r.page} />
            }
          >
          </PrivateRoute>
        )}


        {/* Rutas protegidas. Page solita */}
        <PrivateRoute exact path="/noRoles"
          requireRoles={[0,1,2,3,4,5,6,7,8]}
          component={() =>
            <NoAsignado/>
          }
          >
        </PrivateRoute>
        
        <PrivateRoute exact path="/registro"
          requireRoles={[8]}
          component={() =>
            <Registro/>
          }
          >
        </PrivateRoute>

        {/* Login */}
        <Route exact path="/login" children={Login} />
        <Route exact path="/">
          {user?.id>0? 
            <Redirect to={generateRouteRol(rol)} /> 
            : <Redirect to="/login"/> }
        </Route>
        <Route default component={ErrorDireccionamiento} />
      </Switch>
    </Router>
  )
}
