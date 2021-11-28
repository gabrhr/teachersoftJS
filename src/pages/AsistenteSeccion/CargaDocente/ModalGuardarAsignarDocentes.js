import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function ModalGuardarAsignarDocentes({guardarAsignacion, setOpenGuardarPopup}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de guardar la asignación de los docentes?
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={(e)=>{
                    guardarAsignacion(e)
                    setOpenGuardarPopup(false)
                }}
            />
            <Controls.Button
                text="No"
                onClick={()=>{setOpenGuardarPopup(false)}}
            />
        </>
    )
} 