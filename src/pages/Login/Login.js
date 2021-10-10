import React from 'react'
import { makeStyles } from '@mui/styles';
import Header from '../../components/PageComponents/Header'
import { Paper, Container, Grid, Typography } from '@mui/material';
import { Box, height } from '@mui/system'
import Figurita from '../../assets/images/VectorLogin.svg'
import LogoPucp from '../../assets/images/LogoPUCP.png'


const useStyles = makeStyles(theme => ({
    root: {

    },
    imagen:{
        position: 'absolute',
        paddingLeft: "0px",
        paddingTop:"0px",
        zIndex: 1
    },
    paperStyle:{
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '44px',
        /* height:'50vh',
        marginLeft: theme.spacing(30),
        marginRight: theme.spacing(30),
        marginTop:  theme.spacing(10),
        marginButton:  theme.spacing(10),
        padding: theme.spacing(3), */  
        padding :20,height:'70vh', margin:"20px auto"
    },
    text:{
        zIndex:2,
        color: "primary.main",  
        fontSize: "50px",
        position: "absolute",
        top: "50%",
        width: "100%",
        textAlign: "center",
    }
}))

export default function Login() {
    const classes = useStyles()

    return (
        <>
            <Header />
            <Grid container spacing={2} >
                <Grid item xs={6} 
                sx={{
                    textAlign: 'center'
                }} 
                >
                    <Typography
                        variant="h4"
                        component="div"
                        paddingTop="57px"
                        >
                        Bienvenido
                    </Typography>
                    <Paper
                        elevation={0}
                        color="#fff"
                        className={classes.paperStyle}
                        >
                        <div> hola mundo</div>
                    </Paper>
                    <Grid sm/>
                </Grid>
                <Grid  xs={6} wrap="nowrap" sx={{
                     transform: 'translateZ(0)',
                    textAlign: 'center',
                    position: 'relative',
                    backgroundColor: 'secondary.main',
                    backgroundImage: 'url("assets/img/VectorLogin.svg")'
                }}

                >
                    <Typography
                        variant="h1"
                        component="div"
                        className={classes.text}
                        >
                        TeacherSoft
                    </Typography>
                </Grid>
               
            </Grid>
        </>
    )
}
