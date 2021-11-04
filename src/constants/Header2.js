/* Author:
 *
 * Header con informacion de usuario (el blanquito)
 */
import React from 'react'
import { AppBar, Grid, IconButton, Button, Toolbar, Divider, Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useGoogleLogout } from 'react-google-login';
import { useHistory, Redirect } from "react-router"
import { Controls } from '../components/controls/Controls';

import DehazeIcon from "@mui/icons-material/Dehaze";
import logout from "../assets/images/log-out.png";

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



const clientId = '626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com';
export default function Header2(props) {
    const history = useHistory();
    const { foto, nombre, idRol, rol, handleDrawerOpen } = props
    const classes = useStyles();
    const onLogoutSuccess = () => {
        /*  setUser({}); */
        // setRole({});
        // localStorage.clear();
        history.push('/login')
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

    return (
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
                    <Grid item pr={2}>
                        <IconButton onClick={handleDrawerOpen}>
                            <DehazeIcon fontSize="medium" />
                        </IconButton>
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item pl={2}>
                        <Avatar className={classes.pageIcon}>
                            <img className="userImage" src={foto} alt=""></img>
                        </Avatar>
                    </Grid>
                    <Grid item sm>
                        <div className={classes.pageIcon}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ bgcolor: "primary" }}
                            >
                                {nombre}
                            </Typography>
                            <Typography variant="body1" component="div">
                                {rol}
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        <Controls.Button
                            variant="outlined"
                            size='small'
                            fullWidth
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
