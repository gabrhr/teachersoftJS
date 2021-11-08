import { Form } from "../../../components/useForm"
import { Input, Grid, Stack, Paper, TableBody, TableCell, TableRow, InputAdornment } from '@mui/material';
import { Typography } from '@mui/material'
import { Controls } from '../../../components/controls/Controls'
import { StyledTableRow, StyledTableCell } from '../../../components/controls/StyledTable';
import useTable from "../../../components/useTable"
import React, {useState} from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ModalDocenteClasesAsignados from "./ModalDocenteClasesAsignados";
import ModalDocenteClasesBusqueda from "./ModalDocenteClasesBusqueda"
import HorarioService from '../../../services/horarioService';
import PersonaService from '../../../services/personaService';

const handleSubmit = e => {
    /* e is a "default parameter" */
    e.preventDefault()
    // if (validate())

    // const selec = records.map(profesor =>
    //   seleccionados[records.indexOf(profesor)] ? profesor : null
    // )
    // getListDocentes(selec)
    // props.setOpenPopup(false)
}


const fillDocentes = async() => {
  //Llamado del axios para llenar a los docentes - personas con id_rol = 1
  const docentes = [];

  const dataDoc = await PersonaService.getPersonasxTipo(1); //1 - docente
  
  if(!dataDoc) {  //No estima que no haya docentes ingresados - no deberia ser problema igual
    console.error("No se pudo regresar la data del backend para Docentes");
    return [];
  }
  dataDoc.map(doc => {
    const nombreFormat = `${doc.nombres} ${doc.apellidos[0]}.`;
    docentes.push({
      "id": doc.id,
      "nombre": nombreFormat,
      "tipo": doc.tipo_persona, //Esto debe de cambiar a tipo de profesor.
      "codigo": doc.codigo_pucp,
      "cargaHoraria": doc.cargaDocente,
      "deudaHoraria": doc.deuda_docente,
    })
  });
  console.log(docentes);
  return docentes
}

export default function ModalDocenteClases({docentesAsig}){
    const [recordsBusq, setRecordsBusq] = useState([])
    const [recordsAsig, setRecordsAsig] = useState(docentesAsig)

    React.useEffect(() => {
      fillDocentes()
        .then(docentes => {
          setRecordsBusq(docentes);        
        });  
    }, [])

    return(
        
        <Form onSubmit={handleSubmit}>
            <Paper>
                <ModalDocenteClasesAsignados records = {recordsAsig} setRecords = {setRecordsAsig}/>
                <ModalDocenteClasesBusqueda records = {recordsBusq} setRecords = {setRecordsBusq} recordsAsig = {setRecordsAsig} setRecordsAsig = {setRecordsAsig}/>
            </Paper>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Seleccionar"
                        type="submit"
                    >
                    </Controls.Button>
                </div>
            </Grid>
        </Form>
    )
}