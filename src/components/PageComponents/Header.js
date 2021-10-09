import React from 'react'
import { AppBar, Grid, IconButton, Toolbar, Badge } from '@mui/material'
import { makeStyles } from '@mui/styles'

import LogoPucp from '../../assets/images/LogoPUCP.png'


const useStyles = makeStyles(theme => ({
    menuImagen: {
        position: 'relative',
        height: '40px'
    }
}))

/* override the existing MUI style */
export default function Header() {
    const classes = useStyles();
    return (
         <AppBar position="static" 
            sx={{
                bgcolor: 'primary',
                boxShadow: 1,
                transform: 'translateZ(0)'
            }}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item sm>
                    </Grid>
                    <Grid item>
                    <img className={classes.menuImagen} src= {LogoPucp} alt=""></img>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
