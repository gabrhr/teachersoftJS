import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { useHistory } from 'react-router-dom'

export default function ModalGuardarHorarioCurso({guardarSolicitudActual, setOpenGuardarPopup}){
    const history = useHistory()

    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de guardar la solicitud?
            </Typography>
            <Controls.Button
                text="Sí"
                onClick={(e)=>{
                    guardarSolicitudActual()
                    setOpenGuardarPopup(false)
                    history.push("/cord/asignacionCarga/deudaYDescarga");
                }}
            />
            <Controls.Button
                text="No"
                onClick={()=>{setOpenGuardarPopup(false)}}
            />
        </>
    )
} 