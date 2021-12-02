/* Author: Gabs
 */
import React from 'react'
import { Paper} from '@mui/material'
import Header1 from '../../constants/Header1'
import RegistroForm from './RegistroForm'
import HeadNotificationMisSolicitudes from './HeadNotificationMisSolicitudes'
import { useHistory } from 'react-router';
import { UserContext } from '../../constants/UserContext'
import Notification from '../../components/util/Notification'

/* SERVICES */
import personaService from '../../services/personaService'
import * as MesaPartesService from '../../services/mesaPartesService'
import HeaderSimple from '../../constants/HeaderSimple'


function f2bNuevoUsuarioExterno(values, user) {
    /* update local storage user */
    
    user.persona.nombre= values.nombres
    user.persona.apellidos=  values.primer_apellido + ' ' + values.segundo_apellido
    user.persona.tipo_persona= 7
    
    let persona = {
        ...user.persona,        // recover id to update in DB
        tipo_persona: 7,        // 8 (Nuevo Usuario) -> 7 (Usuario Externo)

        nombres: values.nombres,
        apellidos: values.primer_apellido + ' ' + values.segundo_apellido,
        fechaNac: values.fecha_nacimiento,
        sexo: values.sexo,
        tipo_documento: 0,      // DNI?
        numero_documento: values.dni,
        telefono: values.telefono,

        /* relations */
        departamento: null,
        seccion: null
    }
    return persona
}

export default function Registro() {
    const history = useHistory()
    const [notify, setNotify] = React.useState({
        isOpen: false, 
        message: '', 
        type: ''
    })
    const {setUser, setRol } = React.useContext(UserContext)

    
    /* Con valores de registro */
    function submitValues(values, user) {
        // console.log("insert", f2bNuevoUsuarioExterno(values, user))
        personaService.updatePersona2(f2bNuevoUsuarioExterno(values, user))
        .then(res => {
            /* success */
            setNotify({
                isOpen: true,
                message: 'Registro de Nuevo Usuario Externo externo',
                type: 'success'
            })
            /* update localstorage and UserContext */
            setUser({...user})
            setRol(user.persona.tipo_persona)
            /* redirect to next page */
            history.push("/invitado")
        })
        .catch(res => {
            setNotify({
                isOpen: true,
                message: 'Estamos teniendo problemas de conexión.  Consulte con un administrador por favor.',
                type: 'error'
            })
            console.log("Registro", f2bNuevoUsuarioExterno(values, user))
        })
    }

    return (
        <>
            <Header1/>
            <HeaderSimple/>
            <Paper sx={{m: 22, p: 5}}>
                <HeadNotificationMisSolicitudes
                    title="Nuevo Usuario Externo"
                    body="Completa tus datos para terminar con el registro"
                />
                <RegistroForm submitValues={submitValues}/>
            </Paper>
            {/* "modals" */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

