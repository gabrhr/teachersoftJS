import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Redirect } from "react-router"
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import { Controls } from '../../components/controls/Controls';
import { refreshTokenSetup } from './refreshTokenSetup';
import axios from 'axios';
import url from '../../config'
import { UserContext } from '../../constants/UserContext';
import { RotateLeftRounded } from '@mui/icons-material';
import userService from '../../services/userService';
import { Box } from '@mui/material'

function postlogin(response, setUser, setRol, setToken, signOut, setLoading) {
    console.log("SOLO UNA VEZ POR FAVOR")
    let secureConfig = {
        headers: {
            Authorization: `${response.accessToken}`
        },
        //timeout: 20000
    };
    const data = {

        usuario: response.profileObj.email,
        persona: {
            apellidos: response.profileObj.familyName,
            nombres: response.profileObj.givenName,
            correo_pucp: response.profileObj.email,
            foto_URL: response.profileObj.imageUrl,
            tipo_persona: 8     // Nuevo Usuario
        }
    }

    axios.post(`${url}/usuario/postlogin`, data, secureConfig)
        .then((resb) => {
            //console.log("POSTLOGIN",resb.data)
            setUser(resb.data.user)
            setRol(resb.data.user.persona.tipo_persona)
            setToken(resb.data.token)
            localStorage.setItem("ind", 0);
        })
        .catch(
            err => {
                console.error(err);
                signOut();
            }
        )

    setLoading(true);
    //refreshTokenSetup(response)
}

const clientId = "626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com";
const GoogleLoginButton = () => {
    const history = useHistory();
    const { user, setUser, rol, setRol, setToken, setSelectedIndex } = useContext(UserContext);
    //const useState = useMountedState();	
    const [loading, setLoading] = useState(undefined);
    //const [current, setCurrent] = useState(undefined);

    /* Google Button calls onSuccess multiple times, which causes problems with
     * our "hybrid" login (usamos token del BackEnd). 
     * gresw: Google Response Wrapper.
     * 
     * TODO:  Sigue mal,  pero ya fue, ya desperdicie 3h sin exito.  Suerte para
     *        la futura persona que intente arreglar esta huevada.
     */

    const onLogoutSuccess = () => {
        localStorage.clear();
        history.push('/')
    }
    const onLogoutFailure = (response) => {
        console.log(response)
    }
    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onLogoutFailure,
    })

    useEffect(() => {
        // if (loading && rol) {
        if (loading) {
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
                case 9:
                    return history.push("/ai");
                default:
                    return history.push("/registro");
                //return history.push("/noRoles");
            }
        }
        return () => {
            setLoading(false)
        };
    }, [loading]);

    const onSuccess = (gr) => {
        // console.log("GoogleLoginButton: onSuccess(): ", gr)
        if (gr.tokenId) {
            setTimeout(() => {
                postlogin(gr, setUser, setRol, setToken, signOut, setLoading)
            }, 100 + Math.random() * 1000)
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
                    <Box mb={3}>
                        <Controls.Button
                            size='medium'
                            //fullWidth
                            text="Iniciar sesión"
                            onClick={renderProps.onClick} disabled={renderProps.disabled}
                        />
                    </Box>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
            // accessType={'offline'}
            // responseType={'token,code'}
            />
        </>
    );
};

export default GoogleLoginButton;