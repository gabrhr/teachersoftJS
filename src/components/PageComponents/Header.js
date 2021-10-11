import React from 'react'
import { AppBar, Grid, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    menuImagen: {
        position: 'relative',
        height: "40px",
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
                    height: "60px"
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
