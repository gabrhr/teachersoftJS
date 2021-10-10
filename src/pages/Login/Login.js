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
    }
}))

export default function Login() {
    const classes = useStyles()
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}

    return (
        <>
            <Header />
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <Typography
                        variant="h1"
                        component="div"
                        >
                        Bienvenido
                    </Typography>
                    <Paper
                        elevation={10}
                        color="#fff"
                        style={paperStyle}
                        >
                        <div> hola mundo</div>
                    </Paper>
                </Grid>
                <Grid  item xs={6} sx={{
                    textAlign: 'center',
                    position: 'relative',
                }}

                >
                    <Typography
                        variant="h1"
                        sx={{
                            zIndex:2,
                            position:'relative',
                            lineHeight: 10,
                            margin: '0',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: "translate(-50%, -50%)"
                        }}
                        >
                        TeacherSoft
                    </Typography>
                    <img src="assets/img/kiwi.svg" alt="kiwi on an oval" />
                </Grid>
            </Grid>
        </>
    )
}
