import React from 'react'
import { Box } from '@mui/system'
import { styled } from "@mui/material/styles";
import { BrowserRouter as Route, Switch, Redirect } from 'react-router-dom';
import Login from '../Login/LoginForm';
import Employees from '../Employees/Employees';
import Showcase from '../Showcase/Showcase'
import TestIndex from '../Dev/TestIndex';
import AsistenteSeccion from '../AsistenteSeccion/AsistenteSeccion';
import GestionDepartamento from '../Administrador/MantenimientoDepartamento/GestionDepartamento'
import GestionSeccion from '../Administrador/MantenimientoSeccion/GestionSeccion'
// import GestionUsuariosForm from '../Administrador/GestionUsuariosForm';
import ProtectedRoute from './RouterProtected';
import Vacio from '../Vacio'
import { Assistant } from '@mui/icons-material';
import GestionUsuarios from '../Administrador/GestionUsuarios/GestionUsuarios';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(8.2, 8),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function UserPage() {


  return (
    <Box component="main" flexGrow={1} p={2} bgcolor="#ffffff"
      overflow="auto"
    >
      <DrawerHeader />
      <Switch>
        {/* admin */}
        <ProtectedRoute exact path="/admin/asignarRoles" idRoles={[1]}>
          <Redirect to="/admin/mantenimiento" />
        </ProtectedRoute>
        <ProtectedRoute exact path="/admin/mantenimiento" idRoles={[1]} component={Vacio} />
        <ProtectedRoute exact path="/admin/mantenimiento/usr" idRoles={[1]} component={GestionUsuarios} />
        <ProtectedRoute exact path="/admin/mantenimiento/dep" idRoles={[1]} component={GestionDepartamento} />
        <ProtectedRoute exact path="/admin/mantenimiento/sec" idRoles={[1]} component={GestionSeccion} />
        <ProtectedRoute exact path="/admin/showcase" idRoles={[1]} component={Showcase} />
        <ProtectedRoute exact path="/admin/index" idRoles={[1]} component={TestIndex} />
        <ProtectedRoute exact path="/admin/employees" idRoles={[1]} component={Employees} />

        {/* as: asistente de seccion */}
        <ProtectedRoute exact path="/as/asignacionCarga" idRoles={[2]} component={AsistenteSeccion} />
        <ProtectedRoute exact path="/as/asignacionCarga/registroCursos" idRoles={[2]} component={AsistenteSeccion} />
        <ProtectedRoute exact path="/as/solicitudDocencia" idRoles={[2]} component={Vacio} />
        <ProtectedRoute exact path="/as/docentes" idRoles={[2]} component={Vacio} />
        <ProtectedRoute exact path="/as/mesaPartes" idRoles={[2]} component={Vacio} />

      </Switch>
    </Box>
  )
}
