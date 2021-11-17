/* Author: Manuel
 *
 * Detalle de una solicitud.
 * URL: localhost:3000/doc/solicitudDetalle
 */
import { Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, {useContext} from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ContentHeader from '../../components/AppMain/ContentHeader';
import { Controls } from '../../components/controls/Controls';
import { UserContext } from '../../constants/UserContext';
import DetalleSoliOrganism from './DetalleSoliOrganism';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from '@mui/system';
import { DT } from '../../components/DreamTeam/DT';
import ResultadoSolicitud from './ResultadoSolicitud';
import AtenderSolicitudForm from './AtenderSolicitudForm';
import Popup from '../../components/util/Popup';
import DelegarForm from './DelegarForm';
import Notification from '../../components/util/Notification'

// services
import * as MesaPartesService from '../../services/mesaPartesService'



export default function RecepcionDetalleSolicitud() {
    const location= useLocation()
    const {solicitud}=location.state
    const {user} = useContext(UserContext);
    const [atender, setAtender]= React.useState(false)
    const [openPopup, setOpenPopup]= React.useState(false)

    const [notify, setNotify] = React.useState({ 
        isOpen: false, message: '', type: '' 
    })

    const PaperStyle = { 
        borderRadius: '20px', 
        pb: 4, pt: 2, px: 2, 
        color: "primary.light", 
        elevatio: 0 
    }

    function retornar(){
        window.history.back();
    }

    function submitAtencion(atencion) {
        /* respuesta de la solicitud por Secretario Departamento */
        // solicitud.delegado.id = user.persona.id
        solicitud.delegadoID = user.persona.id
        solicitud.delegado = {
            fullName: user.persona.nombres + " " + user.persona.apellidos,
            foto_URL: user.persona.foto_URL
        }
        solicitud.observacion = atencion.observacion
        solicitud.resultado = atencion.resultadoID
        solicitud.tracking.fecha_delegado = new Date().toJSON()
        console.log("submitAtencion", solicitud)
        MesaPartesService.updateSolicitud(solicitud)
            .then(id => {
                window.alert(`Se actualizo la solicitud con id=${id}`)
                setNotify({
                    isOpen: true,
                    message: 'Registro de atencion exitoso',
                    type: 'success'
                })
                setAtender(false)
            })
            .catch(err => {
                /* error :( */
                console.error(err)
                console.log("Error: submitAtencion:", 
                    MesaPartesService.f2bSolicitud(solicitud))
                setNotify({
                    isOpen: true,
                    message: 'Estamos teniendo problemas de conexión.  Consulte a un administrador.',
                    type: 'error'
                })
            })
    }

    return (
        <>
            {/* Encabezado y boton de regreso */}
            <ContentHeader
                text="Mesa de Partes - Detalle de la solicitud"
                cbo={false}
            />
            <Grid
                container
                ml={-1}
                mr={0}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
            <Grid item xs={6} md={1} mb={3}>
                    <Controls.Button
                        variant="outlined"
                        text="Regresar"
                        size="small"
                        startIcon={<ArrowBackIcon />}
                        onClick={retornar}
                    />
            </Grid>
            </Grid>
            <Paper variant="outlined" sx={PaperStyle}>
                {/* Tabla de solicitud y tracking */}
                <DetalleSoliOrganism solicitud={solicitud}/>
                {/* Posibilidades de Atención
                    - Secretaria de Sección(rol=6) -> Boton Atender y Delegar
                    - Usuarios Delegado (rol!=6) -> Boton Atender
                */}

                {/* Respuesta (en recepcion aun no hay respuesta) */}
                { solicitud.resultado!=0? 
                    <ResultadoSolicitud solicitud={solicitud}/> :
                    atender? 
                        <AtenderSolicitudForm 
                            setAtender={setAtender}
                            solicitud={solicitud}
                            submitAtencion={submitAtencion}
                        /> :
                        /* ACCIONES */
                        <Box  mr={"210px"} sx={{display: "flex", justifyContent: 'flex-end'}}> 
                            <Stack mt={2} mb={2}>
                                <Controls.Button
                                    text="Atender"
                                    type="submit"   // html property (not component)
                                    onClick={() => {setAtender(true)}}
                                />
                                <Typography variant="body1" textAlign="center">
                                    o
                                </Typography>
                                <Controls.Button
                                    text="Delegar"
                                    type="submit"   // html property (not component)
                                    onClick={() => {setOpenPopup(true)}}
                                />
                            </Stack>
                        </Box>
                    
                }
            </Paper>
            {/* MODALS */}
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title={"Seleccionar Destinatario"}
            >
               <DelegarForm solicitud={solicitud}/>
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    )
}