/* Author: Manuel
 *
 * Detalle de una solicitud.
 * URL: localhost:3000/doc/solicitudDetalle
 */
import React from 'react'
import { useLocation } from 'react-router';
import { Controls } from '../../components/controls/Controls';
import DetalleSoliOrganism from './DetalleSoliOrganism';


export default function SolicitudDetalle() {
    const location= useLocation()
    const {solicitud}=location.state

    return (
        <>
            <DetalleSoliOrganism solicitud={solicitud}/>
            <div>
            </div>
        </>
    )
}
