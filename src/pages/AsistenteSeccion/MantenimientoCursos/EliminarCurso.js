import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function EliminarCurso({setOpenOnePopup, eliminarCurso}){
    return(
        <>
        < Typography variant="h4" mb={2} >
            ¿Está seguro de eliminar el curso?
            <div/>
            <address>Recuerde que se eliminará todo el Curso y, por lo tanto, los horarios</address> 
        </Typography>
        <Controls.Button
            text="Sí"
            onClick={eliminarCurso}
        />
        <Controls.Button
            text="No"
            onClick={()=>setOpenOnePopup(false)}
        />
    </>
    )
} 