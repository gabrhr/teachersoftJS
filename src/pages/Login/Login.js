import React from 'react'
import Header from '../../components/PageComponents/Header'
import { Paper, Grid, Typography } from '@mui/material';
import LoginForm from './LoginForm'
import Footer from '../../components/PageComponents/Footer';
import { Box } from '@mui/system';



export default function Login() {
    const paperStyle={
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 20,
        paddingBottom: 20,
        width:"60%",
        margin:"20px auto",

        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: '1px',
        borderRadius: '44px',
    }
    const textStyle = {
        zIndex:2,
        color: "primary.main",
        fontSize: "50px",
        position: "absolute",
        top: "45%",
        width: "100%",
        textAlign: "center"
    }

    return (
        <Box
            position="absolute"
            width="100%"
            height="100vh"
            zIndex={10000}
        >
            <Header />
            <Grid container
                spacing={0}
                width= "100%"
                height= "calc(100vh - 80px)"
                gridTemplateColumns= "1fr 1fr"
                alignContent="center"
                // overflow= 'hidden'
            >
                <Grid item xs={6}
                    backgroundColor="#fff"
                    height= "calc(100vh - 80px)"
                    alignContent="center"
                >
                    <Typography
                        variant="h2"
                        component="div"
                        paddingTop="50px"
                        paddingBottom="20px"
                        align="center"
                        >
                        Bienvenido
                    </Typography>
                    <Paper
                        elevation={0}
                        style={paperStyle}
                        
                        >
                        <LoginForm />
                    </Paper>
                </Grid>
                <Grid item xs={6}
                    sx={{
                        // transform: 'translateZ(0)',
                        height: "calc(100vh - 80px)",
                        // height: '100vh',
                        textAlign: 'center',
                        position: 'relative',
                        backgroundColor: 'secondary.main',
                        backgroundImage: 'url("assets/img/VectorLogin.svg")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    <Typography
                        variant="h1"
                        component="div"
                        style={textStyle}
                        >
                        TeacherSoft
                    </Typography>
                </Grid>
            </Grid>
            <Footer/>
        </Box>
    )
}
