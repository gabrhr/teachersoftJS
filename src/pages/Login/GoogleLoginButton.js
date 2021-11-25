import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Redirect } from "react-router"
import {GoogleLogin,useGoogleLogout} from 'react-google-login';
import { Controls } from '../../components/controls/Controls';
import { refreshTokenSetup } from './refreshTokenSetup';
import axios from 'axios';
import url from '../../config'
import { UserContext } from '../../constants/UserContext';
import { RotateLeftRounded } from '@mui/icons-material';
import userService from '../../services/userService';

const clientId = "626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com";
const GoogleLoginButton = () => {
    const history = useHistory();
    const { user, setUser, rol, setRol, setToken } = useContext(UserContext);
    const [loading, setLoading] = useState(undefined);
    const [current, setCurrent] = useState(undefined);

    const onLogoutSuccess = () => {
        localStorage.clear();
        history.push('/')
    }
    const onLogoutFailure = (response) => {
        console.log(response)
    }
    const {signOut} = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onLogoutFailure,
    })

    useEffect(() => {
        // if (loading && rol) {
        if (loading) {
          //console.log(current);
         /*  if (!current) return history.push("/noRoles");; */
    
          switch (rol) {
            case 0:
                return history.push("/admin");
            case 1:
                return history.push("/doc");
            case 2:
                return history.push("/as");
            case 3:
                return history.push("/cord");
            case 4:
                return history.push("/ad"); 
            case 5:
                return history.push("/jd"); 
            case 6:
                return history.push("/secretaria");
            case 7:
                return history.push("/invitado");
            default:
                return history.push("/registro");
                //return history.push("/noRoles");
          }
        }
    }, [loading]);

    const onSuccess = async (response) => {
     console.log(response)
        if(response.tokenId){
            let secureConfig = {
                headers: {
                    Authorization: `${response.accessToken}`
                },
                timeout: 20000
            };
            const data = {
            
                    usuario: response.profileObj.email,
                    persona:{
                        apellidos: response.profileObj.familyName,
                        nombres: response.profileObj.givenName,
                        correo_pucp: response.profileObj.email,
                        foto_URL: response.profileObj.imageUrl,
                        tipo_persona: 8     // Nuevo Usuario
                    }
            }

            try {
                const request = await axios.post(`${url}/usuario/postlogin`, data,secureConfig);
                if(request){
                    console.log(request.data)
                    setUser(request.data.user)
                    setRol(request.data.user.persona.tipo_persona)
                    setToken(request.data.token)
                }
            } catch(except) {
                console.error(except)
                signOut()
            }
            setLoading(true);
            refreshTokenSetup(response)
        }
    }  
    const onFailure = (response) => {
    // console.log(response)
        alert('Error al hacer login')
    }

    return (
        <>
            
        <GoogleLogin
            clientId={clientId}
            render={renderProps => (
                <Controls.Button
                        variant="outlined"
                        size='small'
                        fullWidth
                        text="Iniciar sesión con correo PUCP"
                        onClick={renderProps.onClick} disabled={renderProps.disabled}
                        />
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
            accessType={'offline'}
            responseType={'token,code'}
        />
        </>
    );
};

export default GoogleLoginButton;