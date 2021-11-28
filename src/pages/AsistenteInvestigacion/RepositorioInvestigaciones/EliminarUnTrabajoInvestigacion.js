import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function EliminarUnTrabajoInvestigacion({setOpenOnePopup, eliminarTrabajoInvestigacion}){
    return(
        <>
        < Typography variant="h4" mb={2} >
            ¿Está seguro de eliminar el trabajo de investigación?
            <div/>
            <address>Recuerde que la opción no se podrá deshacer</address> 
        </Typography>
        <Controls.Button
            text="Sí"
            onClick={eliminarTrabajoInvestigacion}
        />
        <Controls.Button
            text="No"
            onClick={()=>setOpenOnePopup(false)}
        />
    </>
    )
} 