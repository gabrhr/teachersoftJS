/* Author: Mitsuo
 * 
 * Pantalla principal para un delegado externo de una Solicitud a MP.
 */
import React from 'react'
import { getListSubheaderUtilityClass, Typography } from '@mui/material'
//import { useParams } from "react-router";
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';
import ExternoAtenderSolicitud from './ExternoAtenderSolicitud';

import axios from 'axios'
import url from '../../config'

/* SERVICES */
import * as MesaPartesService from '../../services/mesaPartesService'
// import personaService from '../../services/personaService'

function getSolicitud(s, setData, data, setSolicitud) {
    let solicitud = null
    axios({
        method: 'get',
        url: `${url}/mesa/${s}`,
        headers: {
            Authorization: data.token
        }
    })
        .then(res => {
            solicitud = MesaPartesService.b2fSolicitud(res.data)
            setData({
                ...data,
                /* "por si acasito" (solo para log) */
                solicitud: solicitud,
                loadingstatus: 'waiting...soli'
            })
            /* For some reason I can't detect changes in data.solicitud
             * Maybe React only detects changes to the useState
             * object but ignores their properties? Idk  */
            setSolicitud({
                ...solicitud,
                doneloading: true
            })
        })
        .catch(error => console.error(error))
}

/* Steps:
 * 1. Login dummy user (limited time token)
 * 2. Wait 'till token is available in "useContext"
 * 3. Login usuario externo & get solicitud
 */
function Lue({ e, s }) {
    const { user, setUser, rol, setRol, token, setToken } = React.useContext(UserContext)
    // const [solicitud, setSolicitud] = React.useState(null)
    const [solicitud, setSolicitud] = React.useState({
        /* just init values */
        ...MesaPartesService.solicitudInit(),
        doneloading: false
    })
    /* data holds the retrieved data from API, stupid useState doesn't return
     * Promises, depends on useEffect */
    const [data, setData] = React.useState({loadingstatus: 'init'})

    const [C, setC] = React.useState(<></>)

    React.useEffect(() => {
        if (typeof token === 'string')
            setData({
                ...data,
                loadingstatus: 'has.token'
            })
    }, [token])

    React.useEffect(() => {
        if (solicitud.doneloading && data.loadingstatus === 'waiting...soli')
            setData({
                ...data,
                loadingstatus: 'has.soli'
            })
    }, [solicitud])

    React.useEffect(() => {
        console.log("retriveddata", data)
        console.log("token", token)
        console.log("soli", solicitud)
        if (data.loadingstatus === 'init') {
            /* get dummy user */
            MesaPartesService.lue({})
                .then(bundle => {
                    setData({
                        ...data,
                        user: bundle.user,
                        rol: bundle.user.persona.tipo_persona,
                        token: bundle.token,
                        loadingstatus: 'waiting...token'
                    })
                    // localStorage.setItem('token', bundle.token)
                    setToken(bundle.token)
                    setRol(bundle.user.persona.tipo_persona)
                    setUser(bundle.user.persona)
                    /* causes bug in ExternoAtenderSolicitud...  ahi usan Back
                     * fmt. */
                    // setUser({persona: data.solicitud.delegado})
                })
        } else if (data.loadingstatus === 'has.token') {
            /* logged in with dummy's user rol & token */
            /* FIXME: needs reload */
            getSolicitud(s, setData, data, setSolicitud)
        } else if (data.loadingstatus === 'has.soli') {
            // setC(
            //     () => 
            //         <ExternoAtenderSolicitud 
            //             solicitud={solicitud} 
            //             setSolicitud={setSolicitud}
            //         />
            // )
            /* proper login */
            MesaPartesService.lue({
                /* De donde vienen estos? */
                nombre: solicitud.delegado.nombre,
                correo: solicitud.delegado.correo,
            })  // logger
                .then(bundle => {
                    setData({
                        ...data,
                        user: bundle.user,
                        rol: bundle.user.persona.tipo_persona,
                        token: bundle.token,
                        loadingstatus: 'yay'
                    })
                    setUser(bundle.user)
                })
        }
    }, [data])

    return (
        <>
            {/* {C} */}
            <ExternoAtenderSolicitud 
                solicitud={solicitud} 
                setSolicitud={setSolicitud}
            />
        </>
    )
}

export default function DelegadoExterno() {
    // shenanigans
    var detalle = window.location.pathname.split('/')[3];
    let params = MesaPartesService._(detalle).split('&')

    let soli = parseInt(params[0])
    let email = params[1]

    return (
        <div>
            <Lue e={email} s={soli} />
        </div>
    )
}
