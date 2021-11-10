import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../components/DreamTeam/DT'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccordionDetailsCursoHorarioProfesor from './AccordionDetailsCursoHorarioProfesor'
import HorarioService from '../../services/horarioService';

import { Controls } from '../../components/controls/Controls';

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
/*
const fillHorarios = async () => {
  //SI USA GET - SI JALA LA DATA - ESTE SI LO JALA BIEN
  const dataHor = await HorarioService.getHorarios();
  //dataSecc → id, nombre,  fechaFundacion, fechaModificacion,nombreDepartamento
  const horarios = [];
  if(!dataHor)  {
    console.error("No se puede traer la data del servidor de los horarios")
    return [];
  }
  for (let hor of dataHor){
    await horarios.push({
      "id": hor.id,
      "codigo": hor.codigo,
      "tipo": hor.tipo,
      "horas_semanales": hor.horas_semanales,
      ciclo:{
        "id": hor.ciclo.id,
      },
      curso:{
        "id": hor.curso.id,
      },
      docentes:[{
        clase: [
        {
            id: 20201234,
            nombre: 'Freddy Paz',
            seccion: 'Ing. Informatica',
            tipo: 'TC',
            cargaHoraria: 10,
            deudaHoraria: 2
        }
        ],
        lab: [
            {
                id: 20001234,
                nombre: 'Andres',
                seccion: 'Ing. Informatica',
                tipo: 'TPA',
                cargaHoraria: 6,
                deudaHoraria: 0
            },
            {
                id: 20004321,
                nombre: 'Bruno',
                seccion: 'Ing. Informatica',
                tipo: 'TPA',
                cargaHoraria: 4,
                deudaHoraria: 0
            }
        ]
      }],
      hora_sesion: [HorarioService.convertSesiontoString(hor.sesiones[0].dia_semana, 
        hor.sesiones[0].hora_inicio, hor.sesiones[0].media_hora_inicio, 
        hor.sesiones[0].hora_fin, hor.sesiones[0].media_hora_fin)],
      "estado": 'sin Docente'
    })
    //Si existe un segundo horario - lo vamos a meter - no pueden haber más de 2 horarios.

  }

  console.log(horarios);

  return horarios;
}
*/

/*
    El horaraio se recuperará - de un llamado axios que es - getHorariosxCicloxCurso - 
    HORARIO{
        id: numero - identificador,
        codigo: codigo del horario - 0881 1081
        curso:{
            id: cursoid
            nombre: nombre del curso
            seccion:{
                id:
                departamento:{
                    
                }
            }
        }
        ciclo:{
            id: mismo id que se tiene seleccionado
        }
        sesiones:[{
            //no esta pero para que se enteinda mejor: tipo_sesion: compartida- 0 [suma de profesores = horas] o codictado - 1[horas = horas_de_profesor]: 
            secuencia: tipo del horario [clase o laboratorio: 0 o 1]
            horas: hor.sesiones.horas [valor fijo ingresado de las horas que corresponden a la secuencia - Clase ocupa en su dictado 3 horas]
            sesiones_dictado:[{
                persona:{
                    id_persona: es el docente como tal - su id - 
                    el resto de datos:
                    ---------------------------------------------------------
                    PERSONA TAMBIEN CAMBIO
                    deuda: del ciclo pasado - cuantas horas me debio?
                    carga_horaria: este es el valor fijo - las horas que debería dictar un docente por cada ciclo - TP O TCA AUTOMTICO - 10 A 6
                    carga_del_ciclo: 3              |carga: |carga_del_ciclo -> 8 + 3 = 11  > carga_horaria = 10|deuda: 2-1 = 1|
                }
                horas_dictadas: 3
            },
                {OTRO SESION_DICTADO
                horas_dictadas: 3}
        ]
        }]
    }
*/

function chompDocentes(sesiones) {
    const clase = sesiones.filter((ses)=>ses.secuencia===0)
    const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)
    return (
        <>
            <Typography display="inline" whiteSpace="pre">
                {"Docentes en Clase: "}
            </Typography>
            <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                {clase[0].sesion_docentes ? clase[0].sesion_docentes.length : 0} {"\n"}
            </Typography>
            <Typography display="inline" whiteSpace="pre">
                {"Docentes en Lab: "}
            </Typography>
            <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                {laboratorio[0].sesion_docentes ? laboratorio[0].sesion_docentes.length : 0}
            </Typography>
        </>
    )
}

function chompDetalles(sesiones) {

  const horasLaboratorio = (laboratorio) => {
    return(
      <>
      <Typography display="inline" whiteSpace="pre">
          {"Horas de Laboratorio: "}
      </Typography>
      <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
        {laboratorio.horas}
      </Typography>
      </>
    )
  }

    const clase = sesiones.filter((ses)=>ses.secuencia===0)
    const laboratorio = sesiones.filter((ses)=>ses.secuencia===1)
    if(!laboratorio) laboratorio = []
    console.log("clase: ", clase, "laboratorio: ", laboratorio);
    return (
        <>
            <Typography display="inline" whiteSpace="pre">
                {"Horas de Clase: "}
            </Typography>
            <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                {clase[0].horas} {"\n"}
            </Typography>
            {laboratorio[0] ? horasLaboratorio(laboratorio[0]) : ""}
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
function generateRows(records) {
    console.log("horarios de curso sel: ", records)
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
                    <AccordionDetailsCursoHorarioProfesor sesiones={horario.sesiones} />
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
        sumaHorasdoc += docente.hora_sesion; 
      }
    }
    //En el caso de que sea mayor o igual - las horas se han cumplido - caso contrario o = 0.
    (sumaHorasdoc < sesiones.horas) ? estado = "Horas Asignadas"  : estado = "Faltan Horas"
    if(estado === "Faltan Horas") break;
  }

  return estado;
}


const fillHorarios = async (horarios) => {
  const dataHorarios = [];
  for(let hor of horarios){
      //Haremos el detalle
      const detalle = hallarDetalle(hor.sesiones);
      //Haremos el estado
      const estado = hallarEstado(hor.sesiones);
      dataHorarios.push({
        "id": hor.id,
        "codigo": hor.codigo,
        "ciclo": hor.ciclo,
        "curso": hor.curso,
        "sesiones": hor.sesiones,
        "detalle": detalle,
        "estado": estado,
      })
  }
  console.log(dataHorarios);
  return dataHorarios;
}


export default function TestPage(recordForEdit, setRecordForEdit) {
    const [records, setRecords] = React.useState([]);  //Lo usaremos para pasar data modificada

    React.useEffect(() => {
      fillHorarios(recordForEdit.recordForEdit.horarios)
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
            {generateRows(records)}
        </>
    )
}