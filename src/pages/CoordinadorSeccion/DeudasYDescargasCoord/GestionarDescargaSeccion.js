import React, { useState, useContext } from 'react'
import { Typography } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import { DT } from '../../../components/DreamTeam/DT'
import Popup from '../../../components/util/Popup';
import NuevaSolicitudForm from './NuevaSolicitudDescarga';
import Notification from '../../../components/util/Notification';
import {UserContext} from '../../../constants/UserContext';
import ItemSolicitudActual from './ItemProcesoActual';
import ItemSolicitudActualVacio from './ItemProcesoActualVacio';
import ListaSolicitudesPasadasSeccion from "./ListaSolicitudesPasadasSeccion"


export default function GestionarDescargaSeccion() {
    /* contiene los ProcesosDesgarga(Horaria) */
    const [records, setRecords] = useState([
        {
            fecha_enviado: '1/1/1',
            asunto: 'AYUDA',
            seccion: {
                nombre: 'Ingeniería Informática'
            },
            solicitador: {
                fullName: 'Yo'
            },
            estado: 'No atendido',
            proceso: {
                nombre: 'Proceso 1'
            },
            solicitudes_recibidas: 10,
            solicitudes_enviadas: 8,
            solicitudes_aprobadas: 1
        }
    ])
    const [solicitudActual, setSolicitudActual] = useState(null)
    const [recordForEdit, setRecordForEdit] = useState(null)

    /* de gestion de ciclo */
    
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


    return (
        <>
            {/* Proceso actual*/}
            <DT.Title size="medium"
                text="Si existe solicitud ? Proceso de Solicitudes de Descarga Vigente : Nueva Proceso de Descargas  "
            />
            {/* logica para intercambiar si hay proceso actual */}
            {solicitudActual
                ? 
                    <ItemSolicitudActual
                        procesoActual={solicitudActual}
                        setRecordForEdit={setRecordForEdit}
                    />
                   :<ItemSolicitudActualVacio
                    />
            }

            {/* Procesos Pasados */}
            <DT.Title size="medium"
                text="Lista de Solicitudes de Descarga Anteriores"
            />
            <ListaSolicitudesPasadasSeccion
                records={records}
                setRecordForEdit={setRecordForEdit}
            />
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
