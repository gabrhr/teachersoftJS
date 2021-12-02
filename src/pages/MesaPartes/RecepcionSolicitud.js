/* Author: Gabriela
 * 
 * Se muestran "Solicitudes Secretaria Departamento".  Desde aqui se puede:
 * - Atender una solicitud directamente desde MP
 * - Delegar la solicitud a la persona indicada
 * "/secretaria/mesaPartes/solicitudesGenerales"
 */
import React, { useState } from 'react'
import { UserContext } from '../../constants/UserContext'
import * as MesaPartesService from '../../services/mesaPartesService'
//Iconos Mesa de Partes
import DashboardSoli from './DashboardSoli'

function getSolicitudes(setRecords, departamentoID) {
    MesaPartesService.getSolicitudesByDep(departamentoID) 
        .then(data => {
            data = data ?? []       // fixes el error raro de mala conexion
            /* newer first */
            data.sort((x1, x2) => 
                0 - (new Date(x1.tracking.fecha_enviado) - new Date(x2.tracking.fecha_enviado)))
            setRecords(data)
        })
}

//Para todos los usuarios (excepto Secretaria con ROL = 6)
export default function MisSolicitudes() {
    const [records, setRecords] = useState([])
    const {user, rol} = React.useContext(UserContext);
    const [recordsCargados, setRecordsCargados] = useState(false)
    React.useEffect(() => {
        setRecordsCargados(false)
        getSolicitudes(setRecords, user.persona.departamento.id)
        setRecordsCargados(true)
    }, [user])

    return (
        <DashboardSoli title={"Solicitudes Generales a Mesa de Partes"} 
            delegado={true} 
            records={records} setRecords={setRecords} getSolicitudes={getSolicitudes}
            user={user}    /* FIXME */
            recordsCargados={recordsCargados} setRecordsCargados ={setRecordsCargados}
        />
    )
}

