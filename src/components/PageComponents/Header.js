import React from 'react'
import { AppBar, Grid, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    menuImagen: {
        position: 'relative',
        height: '10vh',
        marginTop: theme.spacing(3),
    }
}))

/* override the existing MUI style */
export default function Header() {
    const classes = useStyles();
    return (
         <AppBar position="relative" 
                sx={{
                    bgcolor: 'primary',
                    boxShadow: 1,
                    transform: 'translateZ(0)',
                    zIndex:  (theme) => theme.zIndex.drawer + 1,
                    height: "15vh"
                }}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item sm>
                    </Grid>
                    <Grid item>
                        {/* FIX:  bad scaling of image */}
                        <img 
                            className={classes.menuImagen} 
                            src="assets/img/LogoPUCP.png"
                            alt="LogoPUCP">
                        </img>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
