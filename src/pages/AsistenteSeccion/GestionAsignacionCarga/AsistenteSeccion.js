import React, {useState} from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Grid, Typography, Paper} from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import HorarioCursos from './HorarioCursos'
import Popup from '../../../components/util/Popup'
import ModalAsignacionCarga from './ModalAsignacionCarga';

function createData(id, claveCurso, nombreCurso, cargaHoraria,
    horario, tipoSesion, horaSesion) {
   return {
       id, claveCurso, nombreCurso, cargaHoraria,
    horario, tipoSesion, horaSesion
   }
 }
 
const usuarios2 = [
   createData('10', 'INF231','Curso A',  '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
   createData('11', 'INF111', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
   createData('12', 'INF341', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
]


export default function AsistenteSeccion() {
    const [openPopup, setOpenPopup] = useState(false)
    const [records, setRecords] = useState(usuarios2)
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}
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
            <Paper variant="outlined" sx={PaperStyle}>
                <HorarioCursos records={records} setRecords={setRecords}/>
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Carga Masiva de Cursos y Horarios"
            >
               < ModalAsignacionCarga setOpenPopup={setOpenPopup} records={records} setRecords={setRecords}/>
            </Popup>  
        </>
    )
}
