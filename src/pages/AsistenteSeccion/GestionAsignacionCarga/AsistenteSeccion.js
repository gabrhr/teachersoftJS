import React, {useState} from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Grid, Typography } from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import HorarioCursos from './HorarioCursos'
import Popup from '../../../components/util/Popup'
import ModalAsignacionCarga from './ModalAsignacionCarga';

export default function AsistenteSeccion() {
    const [openPopup, setOpenPopup] = useState(false)
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
                <HorarioCursos />
            </DT.BorderBox>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Carga Masiva de Cursos y Horarios"
            >
               < ModalAsignacionCarga/>
            </Popup>  
        </>
    )
}
