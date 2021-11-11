import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function EliminarTodosLosDocentes({setDelAllPopup, eliminarDocentes}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de eliminar todos los docentes?
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={eliminarDocentes}
            />
            <Controls.Button
                text="No"
                onClick={()=>{setDelAllPopup(false)}}
            />
        </>
    )
} 