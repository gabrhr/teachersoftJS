/* Author: Mitsuo
 * 
 * Notificacion para mostrar arribita de MisSolicitudes en la pagina de un
 * usuario nuevo sin permisos
 * 
 * Note:  Esto antes estaba pensado solo para MisSolicitudes,  pero parace que
 *        se puede utilizar en otros lugares,  entonces ahora es un componente
 *        reutilizable.  Moverlo es mucho problema.
 * 
 *        Tal vez podria ser reemplazado por ContentHeader?  No se.
 */

import React from 'react'
import { Typography, Divider } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'

export default function HeadNotificationMisSolicitudes(props) {
    let { title, body } = props

    title = title ?? "Nuevo Usuario del Sistema"
    body = body ?? 
"Registro de informacion completo, ahora puede enviar su solicitud.  Sin embargo, por motivos de seguridad, solo puede enviar una cantidad limitada de solicitudes." 

    return (
        <div>
            <DT.Title size="medium" text={title}/>
            <Typography children={body}/>
            <Divider sx={{ my: 1 }} />
        </div>
    )
}
