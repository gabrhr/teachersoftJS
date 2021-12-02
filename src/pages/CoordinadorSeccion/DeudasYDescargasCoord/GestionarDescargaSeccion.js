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
import tramiteSeccionDescargaService from '../../../services/tramiteSeccionDescargaService'
import ItemSinProcesoDocente from '../../Docente/DeudasYDescargas/ItemSinProcesoDocente';
import ItemSinProcesoSeccion from './ItemSinProcesoSeccion';

export default function GestionarDescargaSeccion() {
    /* contiene los ProcesosDesgarga(Horaria) */
    const [records, setRecords] = useState([])
    const [solicitudActual, setSolicitudActual] = useState(null)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [createData, setCreateData] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subtitle: '' })
    const { user } = React.useContext(UserContext)
    const [procesoActivo, setProcesoActivo] = useState([])
    
    const onDelete = (idTramite) => {
        //Serviceeee
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        
        const nuevaTabla = records.filter(tramitePorEliminar => tramitePorEliminar.id !== idTramite)
        setSolicitudActual(null)
        setRecordForEdit(null)
        setRecords(nuevaTabla)
        tramiteSeccionDescargaService.deleteTramitesSeccionDescarga(idTramite);
        //Solo se descomenta la línea de arriba
        setNotify({
            isOpen: true,
            message: 'Borrado Exitoso',
            type: 'success'
        })
    }
    
    const getTramitesDescargasSeccion = async () => {
        let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        const tramites = await tramiteSeccionDescargaService.getTramitesSeccionDescargaxSeccion(user.persona.seccion.id);
        setRecords(tramites)
        const soli =  tramites.find(({procesoDescarga}) =>
            procesoDescarga.id === procesoActivoNew[0].id
        )
        setSolicitudActual(soli)
        await setProcesoActivo(procesoActivoNew)
    }

    React.useEffect(() => {
        //listar todos tramites
        getTramitesDescargasSeccion()
    }, [recordForEdit, createData, confirmDialog])

    return (
        <>
            {/* Proceso actual*/}
            { procesoActivo?.length===0?
                <ItemSinProcesoDocente/>: (
                    new Date(procesoActivo[0].fecha_fin_docente) > new Date()?
                        <ItemSinProcesoSeccion proceso = {procesoActivo[0]}/>:
                    solicitudActual? 
                        <>
                            <DT.Title size="medium" text="Solicitud de Descarga Actual"/>
                            <ItemSolicitudActual
                                solicitudActual={solicitudActual} setRecordForEdit={setRecordForEdit}
                                onDelete={onDelete}  procesoActual={procesoActivo[0]} 
                                setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog}
                            />
                        </>
                       :<ItemSolicitudActualVacio
                            proceso = {procesoActivo[0]}
                       />
                )
                           
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
