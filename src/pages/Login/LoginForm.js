import { Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { Controls } from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';
import AuthService from '../../services/authService';
import { useState } from 'react';



const initialFieldValues = {
    id: 0,
    username: '',
    password: '',
    isPersistentLogin: false
}

/*CODIGO -  */

const Login=()=>{
  //MANEJO DE ESTADOS
  const {
      values,
      // setValues,
      handleInputChange
  } = useForm(initialFieldValues);
  const [login, setLogin] = useState();

  //Manejo de usuario y contraseña correcto
    /*
    const passwordCorrect = user === null
    ? false
    : await 
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error:"Usuario inválido o contraseña incorrecta"
        })
    }
    */
    const handleSubmit = async (e) => {
      e.preventDefault();

      const user = AuthService.login(values.user, values.password);
      //DEPENDE DE LOS RESULTADOS SE MUESTRAS DISTINTA DATA.
      setLogin(user); //cambio de estado.
      <>
        <p>"Se logro!"</p>
      </>
      console.log(values);
  }

    return(
        <Form onSubmit={handleSubmit} >
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
                    type="password"
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
            {/* </Grid> */}
        </Form>
    )
}

export default Login