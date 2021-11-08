/* Author: Mitsuo
 *
 * Llamadas al API de BackEnd para todos los objetos relacionados a mesa de
 * partes:
 * - Solicitud
 * - Tipo Tramite
 * - Tema Tramite (asociado a una seccion - departamento - unidad(aka. facultad))
 */
import axios from 'axios'
import url from '../config'
import tokenService, { getToken } from './tokens.js';

const url = "http://back.teachersoft.solutions:8080";
const config = {
    headers: {
        Authorization: tokenService.getToken()
    },
    timeout: 5000   // ms
}

/* FUNCIONES AUXILIARES */

function strcmp(s1, s2) {
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
            : null
    }
}

function b2fTipoTramite(x) {
    const { id, nombre: temaTramiteNombre, ...other } = b2fTemaTramite(x.temaTramiteMesaDePartes)
    return {
        id: x.id,
        nombre: x.nombre,

        temaTramite: temaTramiteNombre,
        ...other
    }
}

function b2fPersona(x) {
    return {
        fullName: x.nombres + ' ' + x.apellidos,
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
    const { id, nombre: tipoTramite, ...other } = b2fTipoTramite(x.tipoTramiteMesaDePartes)
    return {
        id: x.id,
        asunto: x.asunto,
        descripcion: x.descripcion,
        solicitador: b2fPersona(x.solicitador ?? personaInit()),
        archivos: x.archivos,
        delegado: b2fPersona(x.delegado ?? personaInit()),
        tracking: {
            fecha_enviado: x.fecha_creacion,
            fecha_revision: x.fecha_recepcion,
            fecha_delegado: x.fecha_delegacion,
            fecha_atendido: x.fecha_atencion
        },
        estado: x.estado_tracking,  // del tracking
        resultado: x.resultado,

        tipoTramite: tipoTramite,
        ...other,
        // _backFormat: x          // Luego ver como recuperar los ids. 
        // no se deberia usar esto porque los ids,
        // deberian salir de los combobox.
    }
}

/* ----------FIN FUNCIONES AUXILIARES------------------ */

/* tema_tramite CRUD operations
 * ===================================*/
export function getTemas() {
    axios({
        method: 'get',
        url: `${url}/tema/`,
        ...config
    })
        .then(res => {
            res.data.forEach((x, i) => {
                res.data[i] = b2fTemaTramite(x)
            });
            // res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
            showOutput(res)
        })
        .catch(err => console.error(err));
}

/* TODO: work-in-progress */
function registerTema() {
    axios({
        method: 'post',
        url: `${url}/tema/`,
        data: {
            /* DATA OBLIGATORIA */
            // asunto: 'Asunto1',              // opcional
            // solicitador: { id: 30 },          // opcional
            // seccion: { id: 3 },
            // tipoTramiteMesaDePartes: { id: 1 }
        },
        ...config
    })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

/* tipo_tramite CRUD operations
 * ===================================*/
export function getTipos() {
    axios({
        method: 'get',
        url: `${url}/tipo/`,
        ...config
    })
        .then(res => {
            res.data.forEach((x, i) => {
                res.data[i] = b2fTipoTramite(x)
            });
            res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
            showOutput(res)
        })
        .catch(err => console.error(err));
}

/* TODO: work-in-progress */
function registerTipo() {
    axios({
        method: 'post',
        url: `${url}/tipo/`,
        data: {
            // /* DATA OBLIGATORIA */
            // asunto: 'Asunto1',              // opcional
            // solicitador: { id: 30 },          // opcional
            // seccion: { id: 3 },
            // tipoTramiteMesaDePartes: { id: 1 }
        },
        ...config
    })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}

/* Solicitud CRUD operations 
 * ===================================*/
export function getSolicitudes() {
    axios({
        method: 'get',
        url: `${url}/mesa/`,
        ...config
    })
        .then(res => {
            res.data.forEach((x, i) => {
                res.data[i] = b2fSolicitud(x)
            });
            // res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
            showOutput(res)
        })
        .catch(err => console.error(err));
}

/* id: int */
export function getSolicitud(id) {
    axios({
        method: 'get',
        url: `${url}/mesa/${id}`,
        ...config
    })
        .then(res => {
            res.data.forEach((x, i) => {
                res.data[i] = b2fSolicitud(x)
            });
            // res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
            showOutput(res)
        })
        .catch(err => console.error(err));
}

/* TODO: work-in-progress */
function registerSolicitud() {
    axios({
        method: 'post',
        url: `${url}/mesa/`,
        data: {
            // /* DATA OBLIGATORIA */
            // asunto: 'Asunto1',              // opcional
            // solicitador: { id: 30 },          // opcional
            // seccion: { id: 3 },
            // tipoTramiteMesaDePartes: { id: 1 }
        },
        ...config
    })
        .then(res => showOutput(res))
        .catch(err => console.error(err));
}
