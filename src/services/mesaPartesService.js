/* Author: Mitsuo
 *
 * Todas estas funciones retornas un <Promise>.  Es imposible retornar solo
 * la data.  Ejecutar .then(f) en el retorno de las funciones para que cuando
 * reciba la respuesta del servidor.  Ejecute  `f` sobre la data.
 * 
 * e.g.:
 *  getSolicitudes().then((data) => {setRecords(data)})
 *  getSolicitud(8).then((data) => {setRecord(data)})
 *
 * Llamadas al API de BackEnd para todos los objetos relacionados a mesa de
 * partes:
 * - Solicitud
 * - Tipo Tramite
 * - Tema Tramite (asociado a una seccion - departamento - unidad(aka. facultad))
 */
import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

import * as DTLocalServices from './DTLocalServices'

/* para la funcioncita especial */
// import DepartamentoService from './departamentoService';
// import SeccionService from './seccionService';
// import * as UnidadService from './unidadService'

const config = {
    headers: {
        Authorization: tokenService.getToken()
    },
    timeout: 8000   // ms
}

//#region Funciones auxiliares
export function strcmp(s1, s2) {
    if (s1 < s2) return -1
    else if (s1 > s2) return 1
    else return 0
}

/* (la solicitud tiene tema_tramite y tipo_tramite) */
/* BackEnd format -> FrondEnd format */
function b2fTemaTramite(x) {
    return {
        id: x.id,
        nombre: x.nombre,

        seccion: x.seccion.nombre,
        departamento: x.seccion.departamento.nombre,
        unidad: x.seccion.departamento.unidad
            ? x.seccion.departamento.unidad.nombre
            : null,

        /* RELACIONES */
        seccionID: x.seccion.id
    }
}

function f2bTemaTramite(x) {
    return {
        id: x.id,
        nombre: x.nombre,
        seccion: { id: x.seccionID }
    }
}

function b2fTipoTramite(x) {
    const { id, nombre: temaTramiteNombre, ...other } = b2fTemaTramite(x.temaTramiteMesaDePartes)
    return {
        id: x.id,
        nombre: x.nombre,

        temaTramite: temaTramiteNombre,
        ...other,

        /* RELACIONES */
        temaTramiteID: id
    }
}

function f2bTipoTramite(x) {
    return {
        id: x.id,
        nombre: x.nombre,

        temaTramiteMesaDePartes: { id: x.tramiteID }
    }
}

function b2fPersona(x) {
    return {
        fullName: x.nombres + ' ' + x.apellidos,
        rolName: DTLocalServices(x.tipo_persona),
        correo: x.correo_pucp,
        foto_URL: x.foto_URL,
        seccionDepartamento: x.seccion.departamento.nombre + ' - ' + x.seccion.nombre,
    }
}

function personaInit() {
    const DepartamentoInit = {
        nombre: "SIN DEPARTAMENTO"
    }
    const SeccionInit = {
        nombre: "SIN SECCION",
        departamento: DepartamentoInit
    }

    return {
        nombres: "SIN PERSONA ASIGNADA", apellidos: "",
        correo_pucp: "",
        foto_URL: "",
        seccion: SeccionInit
    }
}

function b2fSolicitud(x) {
    const { id, nombre: tipoTramite, ...other } = b2fTipoTramite(
        x.tipoTramiteMesaDePartes)
    return {
        id: x.id,
        /* nueva solicitud */
        asunto: x.asunto,
        descripcion: x.descripcion,
        solicitador: b2fPersona(x.solicitador ?? personaInit()),
        // archivos: x.archivos,       // ya no se usa

        /* tracking */
        estado: x.estado_tracking.toString(),       // valor
        tracking: {                                 // -----
            fecha_enviado: x.fecha_creacion,        // 0
            fecha_revision: x.fecha_recepcion,      // 1
            fecha_delegado: x.fecha_delegacion,     // 2
            fecha_atendido: x.fecha_atencion        // 3
        },

        /* respuesta */
        delegado: b2fPersona(x.delegado ?? personaInit()),
        resultado: x.resultado,         // 0: pend, 1: acep, 2: rechazado
        observacion: x.observacion,

        tipoTramite: tipoTramite,
        ...other,

        /* RELACIONES (redundant easy access) */
        solicitadorID: x.solicitador ? x.solicitador.id : null,     // personaID
        delegadoID: x.delegado ? x.delegado.id : null,              // personaID
        tipoTramiteID: x.tipoTramiteMesaDePartes
    }
}

