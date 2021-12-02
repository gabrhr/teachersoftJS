import React, {useState } from "react"
import ContentHeader from "../../../components/AppMain/ContentHeader"
import AccordionPreferenciaProfesor from './AccordionPreferenciaProfesor'
import { Controls } from "../../../components/controls/Controls"
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material'

import PersonaService from '../../../services/personaService';
import { Box, Paper, TableBody, TableRow, TableCell } from '@mui/material';


const getPreferencias =  async (ciclo) => {
  //{ id: '1', title: 'Todas las Secciones' },
  const seccion = JSON.parse(window.localStorage.getItem("user"));
  if(!ciclo) ciclo = parseInt(window.localStorage.getItem("ciclo"));
  let dataPref = await PersonaService.getPreferenciasxSeccion(seccion.persona.seccion.id, ciclo); //comentarle al back que sea por ciclo
  
  if(!dataPref) dataPref = [];

  const docentes = [];
  for(let doc of dataPref) {
    const preferencias = [];

    for(let i = 0; i < doc.sesiones.length; i++){
      //Hacemos la verificacion de si es un curso repetido o no
      const newHor = await doc.horarios.filter(hor => hor.sesiones.some(ses => ses.id === doc.sesiones[i].id));
      preferencias.push ({
        "clave": newHor[0].curso_ciclo.curso.codigo,
        "nombre_curso": newHor[0].curso_ciclo.curso.nombre,
        "carga": newHor[0].curso_ciclo.curso.creditos,
        "horario": newHor[0].codigo,
        "horas": doc.sesiones[i].horas,
        //"Horario": newHor[0],
        "Sesion": doc.sesiones[i].secuencia ? "Laboratorio" : "Clase",
      })
    }

    docentes.push({
      "id": doc.id,
      "foto_URL": doc.docente.foto_URL,
      "nombres": doc.docente.nombres,
      "apellidos": doc.docente.apellidos,
      "codigo_pucp": doc.docente.codigo_pucp ? doc.docente.codigo_pucp : "No tiene",
      "seccion": {
        "nombre": doc.docente.seccion.nombre,
      },
      "tipo_docente": doc.docente.tipo_docente,
      "preferencia": preferencias,
    })
  }

    console.log("lista de docntes: ", docentes);

  return docentes;
}


export default function SolPreferenciaDocentes(){
  const [records, setRecords] = useState([]);
  const [ciclo, setCiclo] = useState();
  const [profesoresMostrar, setProfesoresMostrar] = useState([])
  const [preferenciaCargados, setPreferenciaCargados] = useState(false)
  
  React.useEffect(() => {
    setPreferenciaCargados(false)
    getPreferencias(ciclo)
    .then (newPref =>{
      if(newPref){
        setProfesoresMostrar(newPref);
        setPreferenciaCargados(true)
        setRecords(newPref);
      }
    });
  }, [ciclo] )
  
    const handleSearch = e => {
      let target = e.target;
      /* React "state object" (useState()) doens't allow functions, only
        * objects.  Thus the function needs to be inside an object. */
      if (target.value === ""){
        console.log("ingreso if")
        setProfesoresMostrar(records)
        return profesoresMostrar
      }
      else{
        console.log("ingreso else")
        const profMostrar = profesoresMostrar.filter(x => `${x.nombres.toLowerCase()}, ${x.apellidos.toLowerCase()}`
          .includes(target.value.toLowerCase()))

        console.log(profMostrar);
        setProfesoresMostrar(profMostrar);
        return profesoresMostrar;
      }
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
            <AccordionPreferenciaProfesor profesores = {profesoresMostrar} preferenciaCargados = {preferenciaCargados}/>
        </>
    )
}