import React, { useState } from 'react'
import * as MesaPartesService from '../../services/mesaPartesService'
//Iconos Mesa de Partes
import DashboardSoli from './DashboardSoli'


function getSolicitudes(setRecords, user) {
    console.log(user)
    MesaPartesService.getSolicitudesByIdDel(user.persona.id) 
        .then(data => {
            data = data ?? []       // fixes el error raro de mala conexion
            data.sort((x1, x2) => 
                /* FIXME:  tal vez sea mejor por fecha_delegado,  por ahora se
                 *         deja asi porque puede que halla algunas sin fecha
                 *         delegado */
                /* newer first */
                0 - (new Date(x1.tracking.fecha_enviado) - new Date(x2.tracking.fecha_enviado))
            )
            setRecords(data)
        })
}

export default function SolicitudesDelegadasAMi() {
    const [records, setRecords] = useState([])

    /* Solo puede devolver promesa.  El .then() anterior devuelve lo que recibe
     * este then (res.data  (ya transformada)).  Cuando recibe la respuesta,
     * cambia records. */
    const usuario = JSON.parse(localStorage.getItem("user"));
    //console.log(usuarioActual);
    
    React.useEffect(() => {
        getSolicitudes(setRecords, usuario)
    }, [])

    return (
        <DashboardSoli title={"Solicitudes delegadas por Mesa de Partes"} delegado={true} records={records} setRecords={setRecords}/>
    )
}
