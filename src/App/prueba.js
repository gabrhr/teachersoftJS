import React from 'react';
import GoogleLogin from 'react-google-login';
import { Controls } from '../components/controls/Controls';
import { useGoogleAuth } from '../pages/Login/googleAuth';

const LoginPrueba = () => {
    const { signIn,googleUser} = useGoogleAuth();

    //Axios -> mandar tokenId, correo, etc
    // respuesta -> objeto usuario -> (rol)


    
    const onFailure = (response) => {
        alert('Error al hacer login')
    }
    
    const onSuccess = (response) => {
        console.log(response)
        
    }

    return (
        <div>
            <h2>Private Page</h2>
            
        <a  href="back.teachersoft.solutions:8080/oauth2/authorization/google"
         style={{ textDecoration: "none" }}
        >
        <GoogleLogin
        clientId="626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com"
        render={renderProps => (  
          <Controls.Button
                  variant="outlined"
                  size='small'
                  fullWidth
                  text="Iniciar sesión con correo PUC"
                  onClick={signIn}
                />

         )}
         onSuccess={onSuccess}
         onFailure={onFailure}
         isSignedIn={true}
         cookiePolicy={'single_host_origin'}
         accessType={'offline'}
         responseType={'token,code'}
        />
        </a>
        </div>
    );
};

export default LoginPrueba;