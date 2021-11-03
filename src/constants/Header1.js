/* Author:
 * 
 * Header azul
 */
import React from 'react'
import {  AppBar,  Grid,  IconButton,  Button,  Toolbar,  Divider,  Avatar} from "@mui/material";
import { makeStyles } from "@mui/styles";

import LogoPucp from "../assets/images/LogoPUCP.png";

const useStyles = makeStyles((themex) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  menuImagen: {
    position: "relative",
    height: "45px",
  },
}));

export default function Header1() {
    const classes = useStyles();
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "primary",
                    boxShadow: 1,
                    transform: "translateZ(0)",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <Grid container alignItems="center" mr={2}>
                        <Grid item sm></Grid>
                        <Grid item>
                            <img className={classes.menuImagen} src={LogoPucp} alt=""></img>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}
