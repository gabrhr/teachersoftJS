import React, { useState, useContext } from 'react'
import { Typography } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import { DT } from '../../../components/DreamTeam/DT'
import Popup from '../../../components/util/Popup';
import NuevaSolicitudForm from './NuevaSolicitudDescarga';
import Notification from '../../../components/util/Notification';
import {UserContext} from '../../../constants/UserContext';
import ItemSolicitudActual from './ItemSolicitudActual';
import ItemSolicitudActualVacio from './ItemSolicitudActualVacio';
import ListaSolicitudesPasadasSeccion from "./ListaSolicitudesPasadasSeccion"
import tramiteDescargaService from '../../../services/tramiteDescargaService'
import procesoDescargaService from '../../../services/procesoDescargaService'

export default function GestionarDescargaSeccion() {
    /* contiene los ProcesosDesgarga(Horaria) */
    const [records, setRecords] = useState([])
    const [solicitudActual, setSolicitudActual] = useState(null)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [createData, setCreateData] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })
    const { user } = React.useContext(UserContext)
    /* de gestion de ciclo */
    
    const onDelete = (idTramite) => {
        //Serviceeee
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        
        //const nuevaTabla = records.filter(tramitePorEliminar => tramitePorEliminar.id !== idTramite)
        //setRecords(nuevaTabla)
        //tramiteDescargaService.deleteTramiteDescarga(idTramite);
        //Solo se descomenta la línea de arriba
        setSolicitudActual(null)
        setRecordForEdit(null)
        setNotify({
          isOpen: true,
          message: 'Borrado Exitoso',
          type: 'success'
        })
    }

    const getTramitesDescargasDocente = async () => {
        let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        const request = await tramiteDescargaService.getTramitesDescargaPendientesxProcesoxSeccion(procesoActivoNew[0].id, user.persona.seccion.id);

    }

    React.useEffect(() => {
        //listar todos tramites
        getTramitesDescargasDocente()
    }, [recordForEdit, createData, confirmDialog])

    return (
        <>
            {/* Proceso actual*/}
            <DT.Title size="medium"
                text={solicitudActual? "Solicitud de Descarga Actual" : "Nueva solicitud de Descarga"}
            />
            {/* logica para intercambiar si hay proceso actual */}
            {solicitudActual
                ? 
                    <ItemSolicitudActual
                        procesoActual={solicitudActual} setRecordForEdit={setRecordForEdit}
                        onDelete={onDelete}  
                        setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog}
                    />
                   :<ItemSolicitudActualVacio/>
            }

            {/* Procesos Pasados */}
            <DT.Title size="medium"
                text="Histórico de Solicitudes de Descarga Anteriores"
            />
            <ListaSolicitudesPasadasSeccion
                records={records}
            />
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
