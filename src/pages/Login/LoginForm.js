import { Typography } from '@mui/material';
import React from 'react'
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

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
    }

    return(
        <Form onSubmit={handleSubmit}>
            {/* <Grid> */}
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
                    size = 'small'
                    />
                <Controls.Input
                    name="password"
                    label="Contraseña"
                    value={values.password}
                    onChange={handleInputChange}
                    type= 'password'
                    size = 'small'
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
                    color='DTButton'
                    fullWidth 
                    size = 'small'
                    text="Iniciar Sesión"
                />
                <Typography align="center">
                    o
                </Typography>
                <Controls.Button 
                    variant="outlined" 
                    size = 'small'
                    fullWidth 
                    text="Iniciar sesión con correo PUCP"
                />
                <Typography paddingTop="20px" >
                    <Link to="#" >
                        Recuperar contraseña
                    </Link>
                </Typography>
                <Typography paragraph={true}> ¿No tienes una cuenta?
                    {'\u00A0'}
                    <Link to="#" >
                        Regístrate
                    </Link>
                </Typography>
            {/* </Grid> */}
        </Form>
    )
}

export default Login