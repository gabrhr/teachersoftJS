import React, {useState } from "react"
import ContentHeader from "../../../components/AppMain/ContentHeader"
import AccordionPreferenciaProfesor from './AccordionPreferenciaProfesor'
import { Controls } from "../../../components/controls/Controls"
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material'

import PersonaService from '../../../services/personaService';


const getPreferencias =  async (ciclo) => {
  //{ id: '1', title: 'Todas las Secciones' },
  const seccion = JSON.parse(window.localStorage.getItem("user"));
  if(!ciclo) ciclo = parseInt(window.localStorage.getItem("ciclo"));
  let dataPref = await PersonaService.getPreferenciasxSeccion(seccion.persona.seccion.id); //comentarle al back que sea por ciclo
  
  if(!dataPref) dataPref = [];

  const preferencias = [];

  console.log(dataPref);
  dataPref.map(doc => {
      preferencias.push({
        "ID": doc.id,
        "foto_URL": doc.id,
        "Codigo": doc.cursoCiclos[0].curso.codigo,
        "Nombre": doc.cursoCiclos[0].curso.nombre,
        "Facultad": doc.cursoCiclos[0].curso.seccion.departamento.unidad.nombre,
        "Creditos": doc.cursoCiclos[0].curso.creditos,
        "Horario": doc.horarios[0].codigo,
        "Tipo": doc.sesiones[0].secuencia ? "Laboratorio" : "Clase",
        "Horas": doc.sesiones[0].horas,
        "ID_Horario": doc.horarios[0].id,
        "selected": false
      })
  })

  return preferencias;
}


export default function SolPreferenciaDocentes(){
  const [records, setRecords] = useState([]);
  const [ciclo, setCiclo] = useState();

    React.useEffect(() => {
      getPreferencias(ciclo)
      .then (newPref =>{
        if(newPref){
          setRecords(newPref);
        }
      });
    }, [ciclo] )

    const [profesores, setProfesores] = useState([
        {
            foto_URL: '',
            nombres: 'holo',
            apellidos: 'k',
            codigo_pucp: '1',
            seccion: {
                nombre: 'Ingeniería Informática'
            },
            tipo_docente: 1,
            preferencia: [
                {
                    clave: '22',
                    nombre_curso: 'MATES'
                }, 
                {
                    clave: '222',
                    nombre_curso: 'MATES 5'
                }
            ]
        },
        {
            foto_URL: '',
            nombres: 'asdasdas',
            apellidos: 'kd',
            codigo_pucp: '13',
            seccion: {
                nombre: 'Ingeniería Informática'
            },
            tipo_docente: 2,
            preferencia: [
                {
                    clave: '22',
                    nombre_curso: 'MATES'
                }, 
                {
                    clave: '222',
                    nombre_curso: 'MATES 5'
                },
                {
                    clave: '22342',
                    nombre_curso: 'TUTORÍA'
                }
            ]
        }
    ])

    const [profesoresMostrar, setProfesoresMostrar] = useState(profesores)


    const handleSearch = e => {
        const nuevosProfesores = profesores.filter(x => x.nombres.toLowerCase().includes(e.target.value.toLowerCase()))
        setProfesoresMostrar(nuevosProfesores)
    }
       

    return(
        <>
            <ContentHeader
            text="Solicitud de preferencias de docentes"
            cbo={true}
            records = {ciclo}
            setRecords = {setCiclo}
            />
            <Controls.Input
            label="Buscar Docente por Nombre"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ width: .3, paddingBottom: '1.6%'}}
            onChange={handleSearch}
            type="search"
          />
            <AccordionPreferenciaProfesor profesores = {profesoresMostrar}/>
        </>
    )
}