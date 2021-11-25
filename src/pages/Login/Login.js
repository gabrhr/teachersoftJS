import React from 'react'
import Header from '../../components/PageComponents/Header'
import { Paper, Grid, Typography, Avatar } from '@mui/material';
import LoginForm from './LoginForm'
import Footer from '../../components/PageComponents/Footer';
import { Box } from '@mui/system';



export default function Login() {
    const paperStyle={
        //display: "flex",
        padding: 2,
        width:"70%",
        height:"450px",
        //height: "calc(100vh - 200px)",
        marginX:"auto",
        marginTop:"2px",
        marginBottom:"10px" ,
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
                    <Grid
                        sx={paperStyle}
                        align="center"
                        >
                        <Typography align="center" fontWeight="530" my={1}>
                            TeacherSoft es una plataforma que permite 
                            administrar los docentes etc etc
                        </Typography>
                        <img  src='assets/img/landing.jpg' style={{ height: "220px", maxWidth:"100%"}}/>
                        <LoginForm />
                        <Typography align="left" mt={1} fontSize={13.5} ml={1}>
                            *Si desea comunicarse con el Departamento de Ingeniería, 
                            puede acceder a Mesa de Partes como "Usuario externo"
                        </Typography>
                    </Grid>
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
