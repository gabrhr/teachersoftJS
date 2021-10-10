import React from 'react'
import { AppBar, Grid, Toolbar } from '@mui/material'
import { makeStyles } from '@mui/styles'

import LogoPucp from '../../assets/images/LogoPUCP.png'
import { height } from '@mui/system'


const useStyles = makeStyles(theme => ({
    menuImagen: {
        position: 'relative',
        height: '100px',
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
                height: "130px"
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
