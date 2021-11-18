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
import CursoService from '../../../services/cursoService';
import PersonaService from '../../../services/personaService';

const fillDocentes = async() => {
  //Llamado del axios para llenar a los docentes - personas con id_rol = 1
  let docentes = [];

  const dataDoc = await PersonaService.getPersonasxTipo(1); //1 - docente
  
  if(!dataDoc) {  //No estima que no haya docentes ingresados - no deberia ser problema igual
    console.error("No se pudo regresar la data del backend para Docentes");
    return [];
  }
  for(let doc of dataDoc){
    if(doc.tipo_docente)
      docentes.push( doc ); //Se esquiva al docente - no se enlista porque no está asignado como tal.
  }
  
  console.log(docentes);
  return docentes
}

export default function ModalDocenteClases({docentesAsig, horario, tipo, actHorario, setActHorario}){
    const [recordsBusq, setRecordsBusq] = useState([])
    const [recordsAsig, setRecordsAsig] = useState(docentesAsig)
    //console.log("Lista de asignación: ", recordsAsig);
    React.useEffect(() => {
      fillDocentes()
        .then(docentes => {
          setRecordsBusq(docentes);        
        });  
    }, [])


    const handleSubmit = async e => {
      /* e is a "default parameter" */
      e.preventDefault()
      // if (validate())

      //console.log(recordsAsig);
      //console.log(horario);

      //Recorremos toda la persona para realizar la sesion_docente
      const sesion_docente = [];
      for(let ses_doc of recordsAsig){
        sesion_docente.push({
          "docente": {
            "id": ses_doc.docente.id,
            "cargaDocente": ses_doc.docente.cargaHoraria,
            "deuda_docente": ses_doc.docente.deudaHoraria,
          },
          "horas_dictado_docente_sesion": ses_doc.horas_dictado_docente_sesion,
        })
      }

      let sesionesActual;
      console.log(horario);
      //Ingresamos las sesiones - dependiendo del tiipo de secuencia
      if(tipo){ //Es 1 - laboratorio
        sesionesActual = [{
            "id": horario.sesiones[0].id,
            "horas": horario.sesiones[0].horas,
            "secuencia": horario.sesiones[0].secuencia,
            "sesion_docentes": horario.sesiones[0].sesion_docentes,
          }, {
          "id": horario.sesiones[1].id,
          "horas": horario.sesiones[1].horas,
          "secuencia": horario.sesiones[1].secuencia,
          "sesion_docentes": sesion_docente,
        }]
      }
      else{ //Es 0 - clase
        if(horario.sesiones[1]){
          sesionesActual = [{
            "id": horario.sesiones[0].id,
            "horas": horario.sesiones[0].horas,
            "secuencia": horario.sesiones[0].secuencia,
            "sesion_docentes": sesion_docente,
          }, 
          {
            "id": horario.sesiones[1].id,
            "horas": horario.sesiones[1].horas,
            "secuencia": horario.sesiones[1].secuencia,
            "sesion_docentes": horario.sesiones[1].sesion_docentes,
          }]
        }
        else{
          sesionesActual = [{
            "id": horario.sesiones[0].id,
            "horas": horario.sesiones[0].horas,
            "secuencia": horario.sesiones[0].secuencia,
            "sesion_docentes":sesion_docente,
          }]
        }
      }

      //const ciclo = await CursoService.getCursoCicloxCicloxCodigoNombre
      const horUpdate ={
        "id": horario.id,
        "codigo": horario.codigo,
        "curso_ciclo": {
          "id": horario.curso_ciclo,
        },
        "sesiones": sesionesActual
      }

      console.log(horUpdate);

      const dataHor = await HorarioService.updateHorario(horUpdate);
      // const selec = records.map(profesor =>
      //   seleccionados[records.indexOf(profesor)] ? profesor : null
      // )
      // getListDocentes(selec)
      setActHorario(dataHor);
      //window.location.reload();
    }


    return(
        
        <Form onSubmit={handleSubmit}>
            <Paper> 
                <ModalDocenteClasesAsignados records = {recordsAsig} setRecords = {setRecordsAsig} recordsBusq = {recordsBusq} setRecordsBusq = {setRecordsBusq}/>
                <Grid cointainer align="right" mt={2.5} />   
                <hr color = "#636e9a"/> 
                <Grid cointainer align="right" mt={2.5} />
                <ModalDocenteClasesBusqueda records = {recordsBusq} setRecords = {setRecordsBusq} recordsAsig = {recordsAsig} setRecordsAsig = {setRecordsAsig}/>
            </Paper>
            <Grid cointainer align="right" mt={5}>
                <div>
                    <Controls.Button
                        // variant="contained"
                        // color="primary"
                        // size="large"
                        text="Guardar"
                        type="submit"
                    >
                    </Controls.Button>
                </div>
            </Grid>
        </Form>
    )
}