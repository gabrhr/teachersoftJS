import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function EliminarUnDocente({setOpenOnePopup, eliminarDocente}){
    return(
        <>
        < Typography variant="h4" mb={2} >
            ¿Está seguro de eliminar este docente?
        </Typography>
        <Controls.Button
            text="Sí"
            onClick={eliminarDocente}
        />
        <Controls.Button
            text="No"
            onClick={()=>setOpenOnePopup(false)}
        />
    </>
    )
} 