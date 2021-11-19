import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function ModalCancelarHorarioCurso({regresar, setOpenCancelarPopup}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de regresar a la pantalla de Gestión de carga de horarios?
                El progreso no guardado se perderá.
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={(event) => regresar(event)}
            />
            <Controls.Button
                text="No"
                onClick={()=>{setOpenCancelarPopup(false)}}
            />
        </>
    )
} 