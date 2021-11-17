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

export default function RecepcionDetalleSolicitudFuncion() {
    const location= useLocation()
    const {solicitudinit} = location.state
    const [solicitud, setSolicitud] = React.useState(solicitudinit)         // <---- NO SIRVE
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

    React.useEffect(() => {
        window.alert('Se modifico `solicitud` revisar consola')
        console.log(solicitud)
        if (solicitud.estado === '1') {
            /* secretario entra a la solicitud detalle (cabios listos) */
            window.alert('estado actualizado a "En revision')
            MesaPartesService.updateSolicitud(solicitud)
                .catch(err => {console.error(err)})
        } else if (solicitud.estado === '3') {
            /* secreatrio responde en lugar del delegado */
            window.alert('estado actualizado a "Atendido"')
            console.log("submitAtencion", solicitud)
            MesaPartesService.updateSolicitud(solicitud)
                .then(id => {
                    // window.alert(`Se actualizo la solicitud con id=${id}`)
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
    }, [solicitud])

    /* Secretario entra a la solicitud detalle */
    React.useEffect(() => {
        /* set estado "En revision" (estado=1) */
        if (solicitud.estado === '0') {
            setSolicitud(solicitud => ({
                ...solicitud,
                estado: '1',
                tracking: {
                    ...solicitud.tracking,
                    fecha_revision: new Date().toJSON()
                }
            }))
        }
        // console.log('hola', solicitud)
    }, [])

    /* secreatrio responde en lugar del delegado */
    function submitAtencion(atencion) {
        /* FIXME:  Respuesta de la solicitud Observacion no se actualiza luego de
         *         hacer submit aqui.  Tiene que salir y volver a entrar a
         *         RecepcionDetalleSolicitud */
        setSolicitud(solicitud => ({
            ...solicitud, 
            /* data faltante de la respuesta de soli por Secretario Dpto. */
            delegadoID: user.persona.id,
            delgado: {
                fullName: user.persona.nombres + " " + user.persona.apellidos,
                foto_URL: user.persona.foto_URL,
            },
            estado: '3',
            tracking: {
                ...solicitud.tracking,
                fecha_atendido: new Date().toJSON()
            },
            observacion: atencion.observacion,
            resultado: atencion.resultadoID,
        }))
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

                { atender? 
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
                {/* Respuesta (en recepcion aun no hay respuesta) */}
                { solicitud.resultado==0? <> </>:
                    <ResultadoSolicitud solicitud={solicitud}/>
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