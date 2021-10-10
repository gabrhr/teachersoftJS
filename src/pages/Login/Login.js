import React from 'react'
import { makeStyles } from '@mui/styles';
import Header from '../../components/PageComponents/Header'
import { Paper, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system'
// import Figurita from '../../assets/images/VectorLogin.svg'
import Figurita from '../../assets/images/kiwi.svg'
import LogoPucp from '../../assets/images/LogoPUCP.png'
import YT from './YT'

const useStyles = makeStyles(theme => ({
    root: {

    }
}))

export default function Login() {
    const classes = useStyles()

    if (false)
        return (
            <YT />
        )

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
            <Container maxWidth="sm" 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    overflow: 'hidden',
                    backgroundColor: '#00ff00'
                    // backgroundImage: 'url("assets/img/kiwi.svg")'
                }}
                >
                <Typography
                    variant="h1"
                    component="div"
                    >
                    TeacherSoft
                </Typography>
                <img src="assets/img/kiwi.svg" alt="kiwi on an oval" />
            </Container>
            </Box>
        </>
    )
}
