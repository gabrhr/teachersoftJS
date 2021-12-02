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

  return (
    <Form>
      <GoogleLoginButton/>
    </Form>
  )
}

export default Login