/* Author: Gabriela
 * 
 * Se muestran "Mis Solicitudes".  Desde aqui se puede:
 * - Generar una nueva solicitud.
 * - Ver detalle de una solicitud.
 * "/doc/misSolicitudes"
 */
import React, { useState } from 'react'
import * as MesaPartesService from '../../services/mesaPartesService'
//Iconos Mesa de Partes
import DashboardSoli from './DashboardSoli'

/* function createData(id, asunto, descripcion, fecha, autorNombre, estado) {
    return {
        id, asunto, descripcion, fecha, autorNombre, estado
    }
}
const usuarios2 = [
    createData('0', 'Solicitud Descarga 2019', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '0'),
    createData('1', 'Solicitud Descarga 2021', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '1'),
    createData('2', 'Solicitud Descarga 2020', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '2'),
    createData('3', 'Solicitud Descarga 2020', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '3'),
    createData('4', 'Solicitud Descarga 2020', 'Se estima los siguientes docentes ...', '2021-09-30 01:14 pm', 'Caceres', '3'),
]
 */

//Para todos los usuarios (excepto Secretaria con ROL = 6)
export default function MisSolicitudes() {
    const [records, setRecords] = useState([])

    /* Solo puede devolver promesa.  El .then() anterior devuelve lo que recibe
     * este then (res.data  (ya transformada)).  Cuando recibe la respuesta,
     * cambia records. */
    const idUser = JSON.parse(localStorage.getItem("user")).id;
    //console.log(usuarioActual);
    
    
    function getSolicitudes() {
                //FUNCIONES
        //MesaPartesService.getSolicitudesByDep(3) 
        //MesaPartesService.getSolicitudesByIdDel(44) 
        //MesaPartesService.getSolicitudesByIdSol(44) 
        MesaPartesService.getSolicitudesByIdSol(idUser)
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

