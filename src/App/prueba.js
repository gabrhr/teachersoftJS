import React from 'react';
import { useGoogleAuth } from '../pages/Login/googleAuth';

const LoginPrueba = () => {
    const { signIn,googleUser} = useGoogleAuth();

    //Axios -> mandar tokenId, correo, etc
    // respuesta -> objeto usuario -> (rol)

    return (
        <div>
            <h2>Private Page</h2>

         <button onClick={signIn}>Login</button>
        </div>
    );
};

export default LoginPrueba;