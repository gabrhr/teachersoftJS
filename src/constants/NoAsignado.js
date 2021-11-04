import React from "react";
import Header1 from './Header1';
import { Controls } from '../components/controls/Controls';
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useGoogleLogout } from 'react-google-login';
import { useHistory, Redirect } from "react-router"
import DehazeIcon from "@mui/icons-material/Dehaze";
import logout from "../assets/images/log-out.png";
// npm i "react-google-login" "--save"

const clientId = '626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com';
export default function NoAsignado(props){

    console.log('test');
    const { foto, nombre, idRol, rol, handleDrawerOpen } = props
    const history = useHistory();
    
    const onLogoutSuccess = () => {
        /*  setUser({}); */
        // setRole({});
        localStorage.clear();
        history.push('/')
    }
    const onLogoutFailure = (response) => {
        // console.log(response)
            console.log('Failed to log out')
       }
    const {signOut} = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onLogoutFailure,
    })
    return(
        <>
        <Header1
          text="Usuario No asignado."
          cbo={false}
        />
        <Typography>
            Bienvenido, {props.nombre}. Todavía no se te ha asignado un rol. por lo que deberás esperar a que se te asigne uno.
        </Typography>
        <Typography>
            Muchas gracias.
        </Typography>
        <Typography >
            - Equipo de DreamTeam
        </Typography>
        <Controls.Button  
            text ="CERRAR SESIÓN"
            onClick={signOut}
            fullWidth
            endIcon={<img src={logout} />}
        />
        
        </>
        
    )
}