/* NO TOCAR */
export function f2bSolicitud(x) {
    let soliback = {
        id: x.id ? x.id : undefined,
        /* nueva solicitud */
        asunto: x.asunto,
        descripcion: x.descripcion,
        solicitador: { id: x.solicitadorID },   // requerido


        /* tracking */
        estado_tracking: parseInt(x.estado, 10),
        fecha_creacion: x.tracking.fecha_enviado 
            ? x.tracking.fecha_enviado 
            : undefined,
        fecha_recepcion: x.tracking.fecha_revision 
            ? x.tracking.fecha_revision 
            : undefined,
        fecha_delegacion: x.tracking.fecha_delegado 
            ? x.tracking.fecha_delegado 
            : undefined,
        fecha_atencion: x.tracking.fecha_atendido 
            ? x.tracking.fecha_atendido 
            : undefined,

        /* respuesta */
        delegado: x.delegadoID ? { id: x.delegadoID } : undefined,
        resultado: x.resultado,
        observacion: x.observacion,

        // tipoTramiteMesaDePartes: { id: x.tipoTramiteID }    // requerido
        tipoTramiteMesaDePartes: { id: 1 }    // requerido
    }
    return soliback
}
//#endregion

/* tema_tramite CRUD operations
 * ===================================*/
export function getTemas() {
    return axios({
        method: 'get',
        url: `${url}/tema/`,
        ...config
    })
        .then(res => {
            res.data.forEach((x, i) => {
                res.data[i] = b2fTemaTramite(x)
            });
            res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
            // showOutput(res)
            return res.data
        })
        .catch(err => console.error(err));
}

/* TODO: work-in-progress */
function registerTema(tema) {
    axios({
        method: 'post',
        url: `${url}/tema/`,
        data: {
            /* DATA OBLIGATORIA */
            ...f2bTemaTramite(tema)
        },
        ...config
    })
        // .then(res => showOutput(res))
        .catch(err => console.error(err));
}

/* tipo_tramite CRUD operations
 * ===================================*/
export function getTipos() {
    return axios({
        method: 'get',
        url: `${url}/tipo/`,
        ...config
    })
        .then(res => {
            res.data.forEach((x, i) => {
                res.data[i] = b2fTipoTramite(x)
            });
            res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
            // showOutput(res)
            return res.data
        })
        .catch(err => console.error(err));
}

/* TODO: work-in-progress */
function registerTipo(tipo) {
    axios({
        method: 'post',
        url: `${url}/tipo/`,
        data: {
            // /* DATA OBLIGATORIA */
            ...f2bTipoTramite(tipo)
        },
        ...config
    })
        //.then(res => showOutput(res))
        .catch(err => console.error(err));
}

/* Solicitud CRUD operations 
 * ===================================*/
export function getSolicitudes() {
    return axios({
        method: 'get',
        url: `${url}/mesa/`,
        ...config
    })
        .then(res => {
            res.data.forEach((x, i) => {
                res.data[i] = b2fSolicitud(x)
            });
            return res.data
        })
        .catch(err => console.error(err));
}

/* id: int */
export function getSolicitud(id) {
    let solicitud = null
    return axios({
        method: 'get',
        url: `${url}/mesa/${id}`,
        ...config
    })
        .then(res => {
            solicitud = b2fSolicitud(res.data)
            return [solicitud]
        })
        .catch(err => console.error(err));
    
}

export function getSolicitudesByIdSol(idPersona) {
    return axios({
        method: 'get',
        url: `${url}/mesa/idsolicitador=${idPersona}`,
        ...config
    })
    .then(res => {
        res.data.forEach((x, i) => {
            res.data[i] = b2fSolicitud(x)
        });
        // res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
        // console.log(res.data)
        // console.log(res)
        return res.data
    })
    .catch(err => console.error(err));
}

export function getSolicitudesByIdDel(idPersona) {
    let solicitud = null;
    return axios({
        method: 'get',
        url: `${url}/mesa/iddelegado=${idPersona}`,
        ...config
    })
    .then(res => {
        res.data.forEach((x, i) => {
            res.data[i] = b2fSolicitud(x)
        });
        // res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
        // console.log(res.data)
        return res.data
    })
    .catch(err => console.error(err));
}

export function getSolicitudesByDep(idDepartamento) {
    let solicitud = null;
    return axios({
        method: 'get',
        url: `${url}/mesa/iddepartamento=${idDepartamento}`,
        ...config
    })
    .then(res => {
        res.data.forEach((x, i) => {
            res.data[i] = b2fSolicitud(x)
        });
        // res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
        // console.log(res.data)
        return res.data
    })
    .catch(err => console.error(err));
}

export function registerSolicitud(soli) {
    return axios({
        method: 'post',
        url: `${url}/mesa/`,
        data: {
            ...f2bSolicitud(soli)
        },
        ...config
    })
        .then(res => {
            // console.log("MPservice: registerSoli:", res)
            return res.data.id
        })
        // .catch(err => console.error(err));
}

export function updateSolicitud(soli) {
    return axios({
        method: 'put',
        url: `${url}/mesa/`,
        data: {
            ...f2bSolicitud(soli),
        },
        ...config
    })
        .then(res => {
            // console.log("MPservice: registerSoli:", res)
            return res.data.id
        })
        // .catch(err => console.error(err));
}
