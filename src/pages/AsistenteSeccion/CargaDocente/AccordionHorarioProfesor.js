/* Author: Mitsuo
 */
import React from 'react'
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { DT } from '../../../components/DreamTeam/DT'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccordionDetailsHorarioProfesor from './AccordionDetailsHorarioProfesor'
import HorarioService from '../../../services/horarioService';


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
const sampleData = [
    {
        id: '1',
        codigo: 'H0801',
        detalle: 'Clase: Jue 10:00 - 12 Vie 10:00 - 14:00',
        estado: 'Con Docente',
        docentes: {
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
        }
    },
    {
        id: '2',
        codigo: 'H0802',
        detalle: 'Clase: Mie 10:00 - 12 Sab 10:00 - 14:00',
        estado: 'Sin Docente',
        docentes: {
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
        }
    }
]

function chompDocentes(docentes) {
    return (
        <>
            <Typography display="inline" whiteSpace="pre">
                {"Docentes en Clase: "}
            </Typography>
            <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                {docentes.clase.length} {"\n"}
            </Typography>
            <Typography display="inline" whiteSpace="pre">
                {"Docentes en Lab: "}
            </Typography>
            <Typography display="inline" whiteSpace="pre" color="blue" fontWeight={600}>
                {docentes.lab.length}
            </Typography>
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
            <Box width="25%" alignItems="center" display="flex">
                {horario.detalle}
            </Box>
            <Box width="25%" alignItems="center" display="flex">
                {
                    horario.estado === "Con Docente"
                        ? <DT.Etiqueta type="success" text="Con Docente"/>
                        : <DT.Etiqueta type="error" text="Sin Docente" 
                            icon={<CancelOutlinedIcon/>}/>
                }
            </Box>
            <Box width="25%">
                {chompDocentes(horario.docentes)}
            </Box>
        </>
    )
}

/* Generates a customized row with the data */
function generateRows(records) {
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
                    <AccordionDetailsHorarioProfesor docentes={horario.docentes} />
                </AccordionDetails>
            </Accordion>
        ))
    )
}

export default function TestPage(recordForEdit, setRecordForEdit) {
  //console.log(recordForEdit);
    const [records, setRecords] = React.useState([])
/*
    React.useEffect(() => {
      fillHorarios()
      .then (newHor =>{
        setRecords(newHor);
        console.log(newHor);
        //console.log(newSeccion);
        
        console.log(records);
      });
    }, [])
*/
    return (
        <>
            <Accordion disabled>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ visibility: "hidden" }} />}
                >
                    <HeaderBoxs headers={headers} />
                </AccordionSummary>
            </Accordion>
            {generateRows(sampleData)}
        </>
    )
}
