/* Author: Manuel (orig), Gabs (UI/UX), Mitsuo (email)
 *
 * Detalle de una solicitud.
 * URL: localhost:3000/doc/solicitudDetalle
 * P: DetalleSoliOrganism.js   (en realidad no es su padre pero el lo
 *    redirecciona)
 */
import { Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react'
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
import * as DTLocalServices from '../../services/DTLocalServices'
import * as EmailService from '../../services/emailService'
import personaService from '../../services/personaService';
import userService from '../../services/userService'

function accionesSegunResultado (s, atender, setAtender,
        submitAtencion, setOpenPopup
    ){
    if(s.resultado != 0){
        return <ResultadoSolicitud solicitud={s} />
    }

    if(s.estado==0 || s.estado==1){
        return(
            atender ?
            <AtenderSolicitudForm
                setAtender={setAtender}
                solicitud={s}
                submitAtencion={submitAtencion}
            /> :
            /* ACCIONES */
            <Box mr={"210px"} sx={{ display: "flex", justifyContent: 'flex-end' }}>
                <Stack mt={2} mb={2}>
                    <Controls.Button
                        text="Atender"
                        type="submit"   // html property (not component)
                        onClick={() => { setAtender(true) }}
                    />
                    <Typography variant="body1" textAlign="center">
                        o
                    </Typography>
                    <Controls.Button
                        text="Delegar"
                        type="submit"   // html property (not component)
                        onClick={() => { setOpenPopup(true) }}
                    />
                </Stack>
            </Box>
        )
    }

    return (<></>)

}

export default function RecepcionDetalleSolicitudFuncion() {
    const location = useLocation()
    const { solicitudinit } = location.state
    const [solicitud, setSolicitud] = React.useState(solicitudinit) // <---- NO SIRVE
    const { user, rol } = useContext(UserContext);
    const [atender, setAtender] = React.useState(false)
    const [openPopup, setOpenPopup] = React.useState(false)

    const [notify, setNotify] = React.useState({
        isOpen: false, message: '', type: ''
    })

    const PaperStyle = {
        borderRadius: '20px',
        pb: 4, pt: 2, px: 2,
        color: "primary.light",
        elevatio: 0
    }

    function retornar() {
        /* "solo gozalo" --gabs */
        window.history.back();
    }

    React.useEffect(() => {
        // console.log("actualizada: ", solicitud)
        if (solicitud.estado === '1' && solicitud.cambioEstado) {
            /* secretario entra a la solicitud detalle (cabios listos) 
             * estado: Enviado -> En Revision */
            MesaPartesService.updateSolicitud(solicitud)
                .then(() => {
                    setNotify({
                        isOpen: true,
                        message: 'El estado de la solicitud cambió a "En Revision"',
                        type: 'success'
                    })
                })
                /* FIXME: make handleSecretariaError (repeated code) */
                .catch(err => { console.error(err) })
        } else if (solicitud.estado === '3' && solicitud.cambioEstado) {
            /* secretario responde en lugar del delegado */
            MesaPartesService.updateSolicitud(solicitud)
                .then(id => {
                    setNotify({
                        isOpen: true,
                        message: 'La solicitud fue atendida',
                        type: 'success'
                    })
                    setAtender(false)
                    /* Send notification to solicitador */
                    // sendEmailNotification(solicitud, 'atendidoMP')
                    EmailService.sendemailMP(solicitud, 'MP,atiende')
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
        } else if (solicitud.estado === '2' && solicitud.cambioEstado) {
            /* secretario delega solicitud */
            MesaPartesService.updateSolicitud(solicitud)
                .then(id => {
                    setNotify({
                        isOpen: true,
                        message: 'La solicitud fue delegada',
                        type: 'success'
                    })
                    setAtender(false)
                    /* Send notification to solicitador */
                    // sendEmailNotification(solicitud, 'delegado')
                    EmailService.sendemailMP(solicitud, 'MP,delega')
                    setOpenPopup(false)
                })
                .catch(err => {
                    /* error :( */
                    console.error(err)
                    console.log("Error: submitDelegar:",
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
                },

                /* only for FrontEnd */
                cambioEstado: true
            }))
            // sendEmailNotification(solicitud, 'revisado')
            EmailService.sendemailMP(solicitud, 'MP,revisa')
            console.log("soliiiiii: ", solicitud)
        }
        // console.log('hola', solicitud)
    }, [])

    /* secreatrio responde en lugar del delegado */
    function submitAtencion(atencion) {
        setSolicitud(solicitud => ({
            ...solicitud,
            /* data faltante de la respuesta de soli por Secretario Dpto. */
            delegadoID: user.persona.id,
            delegado: {
                fullName: user.persona.nombres + " " + user.persona.apellidos,
                foto_URL: user.persona.foto_URL,
                rolName: DTLocalServices.getRolName(rol)
            },
            estado: '3',    // atendida
            tracking: {
                ...solicitud.tracking,
                fecha_atendido: new Date().toJSON()
            },
            observacion: atencion.observacion,
            resultado: atencion.resultadoID,

            /* only for FrontEnd */
            cambioEstado: true
        }))
    }

    /* delegado (persona) */
    function submitDelegar(delegado) {
        let s = MesaPartesService._(`${solicitud.id}&${delegado.correo}`)
        setSolicitud(solicitud => ({
            ...solicitud,
            /* data que viene de DelegarForm */
            delegadoID: delegado.id,
            delegado: {
                fullName: delegado.fullName,
                foto_URL: delegado.foto_URL,
                rolName: delegado.rolName,
                correo: delegado.correo
            },
            estado: '2',        // delegada
            tracking: {
                ...solicitud.tracking,
                fecha_delegado: new Date().toJSON()
            },

            /* only for FrontEnd */
            cambioEstado: true,
            // email url 
            url: delegado.options === 'delegadoExterno'
                ? `http://front.teachersoft.solutions/invitado/atenderxemail/` + s
                : null
        }))
    }

    /* delegado Externo (crear nuevo solo si ya existe, postlogin se encarga) */
    function submitDelegarExterno(delegadofake) {
        let datausuario = {
            // id: null,
            usuario: delegadofake.correo,       // Back lo lee?  creo que no
            password: null,                     // Back lo lee?  ni se usa
            persona: {
                // id: null,
                tipo_persona: 7,    // Usuario Externo
                codigo_pucp: null,
                correo_pucp: delegadofake.correo,
                foto_URL: 'static/images/avatar/1.jpg',
                nombres: delegadofake.nombre,
                apellidos: '',
                // fechaNac: new Date(),
                // sexo: 0,
                // tipo_documento: 0,
                // numero_documento: "12345678",
                // telefono: "123456789",
                // seccion: {id: 3},
                // departamento: {id: 3},      // (redundante en este caso)
            }
        }
        MesaPartesService.lue(delegadofake)
            .then(data => {
                console.log("lue", data)
                /* FrontEnd fmt (sorry for verbosity) */
                let nuevaPersona = data.user.persona
                nuevaPersona.fullName = delegadofake.nombre
                nuevaPersona.rolName = "Usuario Externo"
                nuevaPersona.correo = delegadofake.correo
                nuevaPersona.options = 'delegadoExterno'
                submitDelegar(nuevaPersona)
            }) 
            .catch(err => console.error(err));
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
                <DetalleSoliOrganism solicitud={solicitud} />
                {/* Posibilidades de Atención
                    - Secretaria de Sección(rol=6) -> Boton Atender y Delegar
                    - Usuarios Delegado (rol!=6) -> Boton Atender
                */}

                {/* Respuesta (en recepcion aun no hay respuesta) */}
                { accionesSegunResultado(solicitud, atender, setAtender,
                    submitAtencion, setOpenPopup)}
            </Paper>
            {/* MODALS */}
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title={"Delegar a:"}

            >
                <DelegarForm
                    solicitud={solicitud}
                    submitDelegar={submitDelegar}
                    submitDelegarExterno={submitDelegarExterno}
                />
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    )
}