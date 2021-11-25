import React from 'react'
import { Typography } from '@mui/material'
//import { useParams } from "react-router";
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';
import ExternoAtenderSolicitud from './ExternoAtenderSolicitud';

/* SERVICES */
import * as MesaPartesService from '../../services/mesaPartesService'

function getSolicitud(s, setSolicitud) {
    MesaPartesService.getSolicitud(s)
        .then((solicitudes) => {
            console.log(s, solicitudes)
            setSolicitud({
                ...solicitudes[0],
            })
        })
}

function Lue({ e, s }) {
    const { user, setUser, rol, setRol, setToken } = React.useContext(UserContext)
    const [solicitud, setSolicitud] = React.useState(
        MesaPartesService.solicitudInit()
    )
    const [C, setC] = React.useState(() => <></>)

    function handleClick() {
        MesaPartesService.lue(e)
            .then(data => {
                setUser(data.user)
                setRol(data.user.persona.tipo_persona)
                setToken(data.token)
            })
    }

    React.useEffect(() => {
        handleClick()
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            getSolicitud(s, setSolicitud)
        }, 1000)
    }, [user])

    React.useEffect(() => {
        /* alldone, render ExternoAtenderSolicitud */
        setC(
            () => 
                <ExternoAtenderSolicitud 
                    solicitud={solicitud} 
                    setSolicitud={setSolicitud}
                />
        )
    }, [solicitud])

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
