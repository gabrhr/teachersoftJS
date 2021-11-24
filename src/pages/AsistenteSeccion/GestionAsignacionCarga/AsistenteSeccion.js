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
import { ExportCSV } from '../../../components/PageComponents/ExportCSV';
import { getHorarios, registerHorario, updateHorario, deleteHorario } from '../../../services/horarioService';
import { formatHorario, formatHorarioCursos } from '../../../components/auxFunctions';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Link } from '@mui/material';

function createData(id, claveCurso, nombreCurso, cargaHoraria,
    horario, tipoSesion, horaSesion) {
   return {
       id, claveCurso, nombreCurso, cargaHoraria,
    horario, tipoSesion, horaSesion
   }
 }

export default function AsistenteSeccion() {

    const [ciclo, setCiclo] = useState ();
    const [horario, setHorario] = useState([]);
  
  /*  const [newFile, setNewFile] = useState(0); //0: No new file
    const [count, setCount] = useState(0);
*/
    const [openPopup, setOpenPopup] = useState(false)

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
                text="Gestión de la carga de horarios"
                cbo= {true}
                records = {ciclo}
                setRecords = {setCiclo}
            />
            <Grid container spacing={2} maxWidth={1}>
                <Grid item xs>
                    <Typography variant="body1"> Puedes&nbsp;
                        <Link style={{ fontSize: '15px', color:"#41B9E4"}} href="#" underline = "hover" variant="button" onClick = {() => exportToCSV(vacio, 'plantilla')}>
                        descargar la plantilla en Excel
                        </Link>
                        &nbsp;para subir la carga de horario de un determinado curso.
                    </Typography>
                </Grid>
                <Grid item xs={3} align="right" m={1}>
                    <Controls.Button
                        text="Importar"
                        size="large"
                        endIcon={<CloudUploadOutlinedIcon/>}
                        onClick = {() => setOpenPopup(true)}
                    />
                     {/* <ExportCSV csvData={cargaH} fileName={'Carga Horaria'} text="Exportar" size="large"
                        endIcon={<CloudDownloadOutlinedIcon/>}/> */}
                </Grid>
            </Grid>
            {/*LO DE GABRIELA*/}
            <Paper variant="outlined" sx={PaperStyle}>
                <HorarioCursos records={records} setRecords={setRecords} setCargaH = {setCargaH} 
                        cargaH = {cargaH} ciclo = {ciclo} setCiclo = {setCiclo}/>
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Carga Masiva de Cursos y Horarios"
            >
               {/*<ModalAsignacionCarga horario = {listHorario} getHorario = {getHorario}>

               </ModalAsignacionCarga>*/}
              
               < ModalAsignacionCarga setOpenPopup={setOpenPopup} records={records} setRecords={setRecords} setCargaH = {setCargaH} 
                cargaH = {cargaH}/>
            </Popup>  
        </>
    )
}
