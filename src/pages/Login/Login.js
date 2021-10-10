import React from 'react'
import Header from '../../components/PageComponents/Header'
import { Paper, Grid, Typography } from '@mui/material';
import LoginForm from './LoginForm'

export default function Login() {
    const paperStyle={padding :20,height:'70%',width:"80%", margin:"20px auto"}

    return (
        <>
            <Header />
            <Grid container spacing={2} sx={{
                width: "100%"
            }}>
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
                        <LoginForm />
                    </Paper>
                </Grid>
                <Grid  item xs={6} sx={{
                    textAlign: 'center',
                    position: 'relative',
                    backgroundColor: 'secondary.main',
                    backgroundImage: 'url("assets/img/VectorLogin.svg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}

                >
                    <Typography
                        variant="h1"
                        sx={{
                            zIndex:2,
                            position:'relative',
                            lineHeight: 10,
                            margin: '0',
                            // position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: "translate(-50%, -50%)",
                            color: "#fff"
                        }}
                        >
                        TeacherSoft
                    </Typography>
                    {/* <img src="assets/img/VectorLogin.svg" alt="kiwi on an oval" 
                    sx={{objectFit: 'fill'}} /> */}
                </Grid>
            </Grid>
        </>
    )
}
