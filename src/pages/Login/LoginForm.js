import { Avatar, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '../../components/controls/Checkbox';
import Button from '../../components/controls/Button';
import { Link } from 'react-router-dom';
import { Controls } from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';

const initialFieldValues = {
    id: 0,
    username: '',
    password: '',
    isPersistentLogin: false
}

const Login=()=>{

    const {
        values,
        // setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    // const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const paperStyle={padding :20}

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
    }

    return(
        <Form onSubmit={handleSubmit}>
            {/* <Grid> */}
                <Paper elevation={10} style={paperStyle}>
                    {/* <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Sign In</h2>
                    </Grid> */}
                    <Controls.Input
                        name="username"
                        label="Usuario"
                        value={values.username}
                        onChange={handleInputChange}
                        fullWidth 
                        />
                    <Controls.Input
                        name="password"
                        label="Contraseña"
                        value={values.password}
                        onChange={handleInputChange}
                        fullWidth 
                    />
                    <Controls.Checkbox
                        name="isPersistentLogin"
                        label="Recuérdame"
                        value={values.isPersistentLogin}
                        onChange={handleInputChange}
                    />
                    <Controls.Button 
                        type='submit' 
                        fullWidth 
                        text="Sign In"
                    />
                    <Typography align="center">
                        O
                    </Typography>
                    <Controls.Button 
                        variant="outlined" 
                        fullWidth 
                        text="Iniciar sesión con correo PUCP"
                    />
                    <Typography >
                        <Link href="#" >
                            Recuperar contraseña
                        </Link>
                    </Typography>
                    <Typography > ¿No tienes una cuenta?
                        <Link href="#" >
                            Regístrate
                    </Link>
                    </Typography>
                </Paper>
            {/* </Grid> */}
        </Form>
    )
}

export default Login