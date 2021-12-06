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
import GestionCiclo from '../pages/Administrador/MantenimientoCiclo/GestionCiclo';
import GestionUnidad from '../pages/Administrador/MantenimientoUnidad/GestionUnidad';
import CargaDocente from '../pages/AsistenteSeccion/CargaDocente/CargaDocente';
import CargaDocenteHorarios from '../pages/AsistenteSeccion/CargaDocente/CargaDocenteHorarios';
import CargaDocenteHorariosCoord from '../pages/CoordinadorSeccion/CargaDocente/CargaDocenteHorariosCoord';
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
import CargaDocenteCursos from '../pages/AsistenteDepartamento/CargaDocente/cargaDocenteCursos';
import CargaDocenteCursosJd from '../pages/JefeDepartamento/CargaDocente/cargaDocenteCursos';
import CargaDocenteHorariosAd from '../pages/AsistenteDepartamento/CargaDocente/CargaDocenteCursoHorarios';
import CargaDocenteHorariosJd from '../pages/JefeDepartamento/CargaDocente/CargaDocenteCursoHorarios';
import CargaArchivos from '../pages/MesaPartes/CargaArchivos';
import GestionTemaTramite from '../pages/MesaPartes/GestionTemaTramite/GestionTemaTramite';
import CargaDocenteCoord from '../pages/CoordinadorSeccion/CargaDocente/CargaDocente';
import SolPreferenciaDocentes from '../pages/AsistenteSeccion/PreferenciaDocente/SolPreferenciaDocentes';
import ModalDocenteClases from '../pages/AsistenteSeccion/CargaDocente/ModalDocenteClases';
import ModalDocenteClasesCoord from '../pages/CoordinadorSeccion/CargaDocente/ModalDocenteClases';
//import NoAsignado from './NoAsignado'
import DragDropArchivos from '../pages/MesaPartes/DragDropArchivos';
import PreferenciaDocenteForm from '../pages/Docente/PreferenciaDocente/PreferenciaDocenteForm'
import ErrorDireccionamiento from '../pages/Dev/Error404';
import Registro from '../pages/NuevoUsuario/Registro';
import LandingPage from '../constants/LandingPage'
import ExternoAtenderSolicitud from '../pages/MesaPartes/ExternoAtenderSolicitud';
import DelegadoExterno from '../pages/MesaPartes/DelegadoExterno';
import DeudasYDescargasJefe from '../pages/JefeDepartamento/DeudasYDescargas/DeudasYDescargasJefe'
import GestionDescargas from '../pages/JefeDepartamento/DeudasYDescargas/Descargas/GestionDescargas';
import GestionDescargaDocente from '../pages/Docente/DeudasYDescargas/GestionDescargaDocente'
import DeudasYDescargaCoord from '../pages/CoordinadorSeccion/DeudasYDescargasCoord/DeudasYDescargaCoord'
import NuevaSolicitudDescarga from '../pages/CoordinadorSeccion/DeudasYDescargasCoord/NuevaSolicitudDescarga'
import GestionTrabajosInvestigacion from '../pages/AsistenteInvestigacion/RepositorioInvestigaciones/GestionTrabajosInvestigacion';
import GestionTrabajosInvestigacionForm from '../pages/AsistenteInvestigacion/RepositorioInvestigaciones/GestionTrabajosInvestigacionForm';
import CantidadTrabajosXAutor from '../pages/AsistenteInvestigacion/EstadisticasInvestigaciones/CantidadTrabajosXAutor';
import IndicadoresSeccion from '../pages/CoordinadorSeccion/IndicadoresSeccion';
import CantidadTrabajosXPais from '../pages/AsistenteInvestigacion/EstadisticasInvestigaciones/CantidadTrabajosXPais';
import CantidadTrabajosXIdioma from '../pages/AsistenteInvestigacion/EstadisticasInvestigaciones/CantidadTrabajoXIdioma';
import CantidadTrabajosXCalidad from '../pages/AsistenteInvestigacion/EstadisticasInvestigaciones/CantidadTrabajoXCalidad';
import IndicadoresASeccion from '../pages/AsistenteSeccion/IndicadoresASeccion';
import IndicadoresAdministrador from '../pages/Administrador/IndicadoresAdministrador';
import IndicadoresADepartamento from '../pages/AsistenteDepartamento/CargaDocente/IndicadoresADepartamento';
import IndicadoresJDepartamento from '../pages/JefeDepartamento/DeudasYDescargas/IndicadoresJDepartamento';
/* Todos menos el login que es especial porque settea al usuario */
const privateroutes = [
  /* Admin */
  { requireRoles: [0], path: "/admin/mantenimiento/usr", page: GestionUsuarios },
  { requireRoles: [0], path: "/admin/mantenimiento/dep", page: GestionDepartamento },
  { requireRoles: [0], path: "/admin/mantenimiento/sec", page: GestionSeccion },
  { requireRoles: [0], path: "/admin/mantenimiento/ciclo", page: GestionCiclo },
  { requireRoles: [0], path: "/admin/mantenimiento/uni", page: GestionUnidad },
  { requireRoles: [0], path: "/admin/mantenimiento/per", page: Vacio },
  { requireRoles: [0,1,2,3,4,5,6,7,8], path: "/admin/showcase", page: Showcase },
  { requireRoles: [0], path: "/admin/index", page: TestIndex },
  { requireRoles: [0], path: "/admin/employees", page: Employees },
  { requireRoles: [0], path: "/admin/estadisticas", page: IndicadoresAdministrador },
  /* Docente */
  /* TODO: Remover rol 8 (acceso temporal) */
  { requireRoles: [1], path: "/doc/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [1], path: "/doc/solicitudDetalle", page: SolicitudDetalle },
  { requireRoles: [1], path: "/doc/misDelegados", page: SolicitudesDelegadasAMi },
  { requireRoles: [1], path: "/doc/misDelegados/solicitudDetalle", page:  DelegadoSolicitudDetalle},
  { requireRoles: [1], path: "/doc/NuevaSolicitudForm", page: NuevaSolicitudForm },
  { requireRoles: [1], path: "/doc/preferenciaDocente", page: PreferenciaDocenteForm},
  { requireRoles: [1], path: "/doc/descargas", page: GestionDescargaDocente},
  
  // PRUEBA DRAG DROP MULTIPLE FILES //
  { requireRoles: [8], path: "/dragdrop", page: DragDropArchivos},
  { requireRoles: [8], path: "/aea", page: CargaArchivos },
  
  /* AS */
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroHorarios", page: AsistenteSeccion },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCarga", page: CargaDocente },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/deudaYDescarga", page: DeudaYDescarga },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/agregarHorario", page: GestionCargaCursos },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/preferencia", page: SolPreferenciaDocentes },
  { requireRoles: [2, 8], path: "/as/docentes", page: DocentesForm },
  { requireRoles: [2, 8], path: "/as/cursos", page: CursosForm  },
  { requireRoles: [2], path: "/as/mesaPartes/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [2], path: "/as/mesaPartes/solicitudDetalle", page: SolicitudDetalle },
  { requireRoles: [2], path: "/as/mesaPartes/misDelegados", page: SolicitudesDelegadasAMi },
  { requireRoles: [2], path: "/as/mesaPartes/misDelegados/solicitudDetalle", page: DelegadoSolicitudDetalle },
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCarga/horarios", page: CargaDocenteHorarios},
  { requireRoles: [2, 8], path: "/as/asignacionCarga/registroCarga/horarios/editar", page: ModalDocenteClases},
  { requireRoles: [2, 8], path: "/as/estadisticas", page: IndicadoresASeccion},
  /* CS*/
  { requireRoles: [3], path: "/cord/asignacionCarga/registroHorarios", page: AsistenteSeccion },
  { requireRoles: [3], path: "/cord/asignacionCarga/registroCarga", page: CargaDocenteCoord },
  { requireRoles: [3], path: "/cord/asignacionCarga/deudaYDescarga", page: DeudasYDescargaCoord },
  { requireRoles: [3], path: "/cord/asignacionCarga/cursos", page: GestionCargaCursos },
  { requireRoles: [3], path: "/cord/asignacionCarga/agregarHorario", page: GestionCargaCursos },
  { requireRoles: [3], path: "/cord/solicitudDocencia", page: Vacio },
  { requireRoles: [3], path: "/cord/mesaPartes/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [3], path: "/cord/mesaPartes/solicitudDetalle", page: SolicitudDetalle },
  { requireRoles: [3], path: "/cord/mesaPartes/misDelegados", page: SolicitudesDelegadasAMi },  
  { requireRoles: [3], path: "/cord/mesaPartes/misDelegados/solicitudDetalle", page: DelegadoSolicitudDetalle },
  { requireRoles: [3, 8], path: "/cord/estadisticas", page: IndicadoresSeccion},  
  { requireRoles: [3, 8], path: "/cord/asignacionCarga/registroCarga/horarios", page: CargaDocenteHorariosCoord},
  { requireRoles: [3, 8], path: "/cord/asignacionCarga/registroCarga/horarios/editar", page: ModalDocenteClasesCoord},
  { requireRoles: [3, 8], path: "/cord/docentes", page: DocentesForm },
  { requireRoles: [3, 8], path: "/cord/cursos", page: CursosForm  },
  { requireRoles: [3, 8], path: "/cord/asignacionCarga/preferencia", page: SolPreferenciaDocentes  },
  { requireRoles: [3, 8], path: "/cord/solicitudes/deudasYDescargas/solicitud", page: NuevaSolicitudDescarga  },


  /* AD */
  { requireRoles: [4], path: "/ad", page: CargaDocenteCursos },
  { requireRoles: [4], path: "/ad/asignacionCarga/Cargadocente", page: CargaDocenteCursos },
  { requireRoles: [4], path: "/ad/asignacionCarga/Cargadocente/horarios", page: CargaDocenteHorariosAd},
  { requireRoles: [4], path: "/ad/docentes", page: Vacio },
  { requireRoles: [4], path: "/ad/panelIndicadores", page: Vacio },
  { requireRoles: [4], path: "/ad/mesaPartes/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [4], path: "/ad/mesaPartes/solicitudDetalle", page: SolicitudDetalle },
  { requireRoles: [4], path: "/ad/mesaPartes/misDelegados", page: SolicitudesDelegadasAMi },  
  { requireRoles: [4], path: "/ad/mesaPartes/misDelegados/solicitudDetalle", page: DelegadoSolicitudDetalle },
  { requireRoles: [4], path: "/ad/estadisticas", page: IndicadoresADepartamento },  
  /* JD */
  { requireRoles: [5], path: "/jd/asignacionCarga/Cargadocente", page: CargaDocenteCursosJd },
  { requireRoles: [5], path: "/jd/asignacionCarga/Cargadocente/horarios", page: CargaDocenteHorariosJd},
  { requireRoles: [5], path: "/jd/docentes", page: Vacio },
  { requireRoles: [5], path: "/jd/panelIndicadores", page: Vacio },
  { requireRoles: [5], path: "/jd/mesaPartes/misSolicitudes", page: MisSolicitudes },
  { requireRoles: [5], path: "/jd/mesaPartes/solicitudDetalle", page: SolicitudDetalle },  
  { requireRoles: [5], path: "/jd/mesaPartes/misDelegados", page: SolicitudesDelegadasAMi },  
  { requireRoles: [5], path: "/jd/mesaPartes/misDelegados/solicitudDetalle", page: DelegadoSolicitudDetalle },  
  { requireRoles: [5], path: "/jd/asignacionCarga/deudaYDescarga", page: DeudasYDescargasJefe },  
  { requireRoles: [5], path: "/jd/asignacionCarga/proceso/descarga", page: GestionDescargas },
  { requireRoles: [5], path: "/jd/estadisticas", page: IndicadoresJDepartamento },  
  /* Secretario de D */
  { requireRoles: [6], path: "/secretaria/mesaPartes/solicitudesGenerales", page: RecepcionSolicitud },
  { requireRoles: [6], path: "/secretaria/mesaPartes/solicitudDetalle", page: RecepcionDetalleSolicitud },
  { requireRoles: [6], path: "/secretaria/mantenimiento/temaTramite", page: GestionTemaTramite },  
  /* Externo */
  { requireRoles: [7], path: "/invitado/mesaPartes/misSolicitudes", page: MisSolicitudes},  
  { requireRoles: [7], path: "/invitado/mesaPartes/solicitudDetalle", page: SolicitudDetalle },  

  /*AsistenteInvestigacion*/ 
  { requireRoles: [9], path: "/ai/repoInvestigaciones", page: GestionTrabajosInvestigacion },  
  { requireRoles: [9], path: "/ai/repoInvestigacionesForm", page: GestionTrabajosInvestigacionForm},  
  { requireRoles: [9], path: "/ai/publicacionesPorAutor", page: CantidadTrabajosXAutor },  
  { requireRoles: [9], path: "/ai/publicacionesPorPais", page: CantidadTrabajosXPais },  
  { requireRoles: [9], path: "/ai/publicacionesPorIdioma", page: CantidadTrabajosXIdioma },  
  { requireRoles: [9], path: "/ai/publicacionesPorCalidad", page: CantidadTrabajosXCalidad}, 
  
 
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
      case 7:
        return "/invitado"
      case 9:
          return "/ai"
          
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
             <Redirect to="/doc/preferenciaDocente" />
        </PrivateRoute>
        <PrivateRoute exact path="/as" requireRoles={[2]}>
             <Redirect to="/as/asignacionCarga/registroHorarios" />
        </PrivateRoute>
        <PrivateRoute exact path="/cord" requireRoles={[3]}>
             <Redirect to="/cord/asignacionCarga/registroHorarios" />
        </PrivateRoute>
        <PrivateRoute exact path="/ad" requireRoles={[4]}>
             <Redirect to="/ad/asignacionCarga/cargaDocente" />
        </PrivateRoute>
        <PrivateRoute exact path="/jd" requireRoles={[5]}>
             <Redirect to="/jd/asignacionCarga/cargaDocente" />
        </PrivateRoute>
        <PrivateRoute exact path="/secretaria" requireRoles={[6]}>
             <Redirect to="/secretaria/mesaPartes/solicitudesGenerales" />
        </PrivateRoute>
        <PrivateRoute exact path="/ai" requireRoles={[9]}>
             <Redirect to="/ai/repoInvestigaciones" />
        </PrivateRoute>
        <PrivateRoute exact path="/invitado" requireRoles={[7]}>
             <Redirect to="/invitado/mesaPartes/misSolicitudes" />
        </PrivateRoute>
        {/* Ver bien la ruta */}
        {/* <PrivateRoute exact path="/invitado/atender" requireRoles={[8]}>
             <Redirect to="/invitado/atender/:solicitud" />
        </PrivateRoute> */}
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
          requireRoles={[8,7]}
          component={() =>
            <Registro/>
          }
          >
        </PrivateRoute>
        
         {/* <PrivateRoute exact path="invitado/atender/solicitud"
          requireRoles={[7]}
          component={() =>
            <DelegadoExterno/>
          }
          >
        </PrivateRoute> */}
       
        {/* Login */}
       
        <Route path="/invitado/atenderxemail/" render={() => <DelegadoExterno />} />
        <Route exact path="/login" render={() => <Login />}/>
        <Route exact path="/">
          {user?.id>0
            ? <Redirect to={generateRouteRol(rol)} /> 
            : <Redirect to="/login"/> 
          }
        </Route>

        <Route default render={() => <ErrorDireccionamiento />} />
      </Switch>
    </Router>
  )
}
