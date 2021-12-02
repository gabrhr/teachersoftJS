import { Form } from "../../../components/useForm"
import { Redirect,useLocation, useHistory, useRouteMatch } from 'react-router-dom'
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentHeader from '../../../components/AppMain/ContentHeader'
import { Link } from 'react-router-dom';


const actualizarCursoCiclo = async (curso_ciclo)=> {

  if(curso_ciclo.estado_curso !== 2){
    const newCC = {
      "id": curso_ciclo.id,
      "ciclo": {
        "id": curso_ciclo.ciclo.id,
      },
      "curso": {
        "id": curso_ciclo.curso.id,
      },
      "estado_curso": 2, //Se actualiza al nuevo estado
      "cantidad_horarios": curso_ciclo.cantidad_horarios,
      "estado_tracking": curso_ciclo.estado_tracking,
    }
    
    const request = await CursoService.updateCursoCiclo(newCC);

  }
}


const verificarActualizacion  = async (curso) => {

  const dataHor = await HorarioService.listarPorCursoCiclo(curso.id , window.localStorage.getItem("ciclo"));
  
  let cant_horarios = 0;
  for(let hor of dataHor){
    let cant_sesiones = 0;
    for (let ses of hor.sesiones) {
      let sumaHorasdoc = 0;
      if(ses.sesion_docentes){
        for (let docente of ses.sesion_docentes){
          sumaHorasdoc += docente.horas_dictado_docente_sesion; 
        }
      }
      //En el caso de que sea mayor o igual - las horas se han cumplido - caso contrario o = 0.
      if(sumaHorasdoc >= ses.horas)  cant_sesiones++
      else  return;  //Si no cumple, entonces directamente se dice que no se llenaron los horarios
    }
    if(cant_sesiones === hor.sesiones.length){
      console.log("Ambas sesiones si cumplen")
      cant_horarios ++;
    }
  }
  if(cant_horarios === dataHor.length){
    console.log("Todos los horaarios si cumplen")
    await actualizarCursoCiclo(dataHor[0].curso_ciclo);
  }

}


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

