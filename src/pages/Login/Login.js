import React from 'react'
import { makeStyles } from '@mui/styles';
import Header from '../../components/PageComponents/Header'
import { Paper, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system'
import Figurita from '../../assets/images/VectorLogin.svg'
import LogoPucp from '../../assets/images/LogoPUCP.png'

const useStyles = makeStyles(theme => ({
    root: {

    }
}))

export default function Login() {
    const classes = useStyles()

    return (
        <>
            <Header />
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)',
                // FIXME:  secondary color
                backgroundColor: "#41B9E4",
                width: "100%",
                height: "600px"
                }}
                >
            <Container maxWidth="sm"
                alignItems="center"
                // justifyContent="center"
                >
                <Typography
                    variant="h1"
                    component="div"
                    >
                    Bienvenido
                </Typography>
                <Paper
                    color="#fff"
                    >

                </Paper>
            </Container>
            <Container maxWidth="sm">
                <Typography
                    variant="h1"
                    component="div"
                    >
                    TeacherSoft
                </Typography>
                <img 
                    src={Figurita}
                    alt="Kiwi standing on oval"
                    width="100%"
                    height="100%"
                    >
                </img>
            </Container>
            </Box>
        </>
    )
}
