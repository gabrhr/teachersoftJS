import React from 'react'
import { Typography } from '@mui/material'
//import { useParams } from "react-router";
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';
import ExternoAtenderSolicitud from './ExternoAtenderSolicitud';

/* SERVICES */
import * as MesaPartesService from '../../services/mesaPartesService'

function getSolicitud(s, setSolicitud) {
}

/* 1. Login usuario externo
 * 2. Get solicitud
 * 3. Display
 */
function Lue({ e, s }) {
    const { user, setUser, rol, setRol, token, setToken } = React.useContext(UserContext)
    const [solicitud, setSolicitud] = React.useState({
        ...MesaPartesService.solicitudInit(),
        doneloading: false
        }
    )
    const [C, setC] = React.useState(() => <></>)
    const [doneloading, setDoneloading] = React.useState(false)
    /* data holds the retrieved data from API, stupid useState doesn't return
     * Promises, depends on useEffect */
    const [data, setData] = React.useState({loadingstatus: '0'})

    function handleClick() {
        MesaPartesService.lue(e)
            .then(data => {
                setUser(data.user)
                setRol(data.user.persona.tipo_persona)
                setToken(data.token)
            })
    }

    async function logingetsoli() {
        try {
            let data = await MesaPartesService.lue(e).then()
            await setUser(data.user)
            await setRol(data.user.persona.tipo_persona)
            await setToken(data.token)
            let solicitud = await MesaPartesService.getSolicitud(s)
            await setSolicitud(solicitud)
            /* una vez que termina todo renderizar pantallita */
            setC(() => <ExternoAtenderSolicitud solicitud={solicitud} setSolicitud={setSolicitud}/>)
        } catch (err) {
            console.log(err)
        }
    }
    
    React.useEffect(() => {
        MesaPartesService.lue({})
            .then(bundle => {
                setData({
                    ...data,
                    user: bundle.user,
                    rol: bundle.user.persona.tipo_persona,
                    token: bundle.token,
                    loadingstatus: '1'
                })
            })
        setC(<>hola</>)
    }, [])

    function getSolicitud() {
        return MesaPartesService.getSolicitud(s)
            .then((solicitudes) => {
                console.log(s, solicitudes)
                // if (solicitudes.length === 0)
                //     throw new Error('id de solicitud invalido')
                setData({
                    ...data,
                    solicitud: solicitudes[0],
                    loadingstatus: '2'
                })
                // setSolicitud({
                //     ...solicitudes[0],
                // })
            })
            .catch(error => console.error(error))
    }

    React.useEffect(() => {
        console.log("retriveddata", data)
        /* TODO: */
        /* move React.useEffect [] here with loadingstatus==='0' */
        /* setUser con USER en lugar de con PERSONA */
        if (data.loadingstatus === '1') {
            /* dummy (tienen token) */
            setToken(data.token)
            setTimeout(() => {
                /* delay para que termine de guardar en localstorage */
                console.log('termine de escribir token?')
                getSolicitud()
            }, 1000)
        } else if (data.loadingstatus === '2') {
            /* tiene soli */
            /* FIXME: si no hay soli RIP */
            setUser(data.solicitud.delegado)
            setRol(data.solicitud.delegado.tipo_persona)
            setSolicitud(data.solicitud)
            // setRol(data.solicitud.delegado.tipo_persona)
            /* display it */
            setC(
                () => 
                    <ExternoAtenderSolicitud 
                        solicitud={data.solicitud} 
                        setSolicitud={setSolicitud}
                    />
            )
        }
    }, [data])

    // React.useEffect(() => {
    //     console.log("doneloading", doneloading)
    //     console.log("token", token)
    //     if (doneloading) {
    //         console.log('done loading!')
    //         console.log("doneloading", doneloading)
    //         console.log("token", token)
    //     }
    // }, [token])

    /* pruebita de Promise y useEffect.  useEffect [] ejecuta antes de render */
    // React.useEffect(() => {
    //     new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             window.alert()
    //             resolve(true)
    //         }, 100)
    //     })
    //         .then(() => {
    //             setC(<>Hola mundo</>)
    //         })
    //     // logingetsoli()
    // }, [])

    // React.useEffect(() => {
    //     handleClick()
    // }, [])

    // React.useEffect(() => {
    //     if (user) {
    //         console.log(user)
    //         getSolicitud(s, setSolicitud)
    //     }
    // }, [user])

    // React.useEffect(() => {
    //     /* alldone, render ExternoAtenderSolicitud */
    //     if(solicitud.doneloading)
    //         setC(
    //             () => 
    //                 <ExternoAtenderSolicitud 
    //                     solicitud={solicitud} 
    //                     setSolicitud={setSolicitud}
    //                 />
    //         )
    // }, [solicitud])

    return (
        <>
            {C}
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
