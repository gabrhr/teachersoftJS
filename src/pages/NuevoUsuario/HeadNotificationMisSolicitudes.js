/* Author: Mitsuo
 * 
 * Notificacion para mostrar arribita de MisSolicitudes en la pagina de un
 * usuario nuevo sin permisos
 */

import React from 'react'
import { Typography, Divider } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'

export default function HeadNotificationMisSolicitudes() {
    return (
        <div>
            <DT.Title size="medium" text="Nuevo Usuario del Sistema"/>
            <Typography children="Registro de informacion completo, ahora puede enviar su solicitud.  Sin embargo, por motivos de seguridad, solo puede enviar una cantidad limitada de solicitudes." />
            <Divider sx={{ my: 1 }} />
        </div>
    )
}
