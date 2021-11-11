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
import * as UnidadService from '../../services/unidadService';
import DepartamentoService from '../../services/departamentoService'
import SeccionService from '../../services/seccionService'

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
            setRecords(data ?? [])
        })
}

function getUnidades(setUnidad) {
    UnidadService.getUnidades()
        .then(us => {
            setUnidad(us)
        })
}
function getDepartamentos(setDepartamento) {
    DepartamentoService.getDepartamentos()
        .then(ds => {
            setDepartamento(ds)
        })
}
function getSecciones(setSeccion) {
    SeccionService.getSecciones()
        .then(secs => {
            setSeccion(secs)
        })
}
function getTemaTramites(setTemaTramite) {
    MesaPartesService.getTemas()
        .then(temas => {
            setTemaTramite(temas)
        })
}
function getTiposTramites(setTipoTramite) {
    MesaPartesService.getTipos()
        .then(tipos => {
            setTipoTramite(tipos)
        })
}

// function getUnidades(comboData, setComboData)

//Para todos los usuarios (excepto Secretaria con ROL = 6)
export default function MisSolicitudes() {
    const [records, setRecords] = useState([])

    const {user, rol} = useContext(UserContext);
    // const usuarioLogeado=JSON.parse(localStorage.getItem("user"))
    
    /* data para mostrar en los combobox */
    const [unidad, setUnidad] = React.useState([])
    const [departamento, setDepartamento] = React.useState([])
    const [seccion, setSeccion] = React.useState([])
    const [temaTramite, setTemaTramite] = React.useState([])
    const [tipoTramite, setTipoTramite] = React.useState([])
    const comboData = 
        {
            unidad: unidad,
            departamento: departamento,
            seccion: seccion,
            temaTramite: temaTramite,
            tipoTramite: tipoTramite
        }

    /* Retrieve initial data from  Back API on first component render */
    React.useEffect(() => {
        getSolicitudes(setRecords, user)
        getUnidades(setUnidad)
        getDepartamentos(setDepartamento)
        getSecciones(setSeccion)
        getTemaTramites(setTemaTramite)
        getTiposTramites(setTipoTramite)
        /* note:  estados no tiene porque solo es un numero codigo */
    }, [])

    return (
        <DashboardSoli title={"Mis solicitudes a Mesa de Partes"} 
            records={records} setRecords={setRecords} updateRecords={getSolicitudes}
            user={user}
            comboData={comboData}
        />
    )
}

