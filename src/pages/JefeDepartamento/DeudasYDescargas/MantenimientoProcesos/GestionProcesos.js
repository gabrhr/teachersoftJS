/* Author: Gabs
 *
 * T: Gestion de Procesos de Descarga Horaria.
 * U: Jefe de Departamento
 * P: DeudasYDescargasJefe.js
 * 
 * Obtiene los datos de la BD, y los pasa a ItemProcesoActual y
 * ListaProcesosPasados
 */
import React, { useState, useContext } from 'react'
import { DT } from '../../../../components/DreamTeam/DT'
import Popup from '../../../../components/util/Popup';
import NuevoProcesoForm from './NuevoProcesoForm';
import Notification from '../../../../components/util/Notification';
import procesoDescargaService from '../../../../services/procesoDescargaService';
import {UserContext} from '../../../../constants/UserContext';
import ItemProcesoActual from './ItemProcesoActual';
import ListaProcesosPasados from './ListaProcesosPasados';
import ItemProcesoActualVacio from './ItemProcesoActualVacio';


export default function GestionProcesos() {
    /* contiene los ProcesosDesgarga(Horaria) */
    const [records, setRecords] = useState([])
    const [procesoActual, setProcesoActual] = useState(null)

    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)

    /* de gestion de ciclo */
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const {user, setUser, rol, setRol, setToken} = useContext(UserContext)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const addOrEdit = async (values, resetForm) => {
        //Service
        let ciclo, procesoNew, procesoEdit;
        if(!ciclo) ciclo = await window.localStorage.getItem("ciclo");
        console.log(values)
        if(recordForEdit === null){
            procesoNew = {
                "ciclo":{
                    "id": ciclo
                },
                "fecha_inicio": values.fechaIniDocente,
                "fecha_fin": values.fechaFinDocente ,
                "fecha_fin_docente": values.fechaFinDocente,
                "fecha_fin_seccion": values.fechaFinSeccion,
                "nombre": values.nombre,
                "departamento":{
                    "id": user.persona.seccion.departamento.id
                },
                "autor":{
                    "id": user.persona.id
                }
            }
            procesoDescargaService.registerProcesoDescarga(procesoNew);
            console.log("Se crea un proceso")
        }else{
            procesoEdit = {
                "id": values.id,
                "ciclo":{
                    "id": ciclo
                },
                "fecha_inicio": values.fechaIniDocente,
                "fecha_fin": values.fechaFinProceso ,
                "fecha_fin_docente": values.fechaFinDocente,
                "fecha_fin_seccion": values.fechaFinSeccion,
                "nombre": values.nombre,
                "departamento":{
                    "id": user.persona.seccion.departamento.id
                },
                "autor":{
                    "id": user.persona.id
                }
            }
            procesoDescargaService.updateProcesoDescarga(procesoEdit);
            console.log("Se edita un proceso")
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setNotify({
            isOpen: true,
            message: 'Se ha añadido exitosamente',
            type: 'success'
        })
    }

    const getProcesosDescarga = async() => {
        const procesos = await procesoDescargaService.getProcesosDescarga()
        setRecords(procesos)
        let now = new Date().getTime()        // fecha actual en numerito
        const pro =  procesos.find(({fecha_inicio, fecha_fin}) =>
            Date.parse(fecha_inicio) < now && now < Date.parse(fecha_fin) 
            //console.log(r, Date.parse(p.fecha_inicio), new Date().getTime(), Date.parse(p.fecha_fin))
        )
        setProcesoActual(pro)

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
        getProcesosDescarga()
    }, [recordForEdit, createData, openPopup])


    return (
        <>
            {/* Proceso actual*/}
            {/* logica para intercambiar si hay proceso actual */}
            {procesoActual
                ? 
                    <>
                        <DT.Title size="medium"
                            text="Proceso de Descarga Actual"
                        />
                        <ItemProcesoActual
                            procesoActual={procesoActual}
                            setRecordForEdit={setRecordForEdit}
                            setOpenPopup={setOpenPopup}
                        />
                    
                    </>

                   :<ItemProcesoActualVacio
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
                    setOpenPopup={setOpenPopup}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
