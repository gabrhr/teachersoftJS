import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';

export default function ModalRegistroExitoso({setOpenRegistroExitoso}){
    return(
        <>
            < Typography variant="h4" mb={2} >
                Registro exitoso
            </Typography>
            <Controls.Button
                text="OK"
                onClick={()=>{setOpenRegistroExitoso(false)}}
            />
        </>
    )
} 