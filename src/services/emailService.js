/* Author: Mitsuo
 *
 * Llamadas al REST API "POST /email/"
 */
import axios from 'axios'
import url from '../config'
import tokenService from './tokens.js';

import * as DTLocalServices from './DTLocalServices'
import * as MP_email from './data/MP_email'

const config = {
    headers: {
        Authorization: tokenService.getToken()
    },
    timeout: 8000   // ms
}

function dataemail(dest, subject, body) {
    return [body, dest, subject]
}

/* Mesa de Partes
 * ===================================*/

/* al ser **delegado** por Mesa Partes
 * s:  solicitud */
export function emailDelegado(s) {
    return axios({
        method: 'post',
        url: `${url}/email/`,
        data: dataemail(
            s.delegado.correo,
            `Tiene una solicitud con id #${s.id} de Mesa Partes pendiente`,
            MP_email.soliDelegada(s)
        ),
        ...config
    })
        .then(res => {
            return res.data
        })
}

/* al ser **delegado** por el Delegado
 * s:  solicitud */
export function emailSolicitor1(s) {
    return null
}

/* al ser **atendido** por Mesa Partes
 * s:  solicitud */
export function emailSolicitor2(s) {
    return axios({
        method: 'post',
        url: `${url}/email/`,
        data: dataemail(
            s.solicitador.correo,
            `Su solicitud con id #${s.id} fue atendida`,
            MP_email.soliAtendidaMP(s)
        ),
        ...config
    })
        .then(res => {
            return res.data
        })
}