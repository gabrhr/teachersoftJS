/* Author:
 *
 * Header con informacion de usuario (el blanquito)
 */
import React from 'react'
import { AppBar, Grid, IconButton, Button, Toolbar, Divider, Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

export default function Header2(props) {
    const { foto, nombre, idRol, rol, handleDrawerOpen } = props
    const classes = useStyles();

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
                        <Button variant="text" endIcon={<img src={logout} alt="" />}>
                            <div className={classes.pageIcon}>
                                <Typography variant="body1" component="div">
                                    Cerrar Sesión
                                </Typography>
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
