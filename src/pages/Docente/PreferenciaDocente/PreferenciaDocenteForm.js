import React, {useState, useEffect} from 'react'
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Grid, Typography, Paper} from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import Popup from '../../../components/util/Popup'
import ListaPreferenciaDocente from './ListaPreferenciaDocente'

export default function PreferenciaDocenteForm() {

    
    const [horario, setHorario] = useState([]);
  
  /*  const [newFile, setNewFile] = useState(0); //0: No new file
    const [count, setCount] = useState(0);
*/
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        //Obtenemos las secciones
        
        //getHorario();
  
      }, [horario])

    //let listHorario = getHorario(-1);

    const [records, setRecords] = useState([])
    const PaperStyle={ borderRadius: '20px', pb:4,pt:2, px:2, 
    color:"primary.light", elevatio:0}
    const [cargaH, setCargaH] = useState([])

    return (
        <>
            <ContentHeader 
                text="PREFERENCIA DOCENTE"
                cbo= {false}
            />

            <Paper variant="outlined" sx={PaperStyle}>
                <ListaPreferenciaDocente openPopup = {openPopup} records={records} setRecords={setRecords} setCargaH = {setCargaH} 
                cargaH = {cargaH}/>
            </Paper>

        </>
    )
}
