import React from 'react'
import { Box } from '@mui/system'
import { styled } from "@mui/material/styles";
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Login from '../Login/LoginForm';
import Employees from '../Employees/Employees';
import Showcase from '../Showcase/Showcase'


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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
              <Route exact path="/">
                <Showcase />
              </Route>
              <Route path="/administrador/mantenimiento/employee">
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
          </Switch>
      </Box>
    )
}
