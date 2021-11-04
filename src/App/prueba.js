import React from 'react';
import GoogleLogin from 'react-google-login';
import { Controls } from '../components/controls/Controls';
import { useGoogleAuth } from '../pages/Login/googleAuth';

const LoginPrueba = () => {

    //Axios -> mandar tokenId, correo, etc
    // respuesta -> objeto usuario -> (rol)

    const logueoGmail = () =>{
        window.open("http://back.teachersoft.solutions:8080/oauth2/authorization/google", "_self");
    }
    return (
        <div>
            <h2>Login Page</h2>
          <Controls.Button
                  variant="outlined"
                  size='small'
                  fullWidth
                  text="Iniciar sesión con correo PUC"
                  onClick={logueoGmail}
                />
        </div>
    );
};

export default LoginPrueba;