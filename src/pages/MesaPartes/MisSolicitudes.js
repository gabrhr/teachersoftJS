/* Author: Gabriela
 * 
 * Se muestran "Mis Solicitudes".  Desde aqui se puede:
 * - Generar una nueva solicitud.
 * - Ver detalle de una solicitud.
 * "/doc/misSolicitudes"
 */
import React, { useState,useContext } from 'react'
import { UserContext } from '../../constants/UserContext';
//Iconos Mesa de Partes
import DashboardSoli from './DashboardSoli'

// services
import * as MesaPartesService from '../../services/mesaPartesService';

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

function getSolicitudes(setRecords, user) {
            //FUNCIONES
    //MesaPartesService.getSolicitudesByDep(3) 
    //MesaPartesService.getSolicitudesByIdDel(44) 
    //MesaPartesService.getSolicitud(33)
    //MesaPartesService.getSolicitudesByIdSol(user.id)
    //MesaPartesService.getSolicitudes() 
    console.log(user)
    MesaPartesService.getSolicitudesByIdSol(user.persona.id) 
        .then(data => {
            data.sort((x1, x2) => 
                0 - (new Date(x1.tracking.fecha_enviado) - new Date(x2.tracking.fecha_enviado)))
            setRecords(data ?? [])      // por si acasito
        })
}

//Para todos los usuarios (excepto Secretaria con ROL = 6)
export default function MisSolicitudes() {
    const [records, setRecords] = useState([])

    const {user, rol} = useContext(UserContext);
    // const usuarioLogeado=JSON.parse(localStorage.getItem("user"))

    /* Retrieve initial data from  Back API on first component render */
    React.useEffect(() => {
        getSolicitudes(setRecords, user)
    }, [])

    return (
        <DashboardSoli title={"Mis solicitudes a Mesa de Partes"} 
            records={records} setRecords={setRecords} updateRecords={getSolicitudes}
            user={user}
        />
    )
}

