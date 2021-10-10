import React from 'react'
import Header from '../../components/PageComponents/Header'
import { Paper, Grid, Typography } from '@mui/material';
import LoginForm from './LoginForm'

// const useStyles = makeStyles(theme => ({
//     root: {
//     },
//     paperStyle:{
//         borderStyle: 'solid',
//         borderColor: 'black',
//         borderWidth: '1px',
//         borderRadius: '44px',
//         /* height:'50vh',
//         marginLeft: theme.spacing(30),
//         marginRight: theme.spacing(30),
//         marginTop:  theme.spacing(10),
//         marginButton:  theme.spacing(10),
//         padding: theme.spacing(3), */  
//         padding :20,height:'70vh', margin:"20px auto"
//     },
//     text:{
//         zIndex:2,
//         color: "primary.main",  
//         fontSize: "50px",
//         position: "absolute",
//         top: "50%",
//         width: "100%",
//         textAlign: "center",
//     }
// }))

export default function Login() {
    const paperStyle={padding :20,height:'70%',width:"80%", margin:"20px auto"}
    const textStyle = {
        zIndex:2,
        color: "primary.main",  
        fontSize: "50px",
        position: "absolute",
        top: "50%",
        width: "100%",
        textAlign: "center"
    }

    return (
        <>
            <Header />
            <Grid container spacing={2} sx={{
                width: "100%"
            }}>
                <Grid item xs={6} >
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
                        style={paperStyle}
                        >
                        <LoginForm />
                    </Paper>
                    <Grid sm/>
                </Grid>
                <Grid  xs={6} wrap="nowrap" 
                    sx={{
                        transform: 'translateZ(0)',
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
                        component="div"
                        style={textStyle}
                        >
                        TeacherSoft
                    </Typography>
                </Grid>
               
            </Grid>
        </>
    )
}
