import React, { useState } from 'react'
import * as MesaPartesService from '../../services/mesaPartesService'
//Iconos Mesa de Partes
import DashboardSoli from './DashboardSoli'


export default function SolicitudesDelegadasAMi() {
    const [records, setRecords] = useState([])

    /* Solo puede devolver promesa.  El .then() anterior devuelve lo que recibe
     * este then (res.data  (ya transformada)).  Cuando recibe la respuesta,
     * cambia records. */
    const usuario = JSON.parse(localStorage.getItem("user"));
    //console.log(usuarioActual);
    
    
    function getSolicitudes() {
        MesaPartesService.getSolicitudesByIdDel(usuario.persona.id)
            .then(data => {
                setRecords(data ?? [])
            })
    }
    
    /* ¿Cuando se ejecuta? */
    React.useEffect(() => {
        getSolicitudes()
    }, [])

    return (
        <DashboardSoli title={"Solicitudes delegadas por Mesa de Partes"} delegado={true} records={records} setRecords={setRecords}/>
    )
}
