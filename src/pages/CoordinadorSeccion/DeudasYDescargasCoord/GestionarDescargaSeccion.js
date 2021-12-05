import React, { useState} from 'react'
import { DT } from '../../../components/DreamTeam/DT'
import Notification from '../../../components/util/Notification';
import {UserContext} from '../../../constants/UserContext';
import ItemSolicitudActual from './ItemSolicitudActual';
import ItemSolicitudActualVacio from './ItemSolicitudActualVacio';
import ListaSolicitudesPasadasSeccion from "./ListaSolicitudesPasadasSeccion"
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
    
    const filtrarTramites = (tramites) =>{
        const filtered = []
        for(let i = 0; i < tramites.length; i++){
            if(tramites[i].procesoDescarga){
                filtered.push(tramites[i])
            }
            console.log("tramites[i].procesoDescarga ", tramites[i].procesoDescarga)
        }
        return filtered
    }

    const getTramitesDescargasSeccion = async () => {
        let procesoActivoNew = await procesoDescargaService.getProcesoDescargaActivoxDepartamento(user.persona.departamento.id)
        const tramites = await tramiteSeccionDescargaService.getTramitesSeccionDescargaxSeccion(user.persona.seccion.id);
        console.log("activooooooo", procesoActivoNew)
        let now = new Date()
        const tramitesFiltrados = filtrarTramites(tramites) 
        /*const tramitesFiltrados = tramites.filter(x => {
            return tramites.procesoDescarga
        })*/
        console.log("Tramites filtrados ", tramitesFiltrados)
        if(procesoActivoNew.length > 0){
            setRecords(tramitesFiltrados.filter(x => {
                const sinplazo= new Date(x.procesoDescarga.fecha_fin)
                return sinplazo.setDate(sinplazo.getDate()+2) < now 
            }))
            //setRecords(tramites)
            const soli =  tramitesFiltrados.find(({procesoDescarga}) =>
                procesoDescarga.id === procesoActivoNew[procesoActivoNew.length - 1].id
            )
            setSolicitudActual(soli)
            console.log("Solicitud actual", soli)
            await setProcesoActivo(procesoActivoNew)
        }     
    }

    React.useEffect(() => {
        //listar todos tramites
        getTramitesDescargasSeccion()
    }, [recordForEdit, createData, confirmDialog])

    return (
        <>
            {/* Proceso actual*/}
            { procesoActivo?.length===0 || new Date(procesoActivo[procesoActivo.length - 1]?.fecha_fin_seccion)<new Date()?
                <ItemSinProcesoDocente/>: (
                    new Date(procesoActivo[procesoActivo.length - 1].fecha_fin_docente) > new Date()?
                        <ItemSinProcesoSeccion proceso = {procesoActivo[procesoActivo.length - 1]}/>:
                    solicitudActual? 
                        <>
                            <DT.Title size="medium" text="Solicitud de Descarga Actual"/>
                            <ItemSolicitudActual
                                solicitudActual={solicitudActual}
                                 procesoActual={procesoActivo[procesoActivo.length - 1]} 
                                setConfirmDialog={setConfirmDialog} confirmDialog={confirmDialog}
                            />
                        </>
                       :<ItemSolicitudActualVacio
                            proceso = {procesoActivo[procesoActivo.length - 1]}
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
