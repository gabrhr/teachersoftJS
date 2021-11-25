import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { Link } from "react-router-dom";

export default function ModalCancelarAsignarDocentes({setOpenCancelarPopup, curso}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de regresar a la pantalla de Registro de carga docente?
                El progreso no guardado se perderá.
            </Typography>
            
            <Link to ={{
                        pathname:`/as/asignacionCarga/registroCarga/horarios`,
                        state:{
                            curso: curso
                        }
                    }}  style={{ textDecoration: 'none' }}>
                <Controls.Button
                text="Sí"
                onClick={()=>{}}
            />
            </Link>
            <Controls.Button
                text="No"
                onClick={()=>{setOpenCancelarPopup(false)}}
            />
        </>
    )
} 