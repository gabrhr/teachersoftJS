import { Grid , Input,Divider, Stack,Typography, Avatar} from '@mui/material';
import { Controls } from '../../../components/controls/Controls';
import personaService from '../../../services/personaService';

export default function EliminarUnDocente({setOpenOnePopup, recordForDel, records, setRecords, editIndex, setEditIndex}){
    
    const eliminarDocente = async () =>{
        const rpta = await personaService.deletePersona(recordForDel.id);
        
        const newRecords = records;
        newRecords.splice(editIndex,1);
        setRecords(newRecords);
        setEditIndex(); 
        setOpenOnePopup(false)

        //setRecords(); 
    }
    
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