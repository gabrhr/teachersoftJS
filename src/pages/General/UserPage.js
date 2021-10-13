import React from 'react'
import { Box } from '@mui/system'
import { styled } from "@mui/material/styles";
import { BrowserRouter as  Route,Switch } from 'react-router-dom';
import Login from '../Login/LoginForm';
import Employees from '../Employees/Employees';
import Showcase from '../Showcase/Showcase'
import TestIndex from '../Dev/TestIndex';
import AsistenteSeccion from '../AsistenteSeccion/AsistenteSeccion';
import GestiónDeUsuarios from '../GestiónDeUsuarios/GestiónDeUsuarios';
import GestionUsuariosForm from '../Administrador/GestionUsuariosForm';
import GestionCargaCursos from '../AsistenteSeccion/GestiónCargaCursos';


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
              <Route exact path="/">
                <TestIndex />
              </Route>
              <Route exact path="/AsistenteSeccion">
                <AsistenteSeccion />
              </Route>
              <Route exact path="/GestionUsuariosForm">
                <GestionUsuariosForm />
              </Route>
              <Route path="/employee">
                <Employees />
              </Route>
              <Route path="/administrador/mantenimiento/departamento">
              </Route> 
              <Route path="/showcase">
                <Showcase />
              </Route> 
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/GestionDeUsuarios">
                <GestiónDeUsuarios />
              </Route>
              <Route path="/GestionCargaCursos">
                <GestionCargaCursos />
              </Route>
          </Switch>
      </Box>
    )
}
