/* Author: Gabs
 *
 * T: Gestion de Procesos de Descarga Horaria.
 * U: Jefe de Departamento
 * P: DeudasYDescargasJefe.js
 * 
 * Obtiene los datos de la BD, y los pasa a ItemProcesoActual y
 * ListaProcesosPasados
 */
import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { Controls } from '../../../../components/controls/Controls'
import { DT } from '../../../../components/DreamTeam/DT'
import Popup from '../../../../components/util/Popup';
import NuevoProcesoForm from './NuevoProcesoForm';
import Notification from '../../../../components/util/Notification';

import ItemProcesoActual from './ItemProcesoActual';
import ListaProcesosPasados from './ListaProcesosPasados';
import ItemProcesoActualVacio from './ItemProcesoActualVacio';


function createData(id, nombre, fechaip, fechafp, fechafs, fechafd) {
    return {
        id, nombre, fechaip, fechafp, fechafs, fechafd
    }
}

const pruebita = [
    createData('0', 'proceso 1 2021', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm'),
    createData('1', 'proceso 2 2021', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm'),
    createData('2', 'proceso 3 2021', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm', '2021-09-30 01:14 pm'),
]

export default function GestionProcesos() {
    /* contiene los ProcesosDesgarga(Horaria) */
    const [records, setRecords] = useState(pruebita)
    const [procesoActual, setProcesoActual] = useState(null)

    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)

    /* de gestion de ciclo */
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const addOrEdit = (proceso, resetForm) => {
        //Service

        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Se ha añadido exitosamente',
            type: 'success'
        })
    }

    /* Aqui jala la data de BD? */
    React.useEffect(() => {
        /* si un proceso tiene:
         * p.fecha_inicio <= new Date() <= p.fecha_fin 
         * 
         * Entonces es "procesoActual" y en lugar de mostrarlo en la Lista
         * de Procesos de Descarga Anteriores se muestra en la parte superior
         * (En el componenete ItemProcesoActual) (hacer un 
         *     setProcesoActual(records.find())
         *     setRecords({records.filter()})
         * )
         * 
         * Si no existe, puede crear uno. (El boton de crear esta en
         * ItemProcesoActualVacio)
         */

        // serviceeeeeeeeeee
        /*  getCiclos()
         .then (newDep =>{
           setRecords(newDep);
           console.log(newDep);
           setDeleteData(false);
           setCreateData(false);
         }); */
    }, [recordForEdit, createData])

    return (
        <>
            {/* Proceso actual*/}
            <DT.Title size="medium"
                text="Si existe solicitud ? Proceso de Solicitudes de Descarga Vigente : Nueva Proceso de Descargas  "
            />
            {/* logica para intercambiar si hay proceso actual */}
            {procesoActual
                ? 
                    <ItemProcesoActual
                        procesoActual={procesoActual}
                    />
                :   <ItemProcesoActualVacio
                        addOrEdit={addOrEdit}
                        setOpenPopup={setOpenPopup}
                    />
            }

            {/* Procesos Pasados */}
            <DT.Title size="medium"
                text="Lista de Procesos de Descarga Anteriores"
            />
            <ListaProcesosPasados
                records={records}
                setRecordForEdit={setRecordForEdit}
                setOpenPopup={setOpenPopup}
            />

            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Nuevo Proceso de Descarga"
            >
                <NuevoProcesoForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