export default function ModalDocenteClases(){
  
  const location= useLocation()
  const {docentesAsig, horario, tipo, curso} = location.state


    const [recordsBusq, setRecordsBusq] = useState([])
    const [recordsAsig, setRecordsAsig] = useState(docentesAsig)
    const [recordsDel, setRecordsDel] = useState([])
    //Conseguimos los indices del arreglo - se puede ingresar de manera errada
    let iClase = horario.sesiones.findIndex( s => s.secuencia === 0);
    let iLab = iClase ? 0 : 1;

    const [tipoDic, setTipoDic] = useState(tipo ? horario.sesiones[iLab].tipo_dictado : horario.sesiones[iClase].tipo_dictado);

    const history = useHistory()

    console.log("Lista de asignación: ", recordsAsig);
    React.useEffect(() => {
      fillDocentes()
        .then(docentes => {
          const newRecBusq = docentes.filter(doc => !recordsAsig.some(ra => ra.docente.id === doc.id));
          setRecordsBusq(newRecBusq);        
        });  
    }, [])


    const handleSubmit = async e => {
      /* e is a "default parameter" */
      e.preventDefault();

      const datosSesion = []

      datosSesion[0] = tipo ? horario.sesiones[iLab].horas : horario.sesiones[iClase].horas
      datosSesion[1] = tipoDic
      
      console.log(datosSesion);
      if(recordsAsig.length > 0){
        if (!datosSesion[1]){  //El tipo es de dictado compartido
          let sumHorasDic = 0;
          for(let ses_doc of recordsAsig){
            sumHorasDic += ses_doc.horas_dictado_docente_sesion;
          }
          if(sumHorasDic !== datosSesion[0]){//Si la suma de hroas totales es distinto - se rechaza
            console.log("Insertar mensaje para el usuario: error de dictado compartido")
            return; //AARON: SI SE PUEDE - METERLE UN AVISO QUE LE INDIQUE EL ERROR: "LAS SUMA DE HORAS DE LOS DOCENTES NO SON IGUALES AL DEL HORARIO""
          }
        }
        else{ //El tipo es de dictado codicxtado
          for(let ses_doc of recordsAsig){
            if(ses_doc.horas_dictado_docente_sesion !== datosSesion[0]){//Si la suma de hroas totales es mayor - se rechaza
              console.log("Insertar mensaje para el usuario: error de co-dictado")
              return; //AARON: SI SE PUEDE - METERLE UNA VISO QUE INDIQUE EL ERROR: "LAS HORAS DE LOS DOCENTES NO SON IGUALES AL DEL HORARIO"
            }
          }
        }
      }

      console.log("Pasamos la prueba :D")
      //console.log(recordsAsig);
      //console.log(horario);

      //ANTES QUE NADA - VAMOS A BORRAR TODOS LOS QUE PERTENCEN A LA LISTA DE DELETE

      for(let del of recordsDel){
        const dataPer = await PersonaService.updatePersona(del)
        console.log(dataPer);
      }


      //Recorremos toda la persona para realizar la sesion_docente
      const sesion_docente = [];
      for(let ses_doc of recordsAsig){
        sesion_docente.push({
          "docente": {
            "id": ses_doc.docente.id
          },
          "horas_dictado_docente_sesion": ses_doc.horas_dictado_docente_sesion,
        })
      }
      let sesionesActual;
      //console.log(horario);
      //Ingresamos las sesiones - dependiendo del tiipo de secuencia
      if(tipo){ //Es 1 - laboratorio
        if(horario.sesiones[iClase]){ //Si existe el iClase
          sesionesActual = [{
              "id": horario.sesiones[iClase].id,
              "horas": horario.sesiones[iClase].horas,
              "secuencia": horario.sesiones[iClase].secuencia,
              "sesion_docentes": horario.sesiones[iClase].sesion_docentes,
              "tipo_dictado": horario.sesiones[iClase].tipo_dictado,
            }, {
            "id": horario.sesiones[iLab].id,
            "horas": horario.sesiones[iLab].horas,
            "secuencia": horario.sesiones[iLab].secuencia,
            "sesion_docentes": sesion_docente,
            "tipo_dictado": tipoDic,
          }]
        }
        else{ //Solo hay laboratorios
          sesionesActual = [{
            "id": horario.sesiones[iLab].id,
            "horas": horario.sesiones[iLab].horas,
            "secuencia": horario.sesiones[iLab].secuencia,
            "sesion_docentes": sesion_docente,
            "tipo_dictado": tipoDic,
          }]
        }
      }
      else{ //Es 0 - clase
        if(horario.sesiones[iLab]){
          sesionesActual = [{
            "id": horario.sesiones[iClase].id,
            "horas": horario.sesiones[iClase].horas,
            "secuencia": horario.sesiones[iClase].secuencia,
            "sesion_docentes": sesion_docente,
            "tipo_dictado": tipoDic,
          }, 
          {
            "id": horario.sesiones[iLab].id,
            "horas": horario.sesiones[iLab].horas,
            "secuencia": horario.sesiones[iLab].secuencia,
            "sesion_docentes": horario.sesiones[iLab].sesion_docentes,
            "tipo_dictado": horario.sesiones[iLab].tipo_dictado,
          }]
        }
        else{
          sesionesActual = [{
            "id": horario.sesiones[iClase].id,
            "horas": horario.sesiones[iClase].horas,
            "secuencia": horario.sesiones[iClase].secuencia,
            "sesion_docentes": sesion_docente,
            "tipo_dictado": tipoDic,
          }]
        }
      }

      //const ciclo = await CursoService.getCursoCicloxCicloxCodigoNombre
      const horUpdate = {
        "id": horario.id,
        "codigo": horario.codigo,
        "curso_ciclo": horario.curso_ciclo,
        "sesiones": sesionesActual
      }

      console.log(horUpdate);
      const dataHor = await HorarioService.updateHorario(horUpdate);
      console.log(dataHor);

      //Ahora actualizaremos la data de cada persona agregada      
      for(let doc of recordsAsig){
        const dataPer = await PersonaService.updatePersona(doc.docente)
        console.log(dataPer);
      }

      verificarActualizacion(dataHor.curso_ciclo.curso);
      //ACTUALIZAMOS EL ESTADO DE CURSOS EN CASO SEA NECESARIO

      // if(dataHor){
      //   setActHorario(dataHor);
      //   setOpenPopUp(false)
      // } 
    }

    return(
        
        <Form onSubmit={handleSubmit}>
           <Link to ={{
                  pathname:`/as/asignacionCarga/registroCarga/horarios`,
                  state:{
                      curso: horario.curso_ciclo.curso
                  }
              }}  style={{ textDecoration: 'none' }}>
            <Controls.Button
              variant="outlined"
              text="Regresar"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={(e) => {}}
            />
          </Link>
            <ContentHeader
              text={`Registro de Carga Docente - Docentes | ${horario.curso_ciclo.curso.nombre} - ${horario.codigo}`}
              cbo={false}
            />
            <Paper> 
                <ModalDocenteClasesAsignados records = {recordsAsig} setRecords = {setRecordsAsig} tipo_dictado = {tipoDic} setTipoDic = {setTipoDic}
                                sesion = {tipo ? horario.sesiones[iLab].horas : horario.sesiones[iClase].horas} recordsBusq = {recordsBusq} setRecordsBusq = {setRecordsBusq}
                                recordsDel = {recordsDel} setRecordsDel = {setRecordsDel}/>
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
                        onClick={handleSubmit}
                    >
                    </Controls.Button>
                </div>
            </Grid>
        </Form>
    )
}