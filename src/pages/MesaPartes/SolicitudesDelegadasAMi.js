import React, { useState } from 'react'
import * as MesaPartesService from '../../services/mesaPartesService'
//Iconos Mesa de Partes
import DashboardSoli from './DashboardSoli'


export default function SolicitudesDelegadasAMi() {
    const [records, setRecords] = useState([])

    /* Solo puede devolver promesa.  El .then() anterior devuelve lo que recibe
     * este then (res.data  (ya transformada)).  Cuando recibe la respuesta,
     * cambia records. */
    function getSolicitudes() {
        MesaPartesService.getSolicitudes()
            .then(data => {
                setRecords(data ?? [])
            })
    }
    /* ¿Cuando se ejecuta? */
    React.useEffect(() => {
        getSolicitudes()
    }, [])

    return (
        <DashboardSoli title={"Mis solicitudes a Mesa de Partes"} records={records} setRecords={setRecords}/>
    )
}
