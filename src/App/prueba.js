import React from 'react';
import GoogleLogin from 'react-google-login';
import { Controls } from '../components/controls/Controls';
import { useGoogleAuth } from '../pages/Login/googleAuth';

const PrivatePage = () => {
    const { signIn } = useGoogleAuth();
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

export default PrivatePage;