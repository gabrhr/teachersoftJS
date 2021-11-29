import React, {useState, useEffect} from 'react'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import useTable from "../../../components/useTable"
import ContentHeader from '../../../components/AppMain/ContentHeader';
import { Link, LBox, Grid, Typography, Paper, TableBody, TableRow, TableCell,InputAdornment } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportCSV } from '../../../components/PageComponents/ExportCSV';

import Popup from '../../../components/util/Popup'
import Notification from '../../../components/util/Notification';
import ConfirmDialog from '../../../components/util/ConfirmDialog';
import TrabajosInvestigacion from './TrabajosInvestigacion'
import ModalAsignacionTrabajoInvestigacion from './ModalAsignacionTrabajoInvestigacion';

export default function GestionTrabajosInvestigacion() {
  const [anho, setAnho] = useState();
  // const [anhoInicio, setAnhoInicio] = useState();
  // const [anhoFin, setAnhoFin] = useState();
  const [investigacion, setInvestigacion] = useState([])
  const [openPopup, setOpenPopup] = useState(false);
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'Trabajo_Investigacion': ws }, SheetNames: ['Trabajo_Investigacion'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
  }
  const vacio = [{
      "AHHHH": " ",
      "Nombre": " ",
      "Horario": " ",
      "Tipo": " ",
      "Horas": " "
  }];
  const [records, setRecords] = useState([]);
  const PaperStyle={ borderRadius: '20px', mt: 3,pb:4,pt:2, px:2, color:"primary.light", elevation:0}
  const [investigaciones, setInvestigaciones] = useState([])

  return (
    <>
      <ContentHeader
        text="Gestión del repositorio de investigación"
        cbo={false}
      />
      <Grid container spacing={2} maxWidth={1}>
        <Grid item xs>
          <Typography variant="body1"> Puedes&nbsp;
             <Link style={{ fontSize: '15px', color:"#41B9E4"}} href="#" underline = "hover" variant="button" onClick = {() => exportToCSV(vacio, 'trabajo_investigacion')}>
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
            </Grid>
      </Grid>
      <Paper variant="outlined" sx={PaperStyle}>
        <TrabajosInvestigacion records={records} setRecords={setRecords} setInvestigaciones = {setInvestigaciones} 
          investigaciones = {investigaciones} anho = {anho} setAnho = {setAnho}/>
      </Paper>
      <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title="Carga masiva de trabajos de investigación"
      >
        < ModalAsignacionTrabajoInvestigacion setOpenPopup={setOpenPopup} records={records} setRecords={setRecords} setInvestigaciones = {setInvestigaciones} 
          investigaciones = {investigaciones}/>
      </Popup>
    </>
  );
}