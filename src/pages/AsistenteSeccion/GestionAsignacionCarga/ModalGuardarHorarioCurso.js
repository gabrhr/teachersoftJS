import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function ModalGuardarHorarioCurso({guardarHorario, setOpenGuardarPopup}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de guardar el horario para el curso?
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={guardarHorario}
            />
            <Controls.Button
                text="No"
                onClick={()=>{setOpenGuardarPopup(false)}}
            />
        </>
    )
} 