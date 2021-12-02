/* Author: Gabs
 *
 * Antes habia la opcion de ingresar usuario y contrasenna,  pero ahora solo
 * es un Google Button Login.  Eso maneja la redireccion y todo.
 */
import { Typography } from '@mui/material';
import React from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Controls } from '../../components/controls/Controls'
import { useForm, Form } from '../../components/useForm';
import AuthService from '../../services/authService';
import GoogleLoginButton from './GoogleLoginButton'
import { GoogleLogin } from "react-google-login";
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

const Login = () => {
 
  const history = useHistory();

  const {
    values,
    // setValues,
    handleInputChange
  } = useForm(initialFieldValues);


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
    // console.log(loggedUser.user.persona.nombres);
    // console.log(loggedUser.user.persona.tipo_persona);
    //debugger;
    if (user) {
      switch (loggedUser.user.persona.tipo_persona) {
      case 0:
        history.push("/admin");
        break;
      case 1:
        history.push("/as")
        //   {
        //   pathname: "/as",
        // });
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
      case 9:
        history.push("/ai");
      default:
        return history.push("/");
      }
      // console.log(loggedUser.user.persona.nombres)
      switch (loggedUser.user.persona.tipo_persona) {
        case 0:
          history.push("/admin");
          break;
        case 1:
          history.push("/as") 
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
          case 9:
            history.push("/ai");
        default:
          return history.push("/");
      }
    } else {
      history.push("/")
    }
  }
  return (
    <Form>
      <GoogleLoginButton/>
    </Form>
  )
}

export default Login