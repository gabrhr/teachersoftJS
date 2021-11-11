import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function EliminarCursos({eliminarCursos, setOpenAllPopup}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de eliminar todos los cursos?
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={eliminarCursos}
            />
            <Controls.Button
                text="No"
                onClick={()=>{setOpenAllPopup(false)}}
            />
        </>
    )
} 