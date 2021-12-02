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

/* input:
 * - s: solicitud
 * - type: "agent,trigger[,recimpient]" 
 * 
 * Self-documenting code, lg!
 */
export function sendemailMP(s, type) {
    let recipient = ''
    let subject = ''
    let content = ''

    console.log("emailService: solicitud: ", s)
    if (type === "solicitador,envia") {
        recipient = s.solicitador.correo
        subject   = `Acaba de enviar una solicitud a Mesa Partes`
        content   = MP_email.soliEnviada(s)
    }
    else if (type === "MP,revisa") {
        /* used in RecepcionDetalleSolicitud.js */
        recipient = s.solicitador.correo
        subject   = `Su solicitud a Mesa de Partes esta siendo revisada`
        content   = MP_email.soliRevisada(s)
    }
    else if (type === "MP,delega") {
        /* used in RecepcionDetalleSolicitud.js */
        recipient = s.delegado.correo
        subject   = `Tiene una solicitud de Mesa Partes pendiente`
        content   = MP_email.soliDelegada(s)
    }
    else if (type === "delegado,atiende") {
        /* used in DelegadoSolicitudDetalle.js */
        /* used in ExternoAtenderSolicitud.js */
        recipient = s.solicitador.correo
        subject   = `Su solicitud fue atendida por ${s.delegado.fullName}`
        content   = MP_email.soliAtendida(s)
    }
    else if (type === "MP,atiende") {
        /* used in RecepcionDetalleSolicitud.js */
        recipient = s.solicitador.correo
        subject   = `Su solicitud fue atendida por Mesa de Partes`
        content   = MP_email.soliAtendida(s)
    }
    else {
        console.error("emailService: emailMP(): invalid type: ", type)
        return 
    }

    sendEmail(dataemail(
        recipient,
        subject,
        content
    )).catch(err => {
        console.error(err)
    })
}
