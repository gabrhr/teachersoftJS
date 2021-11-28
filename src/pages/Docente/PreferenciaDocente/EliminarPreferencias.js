import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import personaService from '../../../services/personaService';

export default function EliminarPreferencias({setOpenOnePopup, handleDelete}){

    return(
        <>
        < Typography variant="h4" mb={2} >
            ¿Está seguro de eliminar las preferencias seleccionadas?
        </Typography>
        <Controls.Button
            text="Sí"
            onClick={handleDelete}
        />
        <Controls.Button
            text="No"
            onClick={()=>setOpenOnePopup(false)}
        />
    </>
    )
} 