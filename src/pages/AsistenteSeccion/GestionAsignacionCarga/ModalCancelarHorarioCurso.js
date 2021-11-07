import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function ModalCancelarHorarioCurso({cancelar, setOpenCancelarPopup}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de cancelar la configuración del horario para el curso??
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={cancelar}
            />
            <Controls.Button
                text="No"
                onClick={()=>{setOpenCancelarPopup(false)}}
            />
        </>
    )
} 