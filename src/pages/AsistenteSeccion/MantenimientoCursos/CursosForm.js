import React, {useState, useEffect} from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Grid, Typography, Paper} from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import ListaCursos from './ListaCursos'
import Popup from '../../../components/util/Popup'
import ModalCursos from './ModalCursos';
import ModalAsignarCursosCiclo from './ModalAsignarCursosCiclo';
import { ExportCSV } from '../../../components/PageComponents/ExportCSV';
import { getHorarios, registerHorario, updateHorario, deleteHorario } from '../../../services/horarioService';
import { formatHorario, formatHorarioCursos } from '../../../components/auxFunctions';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Link } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LinearProgress from '@mui/material/LinearProgress';
import Fab from '@mui/material/Fab';


function createData(id, claveCurso, nombreCurso, cargaHoraria,
    horario, tipoSesion, horaSesion) {
   return {
       id, claveCurso, nombreCurso, cargaHoraria,
    horario, tipoSesion, horaSesion
   }
 }

export default function CursosForm() {
  
  /*  const [newFile, setNewFile] = useState(0); //0: No new file
    const [count, setCount] = useState(0);
*/
    const [openPopup, setOpenPopup] = useState(false)
    const [openAsignarPopup, setOpenAsignarPopup] = useState(false)

    /*Bota tu ga nomás*/
    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'Carga_Horaria': ws }, SheetNames: ['Carga_Horaria'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }

    const vacio = [{
        "Clave": " ",
        "Nombre": " ",
        "Unidad": " ",
        "Creditos": " ",
        "Carga_Horaria": " ",
        "Horario": " ",
        "Tipo": " ",
        "Horas": " "
    }];

    //let listHorario = getHorario(-1);
      //LO DE GABRIELA
    const [records, setRecords] = useState([])
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}
    const [cargaH, setCargaH] = useState([])

    return (
        <>
            <ContentHeader 
                text="Administración de Cursos"
                cbo= {false}
            />
            <Grid container spacing={0} maxWidth={1}>
                <Grid item xs>
                    <Typography variant="body1"> Puedes&nbsp;
                        <Link style={{ fontSize: '15px', color:"#41B9E4"}} 
                        href="#" 
                        underline = "hover" 
                        variant="button" 
                        onClick = {() => window.open("https://docs.google.com/spreadsheets/d/1Yk3DVw5xUSW9mIRX9HHjNOu1IJ3y-jqQ/edit?usp=sharing&ouid=111673383186909937899&rtpof=true&sd=true")}>
                        descargar la plantilla en Excel
                        </Link>
                        &nbsp;para subir los cursos.
                    </Typography>
                </Grid>
                <Grid item xs={2} align="right" m={1}>
                    <Controls.Button
                        text="Importar"
                        size="large"
                        endIcon={<CloudUploadOutlinedIcon/>}
                        onClick = {() => setOpenPopup(true)}
                    />

                    {/* <Controls.Button
                        text="Exportar"
                        size="large"
                        endIcon={<CloudDownloadOutlinedIcon/>}
                    /> */}
                    
                </Grid>
            </Grid>
            {/*LO DE GABRIELA*/}
            <Paper variant="outlined" sx={PaperStyle}>
                <ListaCursos records={records} setRecords={setRecords} setCargaH = {setCargaH} 
                cargaH = {cargaH}/>
            </Paper>
              <Fab color="primary" aria-label="add" variant = "extended" 
                    sx={{position:'fixed',
                    height:'40px',
                    bottom:'20px',
                    right:'40px',
                    textAlign: 'center'}} onClick = {()=>{setOpenAsignarPopup(true)}}>
                Asignar
                <CompareArrowsIcon />
              </Fab>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Carga Masiva de Cursos"
            >
               {/*<ModalAsignacionCarga horario = {listHorario} getHorario = {getHorario}>

               </ModalAsignacionCarga>*/}
              
               < ModalCursos setOpenPopup={setOpenPopup} records={records} setRecords={setRecords} setCargaH = {setCargaH} 
                cargaH = {cargaH}/>
            </Popup>  
            <Popup
                openPopup={openAsignarPopup}
                setOpenPopup={setOpenAsignarPopup}
                title="Asignar Cursos al Ciclo"
            >
               < ModalAsignarCursosCiclo setOPP={setOpenAsignarPopup}/>
            </Popup>  
        </>
    )
}
