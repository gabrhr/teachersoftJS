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
 */
import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

const config = {
    headers: {
        Authorization: tokenService.getToken()
    },
    timeout: 5000   // ms
}

/* FUNCIONES AUXILIARES */

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

/* -----------fin de funciones auxiliares-------------- */

export function getUnidades() {
    return axios({
        method: 'get',
        url: `${url}/unidad/`,
        ...config
    })
        .then(res => {
            // res.data.forEach((x, i) => {
            //     res.data[i] = b2fTipoTramite(x)
            // });
            // res.data.sort((x1, x2) => strcmp(x1.nombre, x2.nombre))
            // showOutput(res)
            return res.data
        })
        .catch(err => console.error(err));
}

