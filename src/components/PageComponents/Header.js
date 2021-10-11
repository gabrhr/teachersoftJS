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
                    height: "8vh"
                }}>
            <Toolbar sx = {{height: '100%'}}>
                <Grid container
                    alignItems="center">
                    <Grid item sm>
                    </Grid>
                    <Grid item sx = {{height: '100%'}}>
                        {/* FIX:  bad scaling of image */}
                        <img 
                            className={classes.menuImagen} 
                            sx = {{height: '4px'}} 
                            src="assets/img/LogoPUCP.png"
                            alt="LogoPUCP"
                               
                        >
                        </img>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
