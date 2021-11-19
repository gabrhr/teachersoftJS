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

/* al ser delegado por Mesa Partes
 * s:  solicitud */
export function emailSolicitor2(s) {
    return axios({
        method: 'post',
        url: `${url}/email/`,
        data: dataemail(
            s.solicitador.correo,
            `Su solicitud #${s.id} fue atendida`,
            MP_email.soliDelegada(s)
        ),
        ...config
    })
        .then(res => {
            return res.data.id
        })
}