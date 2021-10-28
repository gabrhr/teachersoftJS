import React, {useState, useEffect} from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Grid, Typography, Paper} from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import HorarioCursos from './HorarioCursos'
import Popup from '../../../components/util/Popup'
import ModalAsignacionCarga from './ModalAsignacionCarga';
import { getHorario, registerHorario, updateHorario, deleteHorario } from '../../../services/seccionService';
import { formatHorario, formatHorarioCursos } from '../../../components/auxFunctions';

export default function AsistenteSeccion() {

    
    const [hor, setHor] = useState([]);
  
  /*  const [newFile, setNewFile] = useState(0); //0: No new file
    const [count, setCount] = useState(0);
*/
    const [openPopup, setOpenPopup] = useState(false)
    useEffect(() => {
        //Obtenemos las secciones
        
        getHorario();
  
      }, [hor])
    /*
    let xlsx = '';

    function getHorario (input){
        setOpenPopup(false)
        xlsx = input
        setValueXlsx(xlsx)
        if (xlsx.length > 1){
            setNewFile(1)
        }
        console.log(valueXlsx)
        window.localStorage.setItem('xlsx', xlsx)
    }*/
    




    function getHorario (input){
        setOpenPopup(false)
        listHorario = input
        setHor(listHorario);
        //setHorario(listHorario)
        //console.log(horario)
        //window.localStorage.setItem('listHorario', listHorario) 
    }
    
    /*FUNCION QUE LLAMA AL BACK (SERVICES)*/ 
    let listHorario = [
        formatHorario('0', 'INF231','Curso A',  '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
        formatHorario('1', 'INF111', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
        formatHorario('2', 'INF341', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
      ];
    
     
    //let listHorario = getHorario(-1);
  

    

    return (
        <>
            <ContentHeader 
                text="Gestión de la carga de cursos"
                cbo= {true}
            />
            <Grid container spacing={2} maxWidth={1}>
                <Grid item xs>
                    <Typography variant="body1">
                        Puedes descargar la plantilla en Excel para subir la carga de horario de un determinado curso.
                    </Typography>
                </Grid>
                <Grid item xs={3} align="right" m={1}>
                    <Controls.Button
                        text="Importar"
                        size="large"
                        endIcon={<CloudUploadOutlinedIcon/>}
                        onClick = {() => setOpenPopup(true)}
                    />
                    <Controls.Button
                        text="Exportar"
                        size="large"
                        endIcon={<CloudDownloadOutlinedIcon/>}
                    />
                </Grid>
            </Grid>
            <DT.BorderBox>
               {/* <HorarioCursos horario = {horario} setHorario = {setHorario} isNewFile = {newFile} /> */}
               <HorarioCursos horario = {listHorario} /> 
            </DT.BorderBox>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Carga Masiva de Cursos y Horarios"
            >
               <ModalAsignacionCarga horario = {listHorario} getHorario = {getHorario}>

               </ModalAsignacionCarga>
              
            </Popup>  
        </>
    )
}
