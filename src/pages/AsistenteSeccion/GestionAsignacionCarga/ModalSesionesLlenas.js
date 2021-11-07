import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function ModalGuardarHorarioCurso({setOpenSesionesFullPopup}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                No se pueden agregar más de dos sesiones
            </Typography>
            <Controls.Button
                text="OK"
                onClick={()=>{setOpenSesionesFullPopup(false)}}
            />
        </>
    )
} 