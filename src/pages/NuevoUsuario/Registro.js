/* Author: Gabs
 */
import React from 'react'
import { AppBar, Avatar, Grid, Paper, Toolbar, Typography, Box } from '@mui/material'
import Header1 from '../../constants/Header1'
import RegistroForm from './RegistroForm'
import HeadNotificationMisSolicitudes from './HeadNotificationMisSolicitudes'
import { Controls } from '../../components/controls/Controls'
import logout from "../../assets/images/log-out.png";
import { useHistory } from 'react-router';
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useGoogleLogout } from 'react-google-login';
import Divider from '../../components/controls/Divider'
import { UserContext } from '../../constants/UserContext'
import Notification from '../../components/util/Notification'

/* SERVICES */
import personaService from '../../services/personaService'
import * as MesaPartesService from '../../services/mesaPartesService'

/* para cerrar sesion */
const clientId = '626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com';

function f2bNuevoUsuarioExterno(values, user) {
    /* update local storage user */
    user = {
        ...user,
        nombres: values.nombres,
        apellidos: values.primer_apellido + ' ' + values.segundo_apellido,
        tipo_persona: 7,
    }

    let persona = {
        ...user.persona,        // recover id to update in DB
        tipo_persona: 7,        // 8 (Nuevo Usuario) -> 7 (Usuario Externo)

        nombres: values.nombres,
        apellidos: values.primer_apellido + ' ' + values.segundo_apellido,
        fechaNac: values.fecha_nacimiento,
        sexo: values.sexo,
        tipo_documento: 0,      // DNI?
        numero_documento: values.dni,
        telefono: values.telefono,

        /* relations */
        departamento: { id: user.persona.departamento.id },
        seccion: {id: user.persona.seccion.id }
    }
    return persona
}

export default function Registro() {
    const history = useHistory()
    const [notify, setNotify] = React.useState({
        isOpen: false, 
        message: '', 
        type: ''
    })
    const { user, setUser, rol, setRol } = React.useContext(UserContext)

    /* Con valores de registro */
    function submitValues(values, user) {
        personaService.updatePersona2(f2bNuevoUsuarioExterno(values, user))
            .then(res => {
                /* success */
                setNotify({
                    isOpen: true,
                    message: 'Registro de Nuevo Usuario Externo externo',
                    type: 'success'
                })
                
                /* update localstorage and UserContext */
                setUser({...user})
                setRol(user.persona.tipo_persona)

                /* redirect to next page */
                // history.push("/invitado/mesaPartes/misSolicitudes")
            })
            .catch(res => {
                setNotify({
                    isOpen: true,
                    message: 'Estamos teniendo problemas de conexión.  Consulte con un administrador por favor.',
                    type: 'error'
                })
                console.log("Registro", f2bNuevoUsuarioExterno(values, user))
            })
    }

    return (
        <>
            <Header1/>
            <Header/>
            <Paper sx={{m: 22, p: 5}}>
                <HeadNotificationMisSolicitudes
                    title="Nuevo Usuario Externo"
                    body="Completa tus datos para terminar con el registro"
                />
                <RegistroForm submitValues={submitValues}/>
            </Paper>
            {/* "modals" */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}




//#region NO MIREN
const useStyles = makeStyles((themex) => ({
    root: {
        backgroundColor: "#fdfdff",
    },
    pageIcon: {
        display: "inline-block",
        padding: themex.spacing(1),
        color: "#00002b",
    },
}));

function Header (){
    const { user, rol } = React.useContext(UserContext);
    const history = useHistory();
    const classes = useStyles();
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

        <AppBar
            sx={{
                marginTop: "65px",
                bgcolor: "#fff",
                boxShadow: 1,
                transform: "translateZ(0)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            position="fixed"
        >
            <Toolbar>
                <Grid
                    container
                    ml={-1}
                    mr={0}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid item pl={2}>
                        <Avatar alt="profile pic" src={user.persona.foto_URL} />
                    </Grid>
                    <Grid item sm alignItems="right">
                        <div className={classes.pageIcon}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ bgcolor: "primary" }}
                            >
                                {user.persona.nombres + ' ' + user.persona.apellidos}
                            </Typography>
                            <Typography variant="body1" component="div">
                                Invitado
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <Controls.Button
                            variant="outlined"
                            size='small'
                
                            text="Cerrar sesión"
                            onClick={signOut}
                            endIcon={<img src={logout} />}
                        />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
//#endregion
