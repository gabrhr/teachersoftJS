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
                    color='DTButton'
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