/* Author: Mitsuo
 *
 * Registro de Carga Docente (asignar docentes a los horarios)
 * 
 * Componente donde se muestran los horarios de un curso seleccionado.  Cada
 * horario se puede expandir y mostrar la lista de docentes actualmente
 * asignados.
 */
import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccordionDetailsHorarioProfesor from './AccordionDetailsHorarioProfesor'
import HorarioService from '../../../services/horarioService';
import CursoService from '../../../services/cursoService';

import { Controls } from '../../../components/controls/Controls';

const headers = [
    { id: '1', title: 'Horarios' },
    { id: '2', title: 'Detalles' },
    { id: '3', title: 'Estado' },
    { id: '4', title: 'Docentes' },
]

function HeaderBoxs(props) {
    const { headers } = props
    return (
        headers.map(x => (
            <Box
                width="25%"
                fontSize="20px" fontWeight="500"    // table header style
                color="#042354"
            >
                {x.title}
            </Box>
        ))
    )
}

function chompDocentes(sesiones) {
    const clase = sesiones.filter((ses)=>ses.secuencia===0)
    const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)

    return (
        <>
          { clase.length ?
            <>
              <Typography display="inline" whiteSpace="pre">
                  {"Docentes en Clase: "}
              </Typography>
              <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                  {clase[0].sesion_docentes ? clase[0].sesion_docentes.length : 0} {"\n"}
              </Typography>
            </>
            : <></>}
            { laboratorio.length ?
              <>
                <Typography display="inline" whiteSpace="pre">
                    {"Docentes en Lab: "}
                </Typography>
                <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                    {laboratorio[0].sesion_docentes ? laboratorio[0].sesion_docentes.length : 0}
                </Typography>
              </>
            : <></>}
        </>
    )
}

function chompDetalles(sesiones) {

  const horasClase = (clase) => {
    return(
      <>
      <Typography display="inline" whiteSpace="pre">
          {"Horas de Clase: "}
      </Typography>
      <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
        {clase.horas}{"\n"}
      </Typography>
      </>
    )
  }

  const horasLaboratorio = (laboratorio) => {
    return(
      <>
      <Typography display="inline" whiteSpace="pre">
          {"Horas de Laboratorio: "}
      </Typography>
      <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
        {laboratorio.horas} {"\n"}
      </Typography>
      </>
    )
  }

    const clase = sesiones.filter((ses)=>ses.secuencia===0)
    const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)
    //if(!laboratorio) laboratorio = []
    console.log("clase: ", clase, "laboratorio: ", laboratorio);
    return (
        <>
            {clase[0] ? horasClase(clase[0]) : "\n"}
            <></>
            {laboratorio[0] ? horasLaboratorio(laboratorio[0]) : "\n"}
        </>
    )
}

function generateRow(horario) {
    return (
        <>
            <Box width="25%" alignItems="center" display="flex">
                <CalendarTodayIcon />
                <Typography ml={1} display="inline">
                    {horario.codigo}
                </Typography>
            </Box>
            <Box width="25%" >
                {chompDetalles(horario.sesiones)}
            </Box>
            <Box width="25%" alignItems="center" display="flex">
                {
                    horario.estado === "Horas Asignadas"
                        ? <DT.Etiqueta type="success" text="Horas Asignadas"/>
                        : <DT.Etiqueta type="error" text="Faltan Horas" 
                            icon={<CancelOutlinedIcon/>}/>
                }
            </Box>
            <Box width="25%">
                {chompDocentes(horario.sesiones)}
            </Box>
        </>
    )
}

/* Generates a customized row with the data */
function generateRows(records, recordForEdit) {
    return (
        records.map(horario => (
            <Accordion disableGutters>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="secondary" />}
                >
                    {generateRow(horario)}
                </AccordionSummary>
                <AccordionDetails>
                    {/* HERE GOES CLASS & LAB PROF LIST */}
                    {/* <Box bgcolor="darkGrey" width="100%" height="100px" /> */}
                    <AccordionDetailsHorarioProfesor sesiones={horario.sesiones} horario = {horario} curso = {recordForEdit}/>
                </AccordionDetails>
            </Accordion>
        ))
    )
} 

const hallarDetalle = (sesiones) => {
  let hor_clases = 0, hor_labs = 0;
  //Vamos a desintegrar el horario para hallar su detalle
  for (let ses of sesiones) {
    ses.secuencia ? (hor_clases = ses.horas) : (hor_labs = ses.horas);
  }
  const detalle_lab = hor_labs ? `\n Horas de Laboratorio: ${hor_labs}` : ``;
  const detalle = `Horas de Clase: ${hor_clases} ${detalle_lab}`;
  return detalle;
}

const hallarEstado = (sesiones) => {
  let estado;
  //Vamos a desintegrar el horario para hallar su estado
  for (let ses of sesiones) {
    let sumaHorasdoc = 0;
    if(ses.sesion_docentes){
      for (let docente of ses.sesion_docentes){
        sumaHorasdoc += docente.horas_dictado_docente_sesion; 
      }
    }
    //En el caso de que sea mayor o igual - las horas se han cumplido - caso contrario o = 0.
    (sumaHorasdoc >= ses.horas) ? estado = "Horas Asignadas"  : estado = "Faltan Horas"

    if(estado === "Faltan Horas") break;
  }

  return estado;
}

const fillHorarios = async (curso) => {

  const dataHor = await HorarioService.listarPorCursoCiclo(curso.id , window.localStorage.getItem("ciclo"));

  const dataHorarios = [];
  let horMoment = 0, horTotal = 0;
  for(let hor of dataHor){
      //Haremos el detalle
      const detalle = await hallarDetalle(hor.sesiones);
      //Haremos el estado
      const estado = await hallarEstado(hor.sesiones);

      if(estado === "Horas Asignadas"){
        //Sumamos un contador que coincida con la cantidad de horarios
        horMoment++;
      }
      dataHorarios.push({
        "id": hor.id,
        "codigo": hor.codigo,
        "curso_ciclo": hor.curso_ciclo,
        "ciclo": hor.curso_ciclo.ciclo,
        "curso": hor.curso_ciclo.curso,
        "sesiones": hor.sesiones,
        "detalle": detalle,
        "estado": estado,
      })
      horTotal++;
  }

  return dataHorarios;
}


export default function TestPage(recordForEdit, setRecordForEdit, curso) {
    const [records, setRecords] = React.useState([]);  //Lo usaremos para pasar data modificada

    React.useEffect(() => {
      fillHorarios(recordForEdit.recordForEdit)
        .then(horarios => {
          setRecords(horarios);        
        });  
    }, [])

    return (
        <>
            <Accordion disabled>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ visibility: "hidden" }} />}
                >
                    <HeaderBoxs headers={headers} />
                </AccordionSummary>
            </Accordion>
            {generateRows(records, recordForEdit.recordForEdit)}
        </>
    )
}
