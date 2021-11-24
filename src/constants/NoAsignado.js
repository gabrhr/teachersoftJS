import React from "react";
import Header1 from './Header1';
import { Controls } from '../components/controls/Controls';
import { Paper, Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useGoogleLogout } from 'react-google-login';
import { useHistory, Redirect } from "react-router"
import DehazeIcon from "@mui/icons-material/Dehaze";
import logout from "../assets/images/log-out.png";
import { margin } from "@mui/system";
import { UserContext } from "./UserContext";
import { DT } from '../components/DreamTeam/DT'
// npm i "react-google-login" "--save"

const clientId = '626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com';
export default function NoAsignado(props) {

    console.log('test');
    const { user } = React.useContext(UserContext);
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
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onLogoutFailure,
    })
    return (
        <>
            <Header1 />
            <Paper sx={{m: 16, p: 2}}>
                <DT.Title size="big" text="Acceso Denegado" />
                <Typography>
                    Bienvenido, {user.persona.apellidos + ", " + user.persona.nombres}. Todavía no se te ha asignado un rol.
                    por lo que deberás esperar a que se te asigne uno.
                </Typography>
                <Typography>
                    Muchas gracias.
                </Typography>
                <Typography sx={{ mt: "10px" }} >
                    - Equipo de DreamTeam
                </Typography>
                {/* <Grid ml={60} mr={60}> */}
                <Box height="200px" width={1} display="flex" 
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Controls.Button
                        text="CERRAR SESIÓN"
                        onClick={signOut}
                        endIcon={<img src={logout} />}
                    />
                </Box>
            {/* </Grid> */}
            </Paper>
        </>

    )
}