import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function ModalFaltaSesion({setOpenFaltaClasePopup, sesionFaltante}){
    let texto = (sesionFaltante === "Laboratorio") ? "Clase" : "Laboratorio";
    return(
        <>
            < Typography variant="h4" mb={2} >
                Falta agregar una sesión de {texto}
            </Typography>
            <Controls.Button
                text="OK"
                onClick={()=>{setOpenFaltaClasePopup(false)}}
            />
        </>
    )
} 