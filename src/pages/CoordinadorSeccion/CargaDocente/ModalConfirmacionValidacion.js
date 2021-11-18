import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import Popup from '../../../components/util/Popup';
import ModalValidarYEnviarSolicitud from './ModalValidarYEnviarSolicitud'

export default function ModalConfirmacionValidacion({ asunto, setAsunto, cuerpo, setCuerpo, setOpenValYEnvSolPopup,
                                                    setOpenConfVal, openValYEnvSolPopup}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de validar y enviar la solicitud de registro de carga docente a la facultad?
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={() => {setOpenConfVal(false)}}
            />
            <Controls.Button
                text="No"
                onClick={()=>{
                    setOpenValYEnvSolPopup(true)
                    setOpenConfVal(false)
                }}
            />
            <Popup
                openPopup={openValYEnvSolPopup}
                setOpenPopup={setOpenValYEnvSolPopup}
                title="Validar y enviar solicitud a la facultad"
            >
               <ModalValidarYEnviarSolicitud /*solicitud = {solicitud}*/asunto={asunto} cuerpo={cuerpo} setAsunto={setAsunto}
                                            setCuerpo={setCuerpo} setOpenValYEnvSolPopup = {setOpenValYEnvSolPopup}/>
            </Popup>
        </>
    )
}