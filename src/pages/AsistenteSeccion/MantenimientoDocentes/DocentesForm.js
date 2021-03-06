import React, {useState, useEffect} from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Grid, Typography, Paper} from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { DT } from '../../../components/DreamTeam/DT'
import { Controls } from '../../../components/controls/Controls'
import ListaDocentes from './ListaDocentes'
import CargaMasivaDocente from './CargaMasivaDocente'
import Popup from '../../../components/util/Popup'
//import ModalCursos from './ModalCursos';
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
 
const usuarios2 = [
   createData('10', 'INF231','Curso A',  '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
   createData('11', 'INF111', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
   createData('12', 'INF341', 'Curso A', '3 horas', '801', 'Clase', 'Vie 18:00 - 21:00'),
]


export default function DocentesForm() {

    
    const [horario, setHorario] = useState([]);
  
  /*  const [newFile, setNewFile] = useState(0); //0: No new file
    const [count, setCount] = useState(0);
*/
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        //Obtenemos las secciones
        
        //getHorario();
  
      }, [horario])
    
    /*Bota tu ga nomás*/
    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'Docente': ws }, SheetNames: ['Docente'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }

    const vacio = [{
            "nombres": "",
            "apellidos": "",
            "seccion_nombre": "",
            "correo_pucp": "",
            "telefono": "",
            "codigo_pucp": "",
            "numero_documento": "",
            "tipo_docente": "",
            "foto_URL": "",
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
                text="Listado de docentes"
                cbo= {false}
            />
            <Grid container spacing={2} maxWidth={1}>
                <Grid item xs>
                    <Typography variant="body1"> Puedes&nbsp;
                        <Link style={{ fontSize: '15px', color:"#41B9E4"}} 
                        href="#" 
                        underline = "hover"
                        variant="button"
                        onClick = {() => window.open("https://docs.google.com/spreadsheets/d/1R1m-8gSLN6kdXdpvgTYpsYIhKyS3bqtN/edit?usp=sharing&ouid=111673383186909937899&rtpof=true&sd=true")}>
                        descargar la plantilla en Excel
                        </Link>
                        &nbsp;para subir los datos de los docentes.
                    </Typography>
                </Grid>
                <Grid item xs={3} align="right" m={1}>
                    <Controls.Button
                        text="Importar"
                        size="large"
                        endIcon={<CloudUploadOutlinedIcon/>}
                        onClick = {() => setOpenPopup(true)}
                    />
                     {/*<Controls.Button
                        text="Exportar"
                        size="large"
                        endIcon={<CloudDownloadOutlinedIcon/>}
                     />*/}
                    
                </Grid>
            </Grid>
            {/*LO DE GABRIELA*/}
            <Paper variant="outlined" sx={PaperStyle}>
                <ListaDocentes openPopup = {openPopup} records={records} setRecords={setRecords} setCargaH = {setCargaH} 
                cargaH = {cargaH}/>
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Carga Masiva de Docentes"
            >
               <CargaMasivaDocente setOpenPopUp = {setOpenPopup} records={records} setRecords={setRecords} setCargaH = {setCargaH} 
                cargaH = {cargaH}/>

              
               {/*< ModalCursos setOpenPopup={setOpenPopup} records={records} setRecords={setRecords} setCargaH = {setCargaH}
                cargaH = {cargaH}/>*/}
            </Popup>  
        </>
    )
}
