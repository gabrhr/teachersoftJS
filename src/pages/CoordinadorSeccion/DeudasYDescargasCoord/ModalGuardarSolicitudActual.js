import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import { useHistory } from 'react-router-dom'

export default function ModalGuardarHorarioCurso({guardarSolicitudActual, setOpenGuardarPopup}){
    const history = useHistory()

    return(
        <>
            < Typography variant="h4" mb={2} >
                ¿Está seguro de guardar la solicitud? <br/>
                Esta acción es irreversible
            </Typography>
            <Grid cointainer align="right" mt={3}>
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
            </Grid>
        </>
    )
} 