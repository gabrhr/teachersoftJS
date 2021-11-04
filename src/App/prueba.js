import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Redirect } from "react-router"
import {GoogleLogin,useGoogleLogout} from 'react-google-login';
import { Controls } from '../components/controls/Controls';
import { refreshTokenSetup } from './refreshTokenSetup';
import axios from 'axios';
import url from '../config'

const clientId = "626086626141-gclngcarehd8fhpacb2nrfq64mk6qf5o.apps.googleusercontent.com";
const LoginPrueba = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(undefined);
    const [current, setCurrent] = useState(undefined);

    const onLogoutSuccess = () => {
        // setRole({});
        // localStorage.clear();
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
        if (loading) {
          //console.log(current);
         /*  if (!current) return history.push("/noRoles");; */
    
          switch (current) {
            case 0:
                  history.push("/admin");
                  break;
            case 1:
                history.push({
                pathname: "/as",
                });
                break;
            default:
                return history.push("/noRoles");
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
            };
            const data = {
            
                    usuario: response.profileObj.email,
                    persona:{
                        apellidos: response.profileObj.familyName,
                        nombres: response.profileObj.givenName,
                        foto_URL: response.profileObj.imageUrl,
                    }
            }

            try {
                const request = await axios.post(`${url}/usuario/postlogin`, data,secureConfig);
                if(request){
                    console.log(request.data)
                    /* localStorage("user",request.data)  */
                    localStorage.setItem("user", JSON.stringify(request.data.user));
                    localStorage.setItem("token", JSON.stringify(request.data.token));
                    setCurrent(request.data.user.persona.tipo_persona);
                    setLoading(true);
                }
            } catch(except) {
                console.error(except)
                signOut()
            }
            refreshTokenSetup(response)
        }
    }  
    const onFailure = (response) => {
    // console.log(response)
        alert('Error al hacer login')
    }


    return (
        <div>
            <h2>Login Page</h2>
        <GoogleLogin
            clientId={clientId}
            render={renderProps => (
                <Controls.Button
                        variant="outlined"
                        size='small'
                        fullWidth
                        text="Iniciar sesión con correo PUC"
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
        </div>
    );
};

export default LoginPrueba;