import React, {useState} from 'react'
/* ICONS */

import { Controls } from '../../../components/controls/Controls';
import { Grid, Typography, Divider } from '@mui/material';
import NuevaDescargaDocente from './NuevaDescargaDocente';
import Notification from '../../../components/util/Notification';
import Popup from '../../../components/util/Popup';
import ContentHeader from '../../../components/AppMain/ContentHeader';
import ListaDescargasPasadasDocente from './ListaDescargasPasadasDocente';
import ItemDescargaActualDocente from './ItemDecargaActualDocente'
import ItemDecargaVaciaDocente from './ItemDecargaVaciaDocente'
import { DT } from '../../../components/DreamTeam/DT';
import ResumenDocente from '../../../components/DreamTeam/ResumenDocente';
import { UserContext } from '../../../constants/UserContext';




export default function GestionDescargaDocente() {
    const [openPopup, setOpenPopup] = useState(false)
    const [records, setRecords] = useState([])
    const [descargaActual, setDescargaActual] = useState([])
    const [deleteData, setDeleteData] = useState(false)
    const [createData, setCreateData] = useState(false);
    const [updateData, setUpdateData] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const { user } = React.useContext(UserContext)
    
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
    const onDelete = (idCiclo) => {
        // if (!window.confirm('Are you sure to delete this record?'))
        //   return

        //Serviceeee
       /*  setDeleteData(true);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        console.log(records)
        console.log(idCiclo)
        //console.log(id)
        const nuevaTabla = records.filter(cicloPorEliminar => cicloPorEliminar.id !== idCiclo)
        console.log(nuevaTabla)
        CicloService.deleteCiclo(idCiclo);
 
        setNotify({
          isOpen: true,
          message: 'Borrado Exitoso',
          type: 'success'
        }) */
    }
    React.useEffect(() => {
        // serviceeeeeeeeeee
       /*  getCiclos()
        .then (newDep =>{
          setRecords(newDep);
          console.log(newDep);
          setDeleteData(false);
          setCreateData(false);
        }); */
    }, [recordForEdit, createData. deleteData])
    
    
    return (
        <>
            <ContentHeader text={"Solicitudes de Descarga"} cbo={false} />
            {/* Solicitud actual del año */}
            <Grid container>
                <Grid item xs={8} sx={{overflow:"scrollY"}}>
                    <div style={{ display: "flex", paddingRight: "5px", marginTop: 20 }}>
                        <Controls.AddButton
                            title="Agregar Nueva Solicitud"
                            variant="iconoTexto"
                            onClick = {() => {setOpenPopup(true);}}
                        />
                    </div>
                    <ItemDescargaActualDocente
                        descargaActual={descargaActual}
                        setRecordForEdit={setRecordForEdit}
                        setOpenPopup={setOpenPopup}
                    />
                    <ItemDecargaVaciaDocente
                        addOrEdit={addOrEdit}
                        setOpenPopup={setOpenPopup}
                    />
                
                    {/* Solicitud Pasada */}
                    <DT.Title size="medium" text="Lista de Solicitudes de Descarga Pasadas"/>
                    <ListaDescargasPasadasDocente 
                        records={records}
                        setRecordForEdit={setRecordForEdit}
                        setOpenPopup={setOpenPopup}
                        onDelete={onDelete}
                    />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{mx:2}} />
                <Grid item xs={3}>
                    <ResumenDocente docente={user}/>
                </Grid>
            </Grid>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title= {recordForEdit ? "Editar Solicitud de Descarga": "Nueva Solicitud de Descarga"}
                size="sm"
            >
                <NuevaDescargaDocente 
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

