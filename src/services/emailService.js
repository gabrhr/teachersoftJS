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

function sendEmail(dataemail) {
    return axios({
        method: 'post',
        url: `${url}/email/`,
        data: dataemail,
        ...config
    })
        .then(res => {
            return res.data
        })
}

/* al recien enviar la solicitud
 * s: solicitud */
export function emailConfirmacionEnvio(s) {
    return sendEmail(dataemail(
        s.delegado.correo,
        `Acaba de enviar una solicitud a Mesa Partes`,
        MP_email.soliEnviada(s)
    ))
}

/* al ser **delegado** por Mesa Partes
 * s:  solicitud */
export function emailDelegado(s) {
    return sendEmail(dataemail(
        s.delegado.correo,
        `Tiene una solicitud de Mesa Partes pendiente`,
        MP_email.soliDelegada(s)
    ))
}

/* al ser **atendido** por el Delegado
 * s:  solicitud */
export function emailSolicitor1(s) {
    return sendEmail(dataemail(
        s.solicitador.correo,
        `Su solicitud fue atendida por ${s.delegado.fullName}`,
        MP_email.soliAtendida(s)
    ))
}

/* al ser **atendido** por Mesa Partes
 * s:  solicitud */
export function emailSolicitor2(s) {
    return sendEmail(dataemail(
        s.solicitador.correo,
        `Su solicitud fue atendida por Mesa de Partes`,
        MP_email.soliAtendida(s)
    ))
}