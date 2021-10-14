import { Typography } from '@mui/material';
import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Controls } from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';
import AuthService from '../../services/authService';
import { useState } from 'react';
import tokens from '../../services/tokens';
import HeaderUser from '../../components/PageComponents/HeaderUser';
import Vacio from '../Dev/Vacio';

const initialFieldValues = {
    id: 0,
    username: '',
    password: '',
    isPersistentLogin: false
}

/*CODIGO -  */

const Login=({setUser})=>{
    
  //MANEJO DE ESTADOS
  //const [login, setLogin] = useState(null);
  const history = useHistory();

  const {
      values,
      // setValues,
      handleInputChange
  } = useForm(initialFieldValues);

  //window.localStorage.removeItem('loggedUser');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userObject = {
      usuario: values.username, 
      password: values.password,
    };
    const user = await AuthService.login(userObject);
    //DEPENDE DE LOS RESULTADOS SE MUESTRAS DISTINTA DATA.
    const loggedUser = (JSON.parse(
      window.localStorage.getItem('loggedUser')));//Obtenemos el id del user almacenado
    console.log(loggedUser.user.persona.nombres);
    console.log(loggedUser.user.persona.tipo_persona);
    //debugger;
    if(user){
        setUser(loggedUser.user.persona.nombre)
        console.log(loggedUser.user.persona.nombres)
        switch (loggedUser.user.persona.tipo_persona) {
            case 0:
              history.push("/admin");
              break;
            case 1:
              history.push({
                pathname: "/as",
              });
              break;
            case 2:
              history.push("/cs");
              break;
            case 3:
              history.push("/jd");
            case 4:
              history.push("/ad");
            case 5:
              history.push("/sd");
            default:
              return history.push("/");
          }
    }else{
        history.push("/")
    }   
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